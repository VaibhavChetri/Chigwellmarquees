"use client";

import { cn } from "@/lib/utils";

export type FilterOption = { key: string; label: string };

/* FILTER CHIPS (§Page 12 §2) — real toggle buttons with aria-pressed; keyboard
   operable by default. ≥44px tap target. The active chip reads gold-filled. */
export function FilterChips({
  filters,
  active,
  onChange,
  label,
}: {
  filters: FilterOption[];
  active: string;
  onChange: (key: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2.5">
      {filters.map((f) => {
        const pressed = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(f.key)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-5 py-1.5",
              "font-sans text-[0.72rem] uppercase tracking-[0.14em]",
              "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-cinematic)]",
              pressed
                ? "border-gold bg-gold text-ink"
                : "border-ink/20 text-ink-soft hover:border-gold hover:text-gold-deep",
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
