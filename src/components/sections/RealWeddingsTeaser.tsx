import Link from "next/link";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Tag } from "@/components/primitives/Tag";
import { resolveMedia } from "@/lib/cms";
import type { RealWedding } from "@/types";

/* REAL WEDDINGS TEASER (§11 §7) — editorial 3-up: couple names in Fraunces
   italic, culture tag, thumbnail → /real-weddings/[slug]. Server component. */
export function RealWeddingsTeaser({ weddings }: { weddings: RealWedding[] }) {
  if (weddings.length === 0) return null;
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {weddings.map((wedding) => {
        const media = resolveMedia(wedding.heroMedia);
        return (
          <Link
            key={wedding.id}
            href={`/real-weddings/${wedding.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <MediaFrame
                media={media}
                ratio="landscape"
                rounded={false}
                sizes="(min-width: 768px) 33vw, 100vw"
                imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              {wedding.culture && <Tag tone="blush">{wedding.culture}</Tag>}
              <h3 className="font-display text-step-2 italic text-ink">{wedding.coupleNames}</h3>
              {wedding.guestCount && (
                <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">
                  {wedding.guestCount.toLocaleString("en-GB")} guests
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
