"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/primitives/Button";

const CONSENT_KEY = "tcm-cookie-consent";

/* GDPR cookie/consent banner (§8). Minimal, accessible, persisted. Analytics
   should be gated on the accepted state when wired in. */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(CONSENT_KEY));
  }, []);

  function decide(value: "accepted" | "declined") {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-1/2 z-[var(--z-drawer)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-[var(--radius-card)] border border-champagne bg-ivory p-5 shadow-[var(--shadow-soft)]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[0.86rem] text-ink-soft">
          We use cookies to give you the best experience and to understand how our site is used.
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="ghost" onClick={() => decide("declined")} className="px-5 py-2.5">
            Decline
          </Button>
          <Button variant="primary" onClick={() => decide("accepted")} className="px-5 py-2.5">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
