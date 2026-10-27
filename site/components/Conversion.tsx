"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

/** Fires the conversion event once per thank-you page view (GTM maps it to Google Ads and GA4). */
export function Conversion({ intent }: { intent: string }) {
  useEffect(() => {
    track("lead_conversion", { intent });
  }, [intent]);
  return null;
}
