"use client";

import { useId, useState } from "react";

import { cn, paragraphs } from "@/lib/utils";
import type { Faq } from "@/types";

/* FAQ ACCORDION (§Page 19 FAQs) — proper disclosure pattern: each question is a
   <button aria-expanded> controlling its answer region (aria-labelledby). Grouped
   by category. Keyboard-operable by default; one open at a time per group is not
   enforced (independent disclosures, friendlier for scanning). */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  // Preserve first-seen category order.
  const categories: string[] = [];
  for (const f of faqs) if (!categories.includes(f.category)) categories.push(f.category);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
      {categories.map((category) => (
        <section key={category} aria-labelledby={`cat-${slug(category)}`}>
          <h2
            id={`cat-${slug(category)}`}
            className="mb-5 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-taupe"
          >
            {category}
          </h2>
          <ul className="flex flex-col divide-y divide-champagne border-y border-champagne">
            {faqs
              .filter((f) => f.category === category)
              .map((faq) => (
                <FaqItem key={faq.id} faq={faq} />
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const btnId = `faq-btn-${id}`;
  const panelId = `faq-panel-${id}`;
  return (
    <li>
      <h3 className="m-0">
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-step-1 text-ink">{faq.question}</span>
          <span
            aria-hidden="true"
            className={cn(
              "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-transform duration-[var(--dur-micro)]",
              open && "rotate-45 border-gold text-gold-deep",
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="pb-6"
      >
        <div className="max-w-2xl space-y-3 text-ink-soft">
          {paragraphs(faq.answer).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </li>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
