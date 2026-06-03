"use client";

import { useInView } from "@/lib/use-in-view";
import { cn, paragraphs } from "@/lib/utils";
import type { HistoryMilestone } from "@/types";

/* HERITAGE TIMELINE (§Page 19 §3) — ordered milestones down a gilded line, each
   blooming in on scroll (reduced-motion → static). Readable in document order
   (an ordered list); the dot/line are decorative. */
export function HeritageTimeline({ milestones }: { milestones: HistoryMilestone[] }) {
  if (milestones.length === 0) return null;
  return (
    <ol className="relative mx-auto flex max-w-2xl flex-col">
      {/* gilded spine (decorative) */}
      <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-champagne md:left-1/2" />
      {milestones.map((m, i) => (
        <Milestone key={m.id} milestone={m} flip={i % 2 === 1} />
      ))}
    </ol>
  );
}

function Milestone({ milestone, flip }: { milestone: HistoryMilestone; flip: boolean }) {
  const { ref, inView } = useInView<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-9 pb-12 last:pb-0 md:w-1/2 md:pl-0 md:pb-16",
        flip ? "md:self-end md:pl-12 md:text-left" : "md:self-start md:pr-12 md:text-right",
        "transition-[opacity,transform] duration-700 ease-[var(--ease-cinematic)] motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      {/* dot (decorative) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-gold bg-ivory",
          flip ? "md:-left-[7px]" : "md:left-auto md:-right-[7px]",
        )}
      />
      <span className="font-script text-[1.7rem] leading-none text-gold">{milestone.year}</span>
      <h3 className="mt-2 font-display text-step-1 text-ink">{milestone.title}</h3>
      <div className="mt-2 space-y-2">
        {paragraphs(milestone.body).map((p, i) => (
          <p key={i} className="text-ink-soft">
            {p}
          </p>
        ))}
      </div>
    </li>
  );
}
