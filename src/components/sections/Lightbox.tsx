"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { MediaAsset } from "@/types";

/* REUSABLE LIGHTBOX (§Page 14) — keyboard arrows, touch swipe, focus-trap and
   focus-restore, Escape to close, scroll-lock. Controlled by the parent via
   `index` (-1 = closed). Shared by the gallery and venue galleries.
   Images carry explicit dimensions, so there is no CLS. */
export function Lightbox({
  images,
  index,
  onIndex,
  onClose,
  label,
}: {
  images: MediaAsset[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
  label: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const open = index >= 0 && index < images.length;
  const count = images.length;

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % count);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const restore = restoreRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restore?.focus?.();
    };
  }, [open, index, count, onClose, onIndex]);

  if (!open) return null;
  const active = images[index];
  if (!active) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(dx) > 40) onIndex((index + (dx < 0 ? 1 : -1) + count) % count);
    touchX.current = null;
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-[var(--z-drawer)] flex flex-col bg-[color-mix(in_oklab,var(--ink)_92%,transparent)] outline-none"
    >
      <div className="flex items-center justify-between px-[var(--gutter)] py-4 text-ivory">
        <span className="font-sans text-[0.74rem] uppercase tracking-[0.16em] text-ivory/80">
          {index + 1} / {count}
        </span>
        <button
          onClick={onClose}
          aria-label="Close image viewer"
          className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 text-ivory hover:border-champagne"
        >
          <span aria-hidden="true" className="text-xl">
            &times;
          </span>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-8">
        {count > 1 && (
          <button
            onClick={() => onIndex((index - 1 + count) % count)}
            aria-label="Previous image"
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-ivory/30 text-ivory hover:border-champagne md:left-8"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
        )}

        <figure className="flex max-h-full max-w-5xl flex-col items-center gap-3">
          <Image
            key={active.id}
            src={active.url}
            alt={active.alt}
            width={active.width ?? 1600}
            height={active.height ?? 1067}
            sizes="100vw"
            className="max-h-[78vh] w-auto rounded-[var(--radius-card)] object-contain"
          />
          <figcaption className="px-6 text-center text-[0.82rem] text-ivory/70">
            {active.alt}
          </figcaption>
        </figure>

        {count > 1 && (
          <button
            onClick={() => onIndex((index + 1) % count)}
            aria-label="Next image"
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-ivory/30 text-ivory hover:border-champagne md:right-8"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
}
