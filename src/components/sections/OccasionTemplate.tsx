import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { HostSignature } from "@/components/ornaments/HostSignature";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { SectionShell } from "@/components/primitives/SectionShell";
import { Tag } from "@/components/primitives/Tag";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { OccasionHero } from "@/components/sections/OccasionHero";
import { OccasionSectionRenderer } from "@/components/sections/OccasionSectionRenderer";
import { RealWeddingsTeaser } from "@/components/sections/RealWeddingsTeaser";
import { TestimonialPullQuote } from "@/components/sections/TestimonialPullQuote";
import { VenueGallery } from "@/components/sections/VenueGallery";
import { resolveMedia } from "@/lib/cms";
import { paragraphs } from "@/lib/utils";
import type { Occasion, RealWedding, SiteSettings, Testimonial } from "@/types";

type Crumb = { name: string; path: string };

/* ============================================================================
   OCCASION TEMPLATE (§Page 05) — reusable; renders ANY Occasion from CMS.
   Drives /weddings now, and every cultural + event page (06–12) thereafter,
   which then need only a content record. Content-driven section engine.
   ============================================================================ */
export function OccasionTemplate({
  occasion,
  settings,
  relatedWeddings,
  testimonial,
  breadcrumbs,
}: {
  occasion: Occasion;
  settings: SiteSettings;
  relatedWeddings: RealWedding[];
  testimonial: Testimonial | null;
  breadcrumbs: Crumb[];
}) {
  const heroMedia = resolveMedia(occasion.heroMedia);
  // §Page 11 allowed conditional — a kind-based accent. Corporate reads
  // refined-professional (sage/ink-led, less blush); everything else stays
  // romantic/gold. This is the ONLY behavioural branch in the template.
  const isCorporate = occasion.kind === "corporate";
  const accent = isCorporate ? "sage" : "gold";
  const hasGallerySection = occasion.sections.some((s) => s.layout === "gallery");
  const galleryMedia = occasion.gallery
    .map((ref) => resolveMedia(ref))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      {/* 1 · Hero */}
      <OccasionHero occasion={occasion} media={heroMedia} />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* 2 · Intro + optional host signature */}
      {occasion.intro && (
        <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
          <ScriptEyebrow align="center" tone={accent}>
            Welcome
          </ScriptEyebrow>
          <div className="mt-6 max-w-3xl space-y-5">
            {paragraphs(occasion.intro).map((p, i) => (
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
      )}

      {/* 3 · Ordered sections — the flexible engine */}
      {occasion.sections.map((section, i) => (
        <OccasionSectionRenderer
          key={`${section.layout}-${i}`}
          section={section}
          index={i}
          occasionTitle={occasion.title}
        />
      ))}

      {/* 4 · Facilities + why-choose-us */}
      {(occasion.whyChooseUs?.length || occasion.facilities?.length) && (
        <SectionShell tone={isCorporate ? "sand" : "parchment"} innerClassName="flex flex-col items-center gap-10 text-center">
          <ScriptEyebrow align="center" tone={accent}>
            {isCorporate ? "Why teams choose us" : "Why families choose us"}
          </ScriptEyebrow>
          {occasion.whyChooseUs && occasion.whyChooseUs.length > 0 && (
            <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
              {occasion.whyChooseUs.map((reason) => (
                <li
                  key={reason}
                  className="rounded-[var(--radius-card)] border border-champagne bg-ivory px-6 py-5 font-display text-step-1 text-ink"
                >
                  {reason}
                </li>
              ))}
            </ul>
          )}
          {occasion.facilities && occasion.facilities.length > 0 && (
            <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {occasion.facilities.map((f) => (
                <li key={f}>
                  <Tag tone={accent}>{f}</Tag>
                </li>
              ))}
            </ul>
          )}
        </SectionShell>
      )}

      {/* 5 · Gallery (only if not already shown via a gallery-layout section) */}
      {!hasGallerySection && galleryMedia.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center">
            <ScriptEyebrow align="center" tone={accent}>
              The gallery
            </ScriptEyebrow>
          </div>
          <VenueGallery media={galleryMedia} venueName={`${occasion.title} gallery`} />
        </SectionShell>
      )}

      {/* 6 · Related real weddings */}
      {relatedWeddings.length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <ScriptEyebrow align="center">Real weddings</ScriptEyebrow>
            <h2 className="mt-3 font-display text-step-3 text-ink">Celebrations like yours</h2>
          </div>
          <RealWeddingsTeaser weddings={relatedWeddings} />
        </SectionShell>
      )}

      {/* 7 · Featured testimonial */}
      {testimonial && (
        <SectionShell tone="ivory">
          <TestimonialPullQuote testimonial={testimonial} />
        </SectionShell>
      )}

      {/* 8 · CTA / Enquiry band — eventType prefilled from the occasion kind */}
      <EnquiryBand
        settings={settings}
        source="occasion-cta"
        prefill={{ eventType: occasion.kind }}
      />
    </>
  );
}
