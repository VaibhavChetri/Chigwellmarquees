import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { HostSignature } from "@/components/ornaments/HostSignature";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { LinkGilded } from "@/components/primitives/LinkGilded";
import { SectionShell } from "@/components/primitives/SectionShell";
import {
  AwardsStrip,
  BrochureCTA,
  DreamDayStoryboard,
  EditorialPillar,
  EnquiryBand,
  Hero,
  MobileEnquireBar,
  MulticulturalFeature,
  RealWeddingsTeaser,
  SocialWall,
  TestimonialPullQuote,
  VenueTriptych,
} from "@/components/sections";
import {
  getAwards,
  getFeaturedOffer,
  getHomePage,
  getOccasion,
  getOccasionsByIds,
  getRealWeddingsByIds,
  getSiteSettings,
  getSocialPosts,
  getTestimonialsByIds,
  getVenuesByIds,
  resolveMedia,
} from "@/lib/cms";
import { buildMetadata, offerJsonLd } from "@/lib/seo";
import { paragraphs } from "@/lib/utils";

/* ============================================================================
   PAGE 01 — HOME (§11). Composed entirely from the HomePage singleton +
   referenced records (zero hard-coded copy/media). Signature moment: the pinned
   "Your Dream Day" storyboard. Botanical bloom + hand-signed welcome support it.
   ============================================================================ */

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  return buildMetadata(home.seo, "/");
}

export default async function HomePage() {
  const [home, settings, awards, social, featuredOffer] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
    getAwards(),
    getSocialPosts(),
    getFeaturedOffer(),
  ]);

  const [pillars, venues, realWeddings, testimonials, multicultural] = await Promise.all([
    getOccasionsByIds(home.pillars),
    getVenuesByIds(home.featuredVenues),
    getRealWeddingsByIds(home.featuredRealWeddings),
    getTestimonialsByIds(home.featuredTestimonials),
    getOccasion("multicultural-weddings"),
  ]);

  const heroMedia = resolveMedia(home.hero.media);
  const storyScenes =
    home.storyboard?.scenes.map((s) => ({ ...s, media: resolveMedia(s.media) })) ?? [];

  return (
    <>
      {/* Offer JSON-LD (§5) — only when a featured offer is surfaced */}
      {featuredOffer && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(offerJsonLd(featuredOffer, settings.brandName)),
          }}
        />
      )}

      {/* 1 · Hero — cinematic, the only h1 */}
      <Hero
        media={heroMedia}
        eyebrow={home.hero.eyebrow}
        headline={home.hero.headline}
        subheading={home.hero.subheading}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
      />

      {/* 2 · Heritage intro + host signature */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <ScriptEyebrow align="center">A heritage of romance</ScriptEyebrow>
        <div className="mt-6 max-w-3xl space-y-5">
          {paragraphs(home.intro).map((p, i) => (
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
        {settings.hostSignature && (
          <div className="mt-10">
            <HostSignature
              name={settings.hostSignature.name}
              role={settings.hostSignature.role}
              signatureMedia={settings.hostSignature.signatureMedia}
            />
          </div>
        )}
        <FlourishDivider />
      </SectionShell>

      {/* 3 · Editorial pillar blocks */}
      <SectionShell tone="parchment" innerClassName="flex flex-col gap-24 md:gap-32">
        {pillars.map((occasion, i) => (
          <EditorialPillar key={occasion.id} occasion={occasion} index={i} />
        ))}
      </SectionShell>

      {/* 4 · Venue triptych */}
      <SectionShell tone="ivory" innerClassName="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center">
          <ScriptEyebrow align="center">Three ways to celebrate</ScriptEyebrow>
          <h2 className="mt-3 font-display text-step-3 text-ink">Your space, your scale</h2>
        </div>
        <VenueTriptych venues={venues} />
      </SectionShell>

      {/* 5 · "Your Dream Day" — pinned storyboard (SIGNATURE MOMENT) */}
      {home.storyboard && storyScenes.length > 0 && (
        <DreamDayStoryboard
          eyebrow={home.storyboard.eyebrow}
          heading={home.storyboard.heading}
          scenes={storyScenes}
        />
      )}

      {/* 6 · Awards strip */}
      {home.showAwards && awards.length > 0 && (
        <SectionShell tone="parchment">
          <AwardsStrip awards={awards} />
        </SectionShell>
      )}

      {/* 7 · Real weddings teaser */}
      {realWeddings.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <ScriptEyebrow align="center">Real weddings</ScriptEyebrow>
            <h2 className="font-display text-step-3 text-ink">Celebrations held here</h2>
            <LinkGilded href="/real-weddings">See all real weddings</LinkGilded>
          </div>
          <RealWeddingsTeaser weddings={realWeddings} />
        </SectionShell>
      )}

      {/* 8 · Multicultural feature band */}
      {multicultural && <MulticulturalFeature occasion={multicultural} />}

      {/* 9 · Testimonials */}
      {testimonials.length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col gap-16">
          {testimonials.map((t) => (
            <TestimonialPullQuote key={t.id} testimonial={t} />
          ))}
        </SectionShell>
      )}

      {/* 10 · Brochure + Info & Pricing */}
      <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
        <div className="flex flex-col items-center text-center">
          <ScriptEyebrow align="center">Begin the conversation</ScriptEyebrow>
          <h2 className="mt-3 font-display text-step-3 text-ink">Plan your day with us</h2>
        </div>
        <BrochureCTA />
      </SectionShell>

      {/* 11 · Instagram / social wall (images lazy + blur, no CLS) */}
      {home.showSocialWall && social.length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col gap-10">
          <div className="text-center">
            <ScriptEyebrow align="center">From our celebrations</ScriptEyebrow>
            <h2 className="mt-3 font-display text-step-3 text-ink">As seen on Instagram</h2>
          </div>
          <SocialWall posts={social} instagramUrl={settings.social.instagram} />
        </SectionShell>
      )}

      {/* 12 · Closing enquiry band */}
      <EnquiryBand settings={settings} />

      {/* Sticky mobile Enquire */}
      <MobileEnquireBar />
    </>
  );
}
