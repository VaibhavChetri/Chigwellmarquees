"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Offer, SiteSettings } from "@/types";

const DISMISS_KEY = "tcm-announcement-dismissed";

/* ANNOUNCEMENT / OFFERS BAR (§6, [NMP]) — slim, dismissible (persisted), warm
   parchment with a gilded hairline. Driven by the featured Offer when one
   exists (badge + title → its detail page), otherwise falls back to the
   editorial SiteSettings.announcement message. */
export function AnnouncementBar({
  settings,
  featuredOffer,
}: {
  settings: SiteSettings;
  featuredOffer?: Offer | null;
}) {
  const announcement = settings.announcement;
  const [dismissed, setDismissed] = useState(true); // default hidden until we read storage (avoids flash)

  useEffect(() => {
    if (!announcement?.enabled) return;
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, [announcement?.enabled]);

  if (!announcement?.enabled || dismissed) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  // Featured offer drives the bar; announcement is the editorial fallback.
  const message = featuredOffer ? featuredOffer.summary : announcement.message;
  const href = featuredOffer ? `/offers/${featuredOffer.slug}` : announcement.cta.href;
  const ctaLabel = featuredOffer ? "View offer" : announcement.cta.label;
  const badge = featuredOffer?.badgeLabel;

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className={cn(
        "relative z-[var(--z-announcement)] w-full border-b border-champagne bg-parchment",
        "text-ink-soft",
      )}
    >
      <div className="container-edge flex items-center justify-center gap-4 py-1.5 text-center sm:py-2">
        <Link
          href={href}
          className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 font-sans text-[0.6rem] uppercase leading-tight tracking-[0.12em] sm:text-[0.72rem] sm:tracking-[0.16em]"
        >
          {badge && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.55rem] text-ink sm:text-[0.6rem]">{badge}</span>
          )}
          <span>{message}</span>
          <span className="whitespace-nowrap font-medium text-ink underline-offset-2 transition-transform group-hover:translate-x-1 group-hover:underline">
            {ctaLabel} &rarr;
          </span>
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-[var(--gutter)] grid h-6 w-6 place-items-center text-taupe transition-colors hover:text-ink"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}
