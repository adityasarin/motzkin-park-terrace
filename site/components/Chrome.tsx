"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useLead } from "@/components/lead/LeadModal";
import { project, telHref, waHref } from "@/content/project";
import { captureAttribution, track } from "@/lib/tracking";

/** Call · WhatsApp · Enquire, pinned to the bottom on phones; hides while scrolling down. */
export function MobileBar() {
  const { open } = useLead();
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last.current + 4 && y > 400);
      if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="mobile-bar" data-hidden={hidden}>
      <a href={telHref} onClick={() => track("call_click", { place: "mobile-bar" })}>
        Call
      </a>
      <a href={waHref()} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { place: "mobile-bar" })}>
        WhatsApp
      </a>
      <button type="button" onClick={() => open("visit", "mobile-bar")}>
        Book a visit
      </button>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waHref()} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { place: "fab" })}>
      WhatsApp us
    </a>
  );
}

/** Scroll reveals: each [data-reveal] block staggers its children in once. */
export function RevealRoot() {
  const path = usePathname();
  useEffect(() => {
    // Inner pages: every block of the reading column below the title reveals itself.
    document.querySelectorAll<HTMLElement>(".page__read > :not(nav):not([data-reveal]):not(.is-in)").forEach((el) => el.setAttribute("data-reveal-self", ""));
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-reveal-self]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}

/** Attribution capture, plus GTM loaded after the first interaction or when the browser is idle. */
export function Analytics() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const [load, setLoad] = useState(false);
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const path = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [path]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("mpt_consent");
      if (c === "granted" || c === "denied") setConsent(c);
    } catch {}
    if (!gtm) return;
    const go = () => setLoad(true);
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    const w = window as Window;
    const hasIdle = typeof w.requestIdleCallback === "function";
    const idle = hasIdle ? w.requestIdleCallback(go, { timeout: 4000 }) : w.setTimeout(go, 3000);
    return () => {
      events.forEach((e) => w.removeEventListener(e, go));
      if (hasIdle) w.cancelIdleCallback(idle);
      else w.clearTimeout(idle);
    };
  }, [gtm]);

  function decide(v: "granted" | "denied") {
    setConsent(v);
    try {
      localStorage.setItem("mpt_consent", v);
    } catch {}
    window.dataLayer ??= [];
    // Consent Mode v2 update; GTM only reads gtag commands pushed as an `arguments` object.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gtag = function (..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    gtag("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  }

  if (!gtm) return null;
  return (
    <>
      {load && (
        <Script id="gtm" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
          var c=null;try{c=localStorage.getItem('mpt_consent')}catch(e){}
          gtag('consent','default',{ad_storage:c||'denied',ad_user_data:c||'denied',ad_personalization:c||'denied',analytics_storage:c||'denied',wait_for_update:500});
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');
        `}</Script>
      )}
      {consent === null && (
        <div className="consent-bar" role="region" aria-label="Cookie choice">
          <p>We use cookies to measure visits and the ads that bring people here. Nothing is shared until you agree.</p>
          <button type="button" className="btn btn--ink" onClick={() => decide("granted")}>
            Accept
          </button>
          <button type="button" className="textlink" style={{ background: "none", border: 0, cursor: "pointer", color: "inherit", minHeight: 44 }} onClick={() => decide("denied")}>
            Decline
          </button>
        </div>
      )}
    </>
  );
}

export const contactLine = `${project.contact.phone} · ${project.contact.hoursShort}`;
