/**
 * Client-side attribution and event helpers. GTM carries GA4, Google Ads and the Meta Pixel;
 * this file only pushes to dataLayer (and fbq when present) and remembers where a visitor came from.
 */

const KEY = "mpt_attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

function store(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** First touch in the session wins; later pages keep it. */
export function captureAttribution() {
  const s = store();
  if (!s || s.getItem(KEY)) return;
  const url = new URL(window.location.href);
  const data: Attribution = { landing_page: url.pathname + url.search, referrer: document.referrer || undefined };
  for (const p of PARAMS) {
    const v = url.searchParams.get(p);
    if (v) data[p] = v.slice(0, 200);
  }
  s.setItem(KEY, JSON.stringify(data));
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(store()?.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export type TrackEvent = "lead_submit" | "brochure_download" | "whatsapp_click" | "call_click" | "visit_booked" | "lead_modal_open" | "lead_conversion";

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ??= []).push({ event, ...params });
}

/** Pixel event with the same event_id the server sends to CAPI, so Meta can deduplicate. */
export function pixelLead(eventId: string, params: Record<string, unknown> = {}) {
  window.fbq?.("track", "Lead", params, { eventID: eventId });
}

export function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
