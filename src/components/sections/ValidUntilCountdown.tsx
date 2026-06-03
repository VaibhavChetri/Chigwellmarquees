"use client";

import { useEffect, useState } from "react";

import { formatDate } from "@/lib/utils";

/* TASTEFUL VALIDITY CUE (§Page 13 detail) — shows the end date always (SSR-safe,
   deterministic) and quietly adds "· N days left" once mounted, only when the
   window is genuinely closing. No ticking timer, no pressure theatre. */
export function ValidUntilCountdown({ validUntil }: { validUntil?: string }) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const end = formatDate(validUntil);

  useEffect(() => {
    if (!validUntil) return;
    const ms = new Date(validUntil).getTime() - Date.now();
    if (Number.isNaN(ms)) return;
    const days = Math.ceil(ms / 86_400_000);
    if (days > 0 && days <= 60) setDaysLeft(days);
  }, [validUntil]);

  if (!end) return null;

  return (
    <p className="inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      Available until {end}
      {daysLeft !== null && (
        <span className="text-rose-deep">
          · {daysLeft} {daysLeft === 1 ? "day" : "days"} left
        </span>
      )}
    </p>
  );
}
