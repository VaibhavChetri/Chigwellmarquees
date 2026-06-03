import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { Breadcrumbs } from "@/components/primitives/Breadcrumbs";
import { SectionShell } from "@/components/primitives/SectionShell";
import { Tag } from "@/components/primitives/Tag";
import { CultureCardGrid } from "@/components/sections/CultureCardGrid";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { OccasionHero } from "@/components/sections/OccasionHero";
import { SocialWall } from "@/components/sections/SocialWall";
import { TestimonialPullQuote } from "@/components/sections/TestimonialPullQuote";
import {
  getCulturalOccasions,
  getOccasion,
  getSiteSettings,
  getSocialPosts,
  getTestimonial,
  resolveMedia,
} from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { paragraphs } from "@/lib/utils";

/* ============================================================================
   PAGE 06 — MULTICULTURAL WEDDINGS HUB (/multicultural-weddings).
   Inclusive, specific umbrella linking every culture page. Content-driven from
   the umbrella Occasion (occ-multicultural) + the per-culture occasions.
   ============================================================================ */

const MULTICULTURAL_CULTURES = new Set(["asian", "bangladeshi", "turkish", "hindu"]);

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getOccasion("multicultural-weddings");
  if (!hub) return {};
  return buildMetadata(hub.seo, "/multicultural-weddings");
}

export default async function MulticulturalHubPage() {
  const [hub, cultures, settings, social] = await Promise.all([
    getOccasion("multicultural-weddings"),
    getCulturalOccasions(),
    getSiteSettings(),
    getSocialPosts(),
  ]);
  if (!hub) notFound();

  const heroMedia = resolveMedia(hub.heroMedia);
  const testimonial = await getTestimonial(hub.featuredTestimonial);
  const multiculturalPosts = social.filter((p) => p.culture && MULTICULTURAL_CULTURES.has(p.culture));
  const supportGroups = hub.sections.filter((s) => s.layout === "feature-list");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Multicultural Weddings", path: "/multicultural-weddings" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      itemListJsonLd(cultures.map((c) => ({ name: c.title, path: `/event/${c.slug}` }))),
      breadcrumbJsonLd(breadcrumbs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Hero */}
      <OccasionHero occasion={hub} media={heroMedia} />
      <Breadcrumbs items={breadcrumbs} />

      {/* 2 · Intro + reassurance chips */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <ScriptEyebrow align="center">Genuine fluency, not a footnote</ScriptEyebrow>
        <div className="mt-6 max-w-3xl space-y-5">
          {paragraphs(hub.intro).map((p, i) => (
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
        {hub.facilities && hub.facilities.length > 0 && (
          <ul className="mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
            {hub.facilities.map((f) => (
              <li key={f}>
                <Tag tone="gold">{f}</Tag>
              </li>
            ))}
          </ul>
        )}
        <FlourishDivider />
      </SectionShell>

      {/* 3 · Culture card grid */}
      <SectionShell tone="parchment" innerClassName="flex flex-col gap-10">
        <div className="flex flex-col items-center text-center">
          <ScriptEyebrow align="center">Your celebration</ScriptEyebrow>
          <h2 className="mt-3 font-display text-step-3 text-ink">Every tradition, understood</h2>
        </div>
        <CultureCardGrid occasions={cultures} />
      </SectionShell>

      {/* 4 · How we support your traditions */}
      {supportGroups.length > 0 && (
        <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center">
            <ScriptEyebrow align="center">The detail</ScriptEyebrow>
            <h2 className="mt-3 font-display text-step-3 text-ink">
              How we support your traditions
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {supportGroups.map((group) => (
              <div
                key={group.heading}
                className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-champagne bg-parchment p-7"
              >
                <h3 className="font-display text-step-1 text-ink">{group.heading}</h3>
                <ul className="flex flex-col gap-2">
                  {(group.list ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {/* 5 · Multicultural social wall (lazy images) */}
      {multiculturalPosts.length > 0 && (
        <SectionShell tone="parchment" innerClassName="flex flex-col gap-10">
          <div className="text-center">
            <ScriptEyebrow align="center">From our celebrations</ScriptEyebrow>
            <h2 className="mt-3 font-display text-step-3 text-ink">Real cultural weddings</h2>
          </div>
          <SocialWall posts={multiculturalPosts} instagramUrl={settings.social.instagram} />
        </SectionShell>
      )}

      {/* 6 · Testimonial */}
      {testimonial && (
        <SectionShell tone="ivory">
          <TestimonialPullQuote testimonial={testimonial} />
        </SectionShell>
      )}

      {/* 7 · Enquiry band — cultural-wedding prefilled */}
      <EnquiryBand settings={settings} source="occasion-cta" prefill={{ eventType: "cultural-wedding" }} />
    </>
  );
}
