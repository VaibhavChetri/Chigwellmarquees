"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Tag } from "@/components/primitives/Tag";
import { FilterChips, type FilterOption } from "@/components/sections/FilterChips";
import { prefersReducedMotion } from "@/lib/motion";
import type { MediaAsset } from "@/types";

export type OccasionCard = {
  id: string;
  title: string;
  line: string;
  kindLabel: string;
  filterKey: string;
  href: string;
  media: MediaAsset | null;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => void;
};

/* OCCASION GRID (§Page 12 §3) — client-side filtered card grid. Filter changes
   are wrapped in the View Transitions API so remaining cards FLIP smoothly and
   entering/leaving cards cross-fade — no layout jank, no CLS, no extra deps.
   Reduced-motion / unsupported browsers fall back to an instant swap. */
export function OccasionGrid({
  cards,
  filters,
}: {
  cards: OccasionCard[];
  filters: FilterOption[];
}) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? cards : cards.filter((c) => c.filterKey === active);

  function apply(next: string) {
    if (next === active) return;
    const doc = typeof document !== "undefined" ? (document as ViewTransitionDocument) : null;
    if (doc?.startViewTransition && !prefersReducedMotion()) {
      doc.startViewTransition(() => flushSync(() => setActive(next)));
    } else {
      setActive(next);
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <FilterChips
        filters={filters}
        active={active}
        onChange={apply}
        label="Filter occasions by type"
      />

      {/* Result count for assistive tech */}
      <p role="status" aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "occasion" : "occasions"} shown
      </p>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => (
          <li
            key={card.id}
            style={{ ["viewTransitionName" as string]: `ev-${card.id}` }}
          >
            <Link href={card.href} className="group flex h-full flex-col gap-4">
              <div className="overflow-hidden rounded-[var(--radius-card)]">
                <MediaFrame
                  media={card.media}
                  ratio="landscape"
                  rounded={false}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Tag tone="sage">{card.kindLabel}</Tag>
                <h3 className="font-display text-step-2 text-ink">{card.title}</h3>
                <p className="text-ink-soft">{card.line}</p>
                <span className="mt-1 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">
                  Discover{" "}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
