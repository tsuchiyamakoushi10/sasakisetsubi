"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** 電話番号のタップを GA4 に送る（どのページのどこから電話されたかを見るため） */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (a) trackEvent("tel_click", { page_path: location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
