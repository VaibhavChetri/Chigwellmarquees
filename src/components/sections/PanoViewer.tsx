"use client";

import { useEffect, useRef } from "react";

import type { Venue } from "@/types";

/* PANO VIEWER (§Page 17) — the heavy, on-demand viewer. Code-split via
   next/dynamic in TourSelector so neither this component nor the embed's JS is
   in the initial bundle. Renders a Matterport (or hosted 360) embed in an
   immersive overlay. Escape / close button; focus managed; reduced-motion safe.

   A real 360 equirectangular pipeline (@photo-sphere-viewer) can replace the
   iframe for type:'360' without changing TourSelector. */
export function PanoViewer({
  tour,
  title,
  onClose,
}: {
  tour: NonNullable<Venue["virtualTour"]>;
  title: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const restore = restoreRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      restore?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — virtual tour`}
      tabIndex={-1}
      className="fixed inset-0 z-[var(--z-drawer)] flex flex-col bg-ink outline-none animate-[fade-in_0.4s_var(--ease-cinematic)] motion-reduce:animate-none"
    >
      <div className="flex items-center justify-between px-[var(--gutter)] py-4 text-ivory">
        <span className="font-sans text-[0.74rem] uppercase tracking-[0.16em] text-ivory/80">
          {title} · 360° tour
        </span>
        <button
          onClick={onClose}
          aria-label="Close virtual tour"
          className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 text-ivory hover:border-champagne"
        >
          <span aria-hidden="true" className="text-xl">
            &times;
          </span>
        </button>
      </div>
      <div className="relative flex-1">
        <iframe
          title={`${title} virtual tour`}
          src={tour.url}
          className="h-full w-full border-0"
          allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
        />
      </div>
    </div>
  );
}
