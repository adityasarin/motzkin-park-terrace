"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Intent } from "./intents";
import { track } from "@/lib/tracking";

// The dialog (Radix + form + Sonner) loads on first open, keeping it out of the first-load bundle.
const LeadDialog = dynamic(() => import("./LeadDialog"), { ssr: false });

type Ctx = { open: (intent: Intent, source?: string) => void };
const LeadContext = createContext<Ctx>({ open: () => {} });

export const useLead = () => useContext(LeadContext);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ intent: Intent; source?: string } | null>(null);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback((intent: Intent, source?: string) => {
    setState({ intent, source });
    setOpen(true);
    track("lead_modal_open", { intent, source });
  }, []);

  // Desktop only: offer the brochure once per session, on exit intent or after 45 s.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover)").matches) return;
    if (/^\/(lp|thank-you|design-qa)/.test(window.location.pathname)) return;
    let shown = false;
    try {
      shown = sessionStorage.getItem("mpt_offer") === "1";
    } catch {}
    if (shown) return;
    const fire = () => {
      if (document.querySelector("[data-slot='dialog-content']")) return;
      try {
        sessionStorage.setItem("mpt_offer", "1");
      } catch {}
      cleanup();
      open("brochure", "auto-offer");
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire();
    };
    const t = window.setTimeout(fire, 45_000);
    document.addEventListener("mouseout", onLeave);
    const cleanup = () => {
      window.clearTimeout(t);
      document.removeEventListener("mouseout", onLeave);
    };
    return cleanup;
  }, [open]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      {state && <LeadDialog open={isOpen} onOpenChange={setOpen} intent={state.intent} source={state.source} />}
    </LeadContext.Provider>
  );
}

export function LeadButton({
  intent,
  children,
  className = "btn",
  source,
}: {
  intent: Intent;
  children: ReactNode;
  className?: string;
  source?: string;
}) {
  const { open } = useLead();
  return (
    <button type="button" className={className} onClick={() => open(intent, source)}>
      {children}
    </button>
  );
}
