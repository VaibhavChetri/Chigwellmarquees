import Link from "next/link";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { LinkGilded } from "@/components/primitives/LinkGilded";
import { SectionShell } from "@/components/primitives/SectionShell";
import { Tag } from "@/components/primitives/Tag";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { FloorPlanViewer } from "@/components/sections/FloorPlanViewer";
import { RealWeddingsTeaser } from "@/components/sections/RealWeddingsTeaser";
import { SpecStrip } from "@/components/sections/SpecStrip";
import { TestimonialPullQuote } from "@/components/sections/TestimonialPullQuote";
import { VenueGallery } from "@/components/sections/VenueGallery";
import { VenueHero } from "@/components/sections/VenueHero";
import { resolveMedia } from "@/lib/cms";
import { cn, paragraphs } from "@/lib/utils";
import type { Enquiry, RealWedding, SiteSettings, Testimonial, Venue } from "@/types";

const VENUE_PREFS = ["mega-marquee", "mini-marquee", "secret-garden"] as const;

function toVenuePreference(slug: string): NonNullable<Enquiry["venuePreference"]> {
  return (VENUE_PREFS as readonly string[]).includes(slug)
    ? (slug as NonNullable<Enquiry["venuePreference"]>)
    : "unsure";
}

/* ============================================================================
   VENUE TEMPLATE (§Page 02) — reusable; renders ANY Venue from CMS by slug.
   Mega Marquee is just the first record rendered through it.
   ============================================================================ */
export function VenueTemplate({
  venue,
  settings,
  relatedWeddings,
  testimonial,
}: {
  venue: Venue;
  settings: SiteSettings;
  relatedWeddings: RealWedding[];
  testimonial: Testimonial | null;
}) {
  const gallery = venue.gallery
    .map((ref) => resolveMedia(ref))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  const heroMedia = resolveMedia(venue.heroMedia);
  const floorPlan = resolveMedia(venue.floorPlan);
  const venuePref = toVenuePreference(venue.slug);

  return (
    <>
      {/* 1 · Hero */}
      <VenueHero venue={venue} media={heroMedia} />

      {/* Breadcrumbs */}
      <div className="border-b border-champagne bg-ivory">
        <nav aria-label="Breadcrumb" className="container-edge py-4">
          <ol className="flex flex-wrap items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-taupe">
            <li>
              <Link href="/" className="hover:text-gold-deep">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/venues" className="hover:text-gold-deep">
                Venues
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {venue.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* 2 · Overview */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <ScriptEyebrow align="center">The space</ScriptEyebrow>
        <p className="mt-5 max-w-3xl font-display text-step-2 italic leading-snug text-ink">
          {venue.intro}
        </p>
        <div className="mt-6 max-w-2xl space-y-4 text-left md:text-center">
          {paragraphs(venue.body).map((p, i) => (
            <p key={i} className="text-step-0 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
        {venue.features.length > 0 && (
          <ul className="mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {venue.features.map((f) => (
              <li key={f}>
                <Tag tone="sage">{f}</Tag>
              </li>
            ))}
          </ul>
        )}
        <FlourishDivider />
      </SectionShell>

      {/* 3 · Spec strip */}
      <SectionShell tone="parchment" innerClassName="flex flex-col gap-8">
        <div className="text-center">
          <ScriptEyebrow align="center">At a glance</ScriptEyebrow>
        </div>
        <SpecStrip specs={venue.specs} />
      </SectionShell>

      {/* 4 · Feature gallery */}
      {gallery.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center">
            <ScriptEyebrow align="center">The gallery</ScriptEyebrow>
            <h2 className="mt-3 font-display text-step-3 text-ink">Inside {venue.name}</h2>
          </div>
          <VenueGallery media={gallery} venueName={venue.name} />
        </SectionShell>
      )}

      {/* 5 · Floor plan */}
      <SectionShell tone="parchment">
        <FloorPlanViewer venue={venue} media={floorPlan} />
      </SectionShell>

      {/* 6 · Virtual tour teaser */}
      {venue.virtualTour && (
        <SectionShell tone="ink" innerClassName="flex flex-col items-center gap-6 text-center">
          <ScriptEyebrow align="center" className="text-champagne">
            Step inside
          </ScriptEyebrow>
          <h2 className="max-w-2xl font-display text-step-3 text-ivory">
            Explore {venue.name} in 360°
          </h2>
          <p className="max-w-md text-ivory/70">
            Wander the space from anywhere — a full virtual walk-through of the marquee and grounds.
          </p>
          <Link
            href="/virtual-tour"
            className={cn(
              "mt-2 inline-flex min-h-11 items-center gap-3 rounded-[var(--radius-input)] border border-champagne/50 px-7 py-3",
              "font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:border-champagne hover:text-champagne",
            )}
          >
            <span aria-hidden="true">▶</span> Launch virtual tour
          </Link>
        </SectionShell>
      )}

      {/* 7 · Real weddings here */}
      {relatedWeddings.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <ScriptEyebrow align="center">Held here</ScriptEyebrow>
            <h2 className="font-display text-step-3 text-ink">Real weddings in {venue.name}</h2>
            <LinkGilded href="/real-weddings">See all real weddings</LinkGilded>
          </div>
          <RealWeddingsTeaser weddings={relatedWeddings} />
        </SectionShell>
      )}

      {/* 8 · Featured testimonial */}
      {testimonial && (
        <SectionShell tone="parchment">
          <TestimonialPullQuote testimonial={testimonial} />
        </SectionShell>
      )}

      {/* 9 · Enquiry band — venue prefilled */}
      <EnquiryBand settings={settings} source="occasion-cta" prefill={{ venuePreference: venuePref }} />
    </>
  );
}
