"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

/* TESTIMONIAL PULL-QUOTE (§11 §9 / §Page 16) — large Fraunces-italic quote;
   author in a <cite>, context, optional star rating; fade/blur-in on scroll
   (reduced-motion safe). `tone="blush"` gives the testimonials-wall treatment. */
export function TestimonialPullQuote({
  testimonial,
  tone = "ink",
}: {
  testimonial: Testimonial;
  tone?: "ink" | "blush";
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <figure
      ref={ref}
      className={cn(
        "mx-auto flex max-w-3xl flex-col items-center gap-6 text-center",
        "transition-[opacity,filter,transform] duration-700 ease-[var(--ease-cinematic)] motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[6px]",
      )}
    >
      {typeof testimonial.rating === "number" && (
        <Stars rating={testimonial.rating} />
      )}
      <blockquote
        className={cn(
          "font-display text-step-2 italic leading-snug",
          tone === "blush" ? "text-rose-deep" : "text-ink",
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex flex-col items-center gap-1">
        <cite className="font-display text-step-0 not-italic text-ink">
          {testimonial.author}
        </cite>
        {testimonial.context && (
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft">
            {testimonial.context}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-1 text-gold" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
