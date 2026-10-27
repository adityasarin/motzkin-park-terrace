"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { intents, type Intent } from "./intents";
import { getAttribution, newEventId, pixelLead, track } from "@/lib/tracking";

const countryCodes = [
  { code: "+91", label: "India +91" },
  { code: "+971", label: "UAE +971" },
  { code: "+1", label: "US/Canada +1" },
  { code: "+44", label: "UK +44" },
  { code: "+65", label: "Singapore +65" },
  { code: "+61", label: "Australia +61" },
  { code: "+974", label: "Qatar +974" },
  { code: "+966", label: "Saudi +966" },
  { code: "+968", label: "Oman +968" },
  { code: "+965", label: "Kuwait +965" },
  { code: "+49", label: "Germany +49" },
];

type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

export function LeadForm({
  intent,
  dark = false,
  source,
  onDone,
}: {
  intent: Intent;
  dark?: boolean;
  source?: string;
  onDone?: () => void;
}) {
  const id = useId();
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const meta = intents[intent];
  const showDate = intent === "visit" || intent === "virtual-tour";
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const cc = String(fd.get("cc") ?? "+91");
    const local = String(fd.get("phone") ?? "").replace(/[^\d]/g, "");
    const email = String(fd.get("email") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (cc === "+91" ? !/^[6-9]\d{9}$/.test(local.replace(/^0/, "")) : local.length < 6 || local.length > 14)
      next.phone = cc === "+91" ? "Enter a 10-digit mobile number." : "Enter your number without the country code.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Check the email address.";
    if (!fd.get("consent")) next.consent = "Please agree so we can contact you.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    const eventId = newEventId();
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: `${cc}${local.replace(/^0/, "")}`,
          email: email || undefined,
          config: fd.get("config") || undefined,
          visitDate: fd.get("visitDate") || undefined,
          intent,
          consent: true,
          company: fd.get("company") || "",
          page: window.location.pathname,
          source,
          eventId,
          attribution: getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("lead_submit", { intent, config: fd.get("config") || undefined, event_id: eventId });
      if (intent === "brochure" || intent === "floor-plans") track("brochure_download", { intent });
      if (intent === "visit") track("visit_booked", { intent });
      pixelLead(eventId, { content_name: intent });
      toast.success("Thank you. We will be in touch shortly.");
      onDone?.();
      router.push(`/thank-you?intent=${intent}`);
    } catch {
      toast.error("That didn’t go through. Please try again, or call or WhatsApp us.");
      setSending(false);
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p className="err" id={`${id}-${k}-err`}>
        {errors[k]}
      </p>
    ) : null;
  const described = (k: keyof Errors) => (errors[k] ? `${id}-${k}-err` : undefined);

  return (
    <form className={`form${dark ? " form--dark" : ""}`} onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor={`${id}-name`}>Your name</label>
        <input
          id={`${id}-name`}
          className="field"
          name="name"
          autoComplete="name"
          maxLength={80}
          aria-invalid={!!errors.name}
          aria-describedby={described("name")}
        />
        {err("name")}
      </div>
      <div>
        <span className="label" id={`${id}-phone-label`}>
          Mobile number
        </span>
        <div className="phone" role="group" aria-labelledby={`${id}-phone-label`}>
          <select className="field" name="cc" defaultValue="+91" aria-label="Country code" autoComplete="tel-country-code">
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            className="field tnum"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={16}
            aria-label="Mobile number"
            aria-invalid={!!errors.phone}
            aria-describedby={described("phone")}
          />
        </div>
        {err("phone")}
      </div>
      <div className="two">
        <div>
          <label htmlFor={`${id}-config`}>Villa type</label>
          <select id={`${id}-config`} className="field" name="config" defaultValue="">
            <option value="">Not sure yet</option>
            <option value="3 BHK">3 BHK, 1,977 sq ft</option>
            <option value="4 BHK">4 BHK, 2,579 sq ft</option>
          </select>
        </div>
        {showDate ? (
          <div>
            <label htmlFor={`${id}-date`}>Preferred day</label>
            <input id={`${id}-date`} className="field" name="visitDate" type="date" min={today} />
          </div>
        ) : (
          <div>
            <label htmlFor={`${id}-email`}>Email, optional</label>
            <input
              id={`${id}-email`}
              className="field"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={120}
              aria-invalid={!!errors.email}
              aria-describedby={described("email")}
            />
            {err("email")}
          </div>
        )}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className="consent">
          <input type="checkbox" name="consent" aria-invalid={!!errors.consent} aria-describedby={described("consent")} />
          <span>
            I agree that Motzkin Park Terrace may call, WhatsApp or email me about this project. See the{" "}
            <a href="/privacy" className="textlink">
              privacy notice
            </a>
            .
          </span>
        </label>
        {err("consent")}
      </div>
      <button type="submit" className={`btn btn--block${dark ? "" : " btn--ink"}`} disabled={sending}>
        {sending ? "Sending…" : meta.submit}
      </button>
    </form>
  );
}
