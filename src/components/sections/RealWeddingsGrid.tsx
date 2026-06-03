"use client";

import { useState } from "react";
import { flushSync } from "react-dom";

import { FilterChips, type FilterOption } from "@/components/sections/FilterChips";
import { RealWeddingCard, type RealWeddingCardData } from "@/components/sections/RealWeddingCard";
import { prefersReducedMotion } from "@/lib/motion";

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => void };

/* REAL WEDDINGS GRID (§Page 15 index §2–3) — client filter by culture with
   smooth, CLS-free View Transitions; aria-pressed chips + live-region count. */
export function RealWeddingsGrid({
  weddings,
  filters,
}: {
  weddings: RealWeddingCardData[];
  filters: FilterOption[];
}) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? weddings : weddings.filter((w) => w.culture === active);

  function applyFilter(next: string) {
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
      <FilterChips filters={filters} active={active} onChange={applyFilter} label="Filter real weddings by culture" />

      <p role="status" aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "story" : "stories"} shown
      </p>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((wedding) => (
          <li key={wedding.id} style={{ ["viewTransitionName" as string]: `rw-${wedding.id}` }}>
            <RealWeddingCard wedding={wedding} />
          </li>
        ))}
      </ul>
    </div>
  );
}
