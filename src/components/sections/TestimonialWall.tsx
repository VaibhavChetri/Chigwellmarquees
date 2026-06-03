"use client";

import { useState } from "react";
import { flushSync } from "react-dom";

import { FilterChips, type FilterOption } from "@/components/sections/FilterChips";
import { TestimonialPullQuote } from "@/components/sections/TestimonialPullQuote";
import { prefersReducedMotion } from "@/lib/motion";
import type { Testimonial } from "@/types";

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => void };

/* TESTIMONIAL WALL (§Page 16 §2) — editorial pull-quote wall, optionally
   filtered by occasion kind. Large blush quotes, fade/blur-in. Filter changes
   use View Transitions (no CLS); chips are accessible (aria-pressed) and the
   result count is announced. */
export function TestimonialWall({
  testimonials,
  filters,
}: {
  testimonials: Testimonial[];
  filters: FilterOption[];
}) {
  const [active, setActive] = useState("all");
  const visible =
    active === "all" ? testimonials : testimonials.filter((t) => t.occasionKind === active);

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
    <div className="flex flex-col gap-14">
      {filters.length > 1 && (
        <FilterChips
          filters={filters}
          active={active}
          onChange={applyFilter}
          label="Filter testimonials by occasion"
        />
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "testimonial" : "testimonials"} shown
      </p>

      <div className="columns-1 gap-12 md:columns-2 [&>*]:mb-12">
        {visible.map((t) => (
          <div
            key={t.id}
            style={{ ["viewTransitionName" as string]: `tw-${t.id}` }}
            className="[break-inside:avoid] rounded-[var(--radius-card)] border border-champagne/70 bg-ivory/60 p-8"
          >
            <TestimonialPullQuote testimonial={t} tone="blush" />
          </div>
        ))}
      </div>
    </div>
  );
}
