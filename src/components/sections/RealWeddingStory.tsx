import Image from "next/image";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { LinkGilded } from "@/components/primitives/LinkGilded";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionShell } from "@/components/primitives/SectionShell";
import { RealWeddingCard, type RealWeddingCardData } from "@/components/sections/RealWeddingCard";
import { TestimonialPullQuote } from "@/components/sections/TestimonialPullQuote";
import { VenueGallery } from "@/components/sections/VenueGallery";
import { resolveMedia } from "@/lib/cms";
import { cn, formatDate, paragraphs } from "@/lib/utils";
import type { RealWedding, Testimonial } from "@/types";

/* REAL WEDDING STORY (§Page 15 detail) — cinematic hero, Editorial-Rise story,
   parallax gallery, supplier credits, testimonial, related stories. Server
   component (RevealText / VenueGallery are the only client islands). */
export function RealWeddingStory({
  wedding,
  venueName,
  testimonial,
  related,
  breadcrumbs,
}: {
  wedding: RealWedding;
  venueName: string | null;
  testimonial: Testimonial | null;
  related: RealWeddingCardData[];
  breadcrumbs: { name: string; path: string }[];
}) {
  const hero = resolveMedia(wedding.heroMedia);
  const galleryMedia = wedding.gallery
    .map((ref) => resolveMedia(ref))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const dateLabel = formatDate(wedding.date);
  const storyParas = paragraphs(wedding.story);

  return (
    <>
      {/* 1 · Cinematic hero */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {hero && (
            <Image
              src={hero.url}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              placeholder={hero.blurDataURL ? "blur" : "empty"}
              blurDataURL={hero.blurDataURL}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.8),rgba(33,29,23,0.1)_55%,rgba(33,29,23,0.4))]" />
        </div>
        <div className="container-edge pb-20 pt-36">
          <p className="mb-4 flex flex-wrap items-center gap-3 font-sans text-[0.74rem] uppercase tracking-[0.18em] text-champagne">
            {dateLabel && <span>{dateLabel}</span>}
            {venueName && (
              <>
                <span aria-hidden="true">·</span>
                <span>{venueName}</span>
              </>
            )}
          </p>
          <RevealText
            lines={[wedding.coupleNames]}
            as="h1"
            className="max-w-4xl font-display text-step-5 italic leading-[0.95] text-ivory"
          />
          {wedding.guestCount && (
            <p className="mt-5 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ivory/80">
              {wedding.guestCount.toLocaleString("en-GB")} guests
            </p>
          )}
        </div>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* 2 · Story */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <ScriptEyebrow align="center">Their day</ScriptEyebrow>
        <div className="mt-6 max-w-2xl space-y-5 text-left">
          {storyParas.map((p, i) => {
            const isQuote = p.trim().startsWith("“");
            return (
              <p
                key={i}
                className={cn(
                  isQuote
                    ? "border-l-2 border-gold pl-5 font-display text-step-1 italic text-ink"
                    : i === 0
                      ? "font-display text-step-2 italic leading-snug text-ink"
                      : "text-step-0 leading-relaxed text-ink-soft",
                )}
              >
                {p}
              </p>
            );
          })}
        </div>
        <FlourishDivider />
      </SectionShell>

      {/* 3 · Gallery */}
      {galleryMedia.length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center">
            <ScriptEyebrow align="center">The day in pictures</ScriptEyebrow>
          </div>
          <VenueGallery media={galleryMedia} venueName={`${wedding.coupleNames} gallery`} />
        </SectionShell>
      )}

      {/* 4 · Suppliers */}
      {wedding.suppliers && wedding.suppliers.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col items-center gap-8 text-center">
          <ScriptEyebrow align="center">The dream team</ScriptEyebrow>
          <dl className="grid w-full max-w-3xl gap-x-10 gap-y-5 sm:grid-cols-2">
            {wedding.suppliers.map((s) => (
              <div key={`${s.role}-${s.name}`} className="flex items-baseline justify-between gap-4 border-b border-champagne pb-3 text-left">
                <dt className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-taupe">{s.role}</dt>
                <dd className="font-display text-step-0 text-ink">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-deep">
                      {s.name}
                    </a>
                  ) : (
                    s.name
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </SectionShell>
      )}

      {/* 5 · Testimonial */}
      {testimonial && (
        <SectionShell tone="parchment">
          <TestimonialPullQuote testimonial={testimonial} />
        </SectionShell>
      )}

      {/* 6 · Related real weddings */}
      {related.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <ScriptEyebrow align="center">More real weddings</ScriptEyebrow>
            <h2 className="font-display text-step-3 text-ink">Stories like theirs</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((w) => (
              <li key={w.id}>
                <RealWeddingCard wedding={w} />
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <LinkGilded href="/real-weddings">See all real weddings</LinkGilded>
          </div>
        </SectionShell>
      )}
    </>
  );
}
