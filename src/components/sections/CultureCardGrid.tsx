import Link from "next/link";

import { OrnamentCorner } from "@/components/ornaments/OrnamentCorner";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { resolveMedia } from "@/lib/cms";
import type { Occasion } from "@/types";

/* CULTURE CARD GRID (§Page 06 §3) — one card per culture occasion, each in a
   botanical frame (OrnamentCorner blooms on scroll), routing to its detail
   page. Each card is a single descriptive link. Server component. */
export function CultureCardGrid({ occasions }: { occasions: Occasion[] }) {
  if (occasions.length === 0) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {occasions.map((occasion) => {
        const media = resolveMedia(occasion.heroMedia);
        return (
          <li key={occasion.id}>
            <Link
              href={`/event/${occasion.slug}`}
              aria-label={`${occasion.title}: ${occasion.heroSubheading}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-champagne bg-ivory transition-colors hover:border-gold"
            >
              <OrnamentCorner corner="tr" stroke="var(--gold)" className="h-16 w-16" />
              <div className="overflow-hidden">
                <MediaFrame
                  media={media}
                  ratio="portrait"
                  rounded={false}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="font-display text-step-1 text-ink">{occasion.title}</h3>
                <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                  {occasion.heroSubheading}
                </p>
                <span className="mt-auto pt-3 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">
                  Explore <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
