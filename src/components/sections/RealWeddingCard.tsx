import Link from "next/link";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { Tag } from "@/components/primitives/Tag";
import type { MediaAsset } from "@/types";

export type RealWeddingCardData = {
  id: string;
  slug: string;
  coupleNames: string;
  culture?: string;
  dateLabel?: string;
  media: MediaAsset | null;
};

/* REAL WEDDING CARD (§Page 15 index §3) — coupleNames in Fraunces italic,
   culture tag, date, hero thumbnail → detail. Presentational (no hooks), so it
   composes inside the client-filtered grid. */
export function RealWeddingCard({ wedding }: { wedding: RealWeddingCardData }) {
  return (
    <Link href={`/real-weddings/${wedding.slug}`} className="group flex h-full flex-col gap-4">
      <div className="overflow-hidden rounded-[var(--radius-card)]">
        <MediaFrame
          media={wedding.media}
          ratio="landscape"
          rounded={false}
          sizes="(min-width: 768px) 33vw, 100vw"
          imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        {wedding.culture && <Tag tone="blush">{wedding.culture}</Tag>}
        <h3 className="font-display text-step-2 italic text-ink">{wedding.coupleNames}</h3>
        {wedding.dateLabel && (
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-taupe">
            {wedding.dateLabel}
          </p>
        )}
      </div>
    </Link>
  );
}
