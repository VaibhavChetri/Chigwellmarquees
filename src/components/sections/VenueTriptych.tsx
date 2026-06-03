import Link from "next/link";

import { LinkGilded } from "@/components/primitives/LinkGilded";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Tag } from "@/components/primitives/Tag";
import { resolveMedia } from "@/lib/cms";
import type { Venue } from "@/types";

/* VENUE TRIPTYCH (§11 §4) — three MediaFrame cards (Mega / Mini / Secret
   Garden). Capacity, tagline, gilded-underline link; hover image scale 1.03 +
   caption rise. 1 → 3 cols at lg. Server component. */
export function VenueTriptych({ venues }: { venues: Venue[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {venues.map((venue) => {
        const media = resolveMedia(venue.heroMedia);
        return (
          <article key={venue.id} className="group flex flex-col gap-5">
            <Link
              href={`/venue/${venue.slug}`}
              className="relative block overflow-hidden rounded-[var(--radius-card)]"
              aria-label={`${venue.name} — ${venue.tagline}`}
            >
              <MediaFrame
                media={media}
                ratio="portrait"
                rounded={false}
                sizes="(min-width: 1024px) 33vw, 100vw"
                imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4">
                <Tag tone="gold">
                  Up to {venue.capacity.max.toLocaleString("en-GB")}
                </Tag>
              </span>
            </Link>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-step-2 text-ink">{venue.name}</h3>
              <p className="text-ink-soft">{venue.tagline}</p>
              <LinkGilded href={`/venue/${venue.slug}`} className="mt-2">
                Discover {venue.name}
              </LinkGilded>
            </div>
          </article>
        );
      })}
    </div>
  );
}
