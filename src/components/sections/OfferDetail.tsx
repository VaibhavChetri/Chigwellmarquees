import Image from "next/image";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionShell } from "@/components/primitives/SectionShell";
import { OfferBadge } from "@/components/sections/OfferBadge";
import { ValidUntilCountdown } from "@/components/sections/ValidUntilCountdown";
import { resolveMedia } from "@/lib/cms";
import { paragraphs } from "@/lib/utils";
import type { Offer } from "@/types";

/* OFFER DETAIL (§Page 13 detail) — hero (heroMedia + OfferBadge), details,
   terms, tasteful validity cue, CTA → enquiry with source:'offer'. */
export function OfferDetail({
  offer,
  breadcrumbs,
}: {
  offer: Offer;
  breadcrumbs: { name: string; path: string }[];
}) {
  const media = resolveMedia(offer.heroMedia);
  const poster = media?.type === "video" ? media.posterUrl : media?.url;

  return (
    <>
      {/* 1 · Hero */}
      <section className="relative flex min-h-[68svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {poster && (
            <Image
              src={poster}
              alt={media?.alt ?? offer.title}
              fill
              priority
              sizes="100vw"
              placeholder={media?.blurDataURL ? "blur" : "empty"}
              blurDataURL={media?.blurDataURL}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.78),rgba(33,29,23,0.15)_60%,rgba(33,29,23,0.35))]" />
        </div>
        <div className="container-edge pb-16 pt-36">
          <OfferBadge offer={offer} className="mb-5" />
          <RevealText
            lines={[offer.title]}
            as="h1"
            className="max-w-4xl font-display text-step-4 leading-[0.98] text-ivory"
          />
          <p className="mt-5 max-w-xl text-step-1 text-ivory/85">{offer.summary}</p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* 2 · Details */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <div className="max-w-2xl space-y-5">
          {paragraphs(offer.details).map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-display text-step-2 italic leading-snug text-ink"
                  : "text-step-0 leading-relaxed text-ink-soft"
              }
            >
              {p}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <ValidUntilCountdown validUntil={offer.validUntil} />
        </div>
        <FlourishDivider />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <EnquireButton source="offer" prefill={{ eventType: "wedding" }} magnetic>
            {offer.cta.label}
          </EnquireButton>
        </div>
      </SectionShell>

      {/* 3 · Terms */}
      {offer.terms && paragraphs(offer.terms).length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col items-center gap-5 text-center">
          <h2 className="font-sans text-[0.72rem] uppercase tracking-[0.18em] text-taupe">
            Terms &amp; conditions
          </h2>
          <ul className="max-w-2xl space-y-2 text-[0.86rem] text-ink-soft">
            {paragraphs(offer.terms).map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </SectionShell>
      )}
    </>
  );
}
