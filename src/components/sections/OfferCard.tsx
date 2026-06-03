import Link from "next/link";

import { MediaFrame } from "@/components/primitives/MediaFrame";
import { OfferBadge } from "@/components/sections/OfferBadge";
import { resolveMedia } from "@/lib/cms";
import { formatDate } from "@/lib/utils";
import type { Offer } from "@/types";

/* OFFER CARD (§Page 13 hub §2) — heroMedia + OfferBadge + title + summary +
   validUntil, linking to the offer detail. Server component. */
export function OfferCard({ offer }: { offer: Offer }) {
  const media = resolveMedia(offer.heroMedia);
  const until = formatDate(offer.validUntil);

  return (
    <Link
      href={`/offers/${offer.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-champagne bg-ivory transition-colors hover:border-gold"
    >
      <div className="relative overflow-hidden">
        <MediaFrame
          media={media}
          ratio="landscape"
          rounded={false}
          sizes="(min-width: 768px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4">
          <OfferBadge offer={offer} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-7">
        <h3 className="font-display text-step-2 text-ink">{offer.title}</h3>
        <p className="flex-1 text-ink-soft">{offer.summary}</p>
        {until && (
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-taupe">
            Available until {until}
          </p>
        )}
        <span className="mt-1 inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-gold-deep">
          View offer
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
