import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const runtime = "nodejs";

const Lead = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().regex(/^\+\d{7,16}$/),
  email: z.string().email().max(120).optional(),
  config: z.enum(["3 BHK", "4 BHK"]).optional(),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  intent: z.enum(["visit", "cost-sheet", "brochure", "floor-plans", "callback", "virtual-tour"]),
  consent: z.literal(true),
  company: z.string().max(0).optional(), // honeypot: must stay empty
  page: z.string().max(300).optional(),
  source: z.string().max(80).optional(),
  eventId: z.string().max(80).optional(),
  attribution: z.record(z.string(), z.string().max(400)).optional(),
});

type LeadT = z.infer<typeof Lead>;

// Simple in-memory limiter: 5 submissions per IP per 10 minutes, per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (body && typeof body === "object" && "company" in body && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = Lead.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  }
  const lead = parsed.data;
  const a = lead.attribution ?? {};
  const row = {
    timestamp: new Date().toISOString(),
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? "",
    config: lead.config ?? "",
    intent: lead.intent,
    visit_date: lead.visitDate ?? "",
    source: a.utm_source ?? lead.source ?? "website",
    medium: a.utm_medium ?? "",
    campaign: a.utm_campaign ?? "",
    gclid: a.gclid ?? "",
    fbclid: a.fbclid ?? "",
    page: lead.page ?? "",
    landing_page: a.landing_page ?? "",
    status: "New",
    owner: "",
    next_follow_up: "",
    notes: "",
    event_id: lead.eventId ?? "",
  };

  const stored = await store(row);
  if (!stored) return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });

  // Meta Conversions API: fire and forget, deduplicated with the browser Pixel by event_id.
  void sendCapi(lead, req, a).catch(() => {});

  return NextResponse.json({ ok: true });
}

async function store(row: Record<string, string>): Promise<boolean> {
  const hook = process.env.SHEET_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.SHEET_WEBHOOK_SECRET ?? "", ...row }),
        redirect: "follow",
      });
      if (res.ok) return true;
      console.error("[lead] sheet webhook failed", res.status);
    } catch (e) {
      console.error("[lead] sheet webhook error", e);
    }
  }
  // Local fallback (and backup when the Sheet is unreachable): newline-delimited JSON.
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.ndjson"), JSON.stringify(row) + "\n", "utf8");
    return true;
  } catch (e) {
    console.error("[lead] local store failed", e);
    return false;
  }
}

async function sendCapi(lead: LeadT, req: NextRequest, a: Record<string, string>) {
  const pixel = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;
  const fbc = a.fbclid ? `fb.1.${Date.now()}.${a.fbclid}` : undefined;
  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: new URL(lead.page ?? "/", req.nextUrl.origin).toString(),
        user_data: {
          ph: [sha(lead.phone.replace(/\D/g, ""))],
          ...(lead.email ? { em: [sha(lead.email)] } : {}),
          fn: [sha(lead.name.split(" ")[0])],
          client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
          client_user_agent: req.headers.get("user-agent") ?? undefined,
          ...(fbc ? { fbc } : {}),
        },
        custom_data: { content_name: lead.intent, content_category: lead.config ?? "unspecified" },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  };
  await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
