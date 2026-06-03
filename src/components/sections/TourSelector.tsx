"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { Venue } from "@/types";

/* The heavy viewer is code-split and only fetched when "Launch" is clicked, so
   neither the viewer nor the Matterport embed adds to the initial bundle. */
const PanoViewer = dynamic(() => import("./PanoViewer").then((m) => m.PanoViewer), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="fixed inset-0 z-[var(--z-drawer)] grid place-items-center bg-ink text-ivory"
    >
      <span className="font-script text-[2rem] text-champagne">Loading tour…</span>
    </div>
  ),
});

export type TourSpace = {
  id: string;
  name: string;
  description: string;
  poster: { url: string; alt: string; blurDataURL?: string };
  tour: NonNullable<Venue["virtualTour"]>;
};

/* TOUR SELECTOR (§Page 17 §2–3) — pick a space, read its description, and
   launch the viewer on demand. The description is real text (a11y: not
   viewer-only). "Launch" is a real button; the poster is the LCP image. */
export function TourSelector({ spaces }: { spaces: TourSpace[] }) {
  const [activeId, setActiveId] = useState(spaces[0]?.id ?? "");
  const [launched, setLaunched] = useState(false);

  const active = spaces.find((s) => s.id === activeId) ?? spaces[0];
  if (!active) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* Selector */}
      <div role="group" aria-label="Choose a space to tour" className="flex flex-wrap justify-center gap-2.5">
        {spaces.map((space, i) => {
          const pressed = space.id === active.id;
          return (
            <button
              key={space.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActiveId(space.id)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-5 py-1.5",
                "font-sans text-[0.72rem] uppercase tracking-[0.14em]",
                "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-cinematic)]",
                pressed
                  ? "border-gold bg-gold text-ink"
                  : "border-ink/20 text-ink-soft hover:border-gold hover:text-gold-deep",
              )}
            >
              <span className="sr-only">Tour: </span>
              {space.name}
              {i === 0 && <span className="sr-only"> (selected by default)</span>}
            </button>
          );
        })}
      </div>

      {/* Active space — poster + description + launch */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-[var(--radius-card)]">
          <div className="relative aspect-[3/2] w-full bg-sand">
            <Image
              src={active.poster.url}
              alt={active.poster.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder={active.poster.blurDataURL ? "blur" : "empty"}
              blurDataURL={active.poster.blurDataURL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_50%,rgba(33,29,23,0.45))]" />
            <button
              onClick={() => setLaunched(true)}
              className="group absolute inset-0 grid place-items-center"
              aria-label={`Launch the ${active.name} virtual tour`}
            >
              <span className="flex items-center gap-3 rounded-full bg-ivory/90 px-6 py-3 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ink shadow-[var(--shadow-soft)] transition-transform group-hover:scale-105">
                <span aria-hidden="true">▶</span> Launch tour
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-step-2 text-ink">{active.name}</h2>
          <p className="text-step-0 leading-relaxed text-ink-soft">{active.description}</p>
          <button
            onClick={() => setLaunched(true)}
            className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 rounded-[var(--radius-input)] bg-ink px-7 py-3 font-sans text-[0.82rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-gold-deep"
          >
            Launch 360° tour
          </button>
        </div>
      </div>

      {launched && (
        <PanoViewer tour={active.tour} title={active.name} onClose={() => setLaunched(false)} />
      )}
    </div>
  );
}
