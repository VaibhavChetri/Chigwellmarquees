"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { MediaAsset, Venue } from "@/types";

/* FLOOR PLAN VIEWER (§Page 02 §5) — zoom/lightbox with pinch-zoom on mobile.
   A11y: capacities are real TEXT (not image-only). When no floorPlan image is
   set, an inline schematic stands in; either way the seated/standing figures
   are spelled out alongside. */
export function FloorPlanViewer({ venue, media }: { venue: Venue; media: MediaAsset | null }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setScale(1);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s + 0.5, 4));
      if (e.key === "-") setScale((s) => Math.max(s - 0.5, 1));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const seated = venue.specs.find((s) => /seated/i.test(s.label))?.value;
  const standing = venue.specs.find((s) => /standing/i.test(s.label))?.value;

  const Plan = ({ className }: { className?: string }) =>
    media?.type === "image" ? (
      <Image
        src={media.url}
        alt={media.alt}
        width={media.width ?? 1200}
        height={media.height ?? 900}
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder={media.blurDataURL ? "blur" : "empty"}
        blurDataURL={media.blurDataURL}
        className={cn("h-auto w-full", className)}
      />
    ) : (
      <MarqueeSchematic className={className} name={venue.name} />
    );

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <h3 className="font-display text-step-2 text-ink">Floor plan & capacities</h3>
        <p className="max-w-md text-ink-soft">
          A flexible footprint that reshapes around your celebration — from a banqueting layout
          to a flowing, standing reception.
        </p>
        <dl className="flex flex-col gap-3 border-t border-champagne pt-5">
          {seated && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">Seated</dt>
              <dd className="font-display text-step-1 text-ink">{seated}</dd>
            </div>
          )}
          {standing && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">Standing</dt>
              <dd className="font-display text-step-1 text-ink">{standing}</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">Total capacity</dt>
            <dd className="font-display text-step-1 text-ink">
              {venue.capacity.min}–{venue.capacity.max.toLocaleString("en-GB")} guests
            </dd>
          </div>
        </dl>
      </div>

      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-champagne bg-parchment p-6 text-left transition-colors hover:border-gold"
        aria-label={`Enlarge the ${venue.name} floor plan`}
      >
        <Plan className="transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="mt-4 inline-flex items-center gap-2 font-sans text-[0.74rem] uppercase tracking-[0.16em] text-gold-deep">
          Tap to enlarge
          <span aria-hidden="true">⤢</span>
        </span>
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${venue.name} floor plan`}
          tabIndex={-1}
          className="fixed inset-0 z-[var(--z-drawer)] flex flex-col bg-[color-mix(in_oklab,var(--ink)_92%,transparent)] outline-none"
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-4 text-ivory">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setScale((s) => Math.max(s - 0.5, 1))}
                aria-label="Zoom out"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/30 hover:border-champagne"
              >
                <span aria-hidden="true">−</span>
              </button>
              <span className="w-12 text-center font-sans text-[0.74rem] tabular-nums text-ivory/80">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(s + 0.5, 4))}
                aria-label="Zoom in"
                className="grid h-10 w-10 place-items-center rounded-full border border-ivory/30 hover:border-champagne"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            <button
              onClick={close}
              aria-label="Close floor plan"
              className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 text-ivory hover:border-champagne"
            >
              <span aria-hidden="true" className="text-xl">
                &times;
              </span>
            </button>
          </div>

          {/* Pinch-zoom + pan on mobile via native touch on the scroll container. */}
          <div
            className="flex flex-1 items-center justify-center overflow-auto p-4"
            style={{ touchAction: "pinch-zoom" }}
          >
            <div
              className="origin-center rounded-[var(--radius-card)] bg-ivory p-6 transition-transform duration-200"
              style={{ transform: `scale(${scale})` }}
            >
              <div className="w-[min(86vw,900px)]">
                <Plan />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Decorative inline schematic stand-in when no floorPlan image exists. The real
   capacity figures live in the text list above (a11y: not image-only). */
function MarqueeSchematic({ className, name }: { className?: string; name: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`Schematic floor plan of ${name}`}
    >
      <rect x="20" y="20" width="360" height="260" rx="6" fill="var(--ivory)" stroke="var(--gold)" strokeWidth="1.5" />
      {/* stage */}
      <rect x="150" y="32" width="100" height="34" rx="3" fill="none" stroke="var(--sage)" strokeWidth="1.2" />
      <text x="200" y="53" textAnchor="middle" fontSize="11" fill="var(--ink-soft)" fontFamily="sans-serif">
        Stage
      </text>
      {/* dance floor */}
      <rect x="160" y="120" width="80" height="80" rx="3" fill="none" stroke="var(--rose)" strokeWidth="1.2" />
      <text x="200" y="164" textAnchor="middle" fontSize="10" fill="var(--ink-soft)" fontFamily="sans-serif">
        Dance floor
      </text>
      {/* round tables */}
      {[60, 110, 290, 340].map((cx) =>
        [110, 170, 230].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="16" fill="none" stroke="var(--champagne)" strokeWidth="1" />
        )),
      )}
      {/* entrance */}
      <path d="M180 280 h40" stroke="var(--gold-deep)" strokeWidth="3" />
      <text x="200" y="296" textAnchor="middle" fontSize="9" fill="var(--taupe)" fontFamily="sans-serif">
        Entrance
      </text>
    </svg>
  );
}
