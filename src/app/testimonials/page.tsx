import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import type { FilterOption } from "@/components/sections/FilterChips";
import { TestimonialWall } from "@/components/sections/TestimonialWall";
import { getSiteSettings, getTestimonials } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, reviewsJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 16 — TESTIMONIALS (/testimonials). Editorial review wall + trust
   signals. Review/AggregateRating JSON-LD is emitted only when real ratings
   exist (we never fabricate review markup).
   ============================================================================ */

const seo = {
  title: "Testimonials — Real Words from Real Celebrations | The Chigwell Marquees",
  description:
    "What couples and clients say about their weddings, cultural celebrations and events at Chigwell Hall, Essex.",
  keywords: ["wedding venue reviews Essex", "Chigwell Marquees testimonials"],
};

const KIND_LABEL: Record<string, string> = {
  wedding: "Weddings",
  "cultural-wedding": "Multicultural",
  corporate: "Corporate",
  party: "Parties",
  ceremony: "Ceremonies",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/testimonials");
}

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([getTestimonials(), getSiteSettings()]);

  // Filter chips derived from the occasion kinds actually present.
  const kinds = Array.from(
    new Set(testimonials.map((t) => t.occasionKind).filter((k): k is NonNullable<typeof k> => Boolean(k))),
  );
  const filters: FilterOption[] = [
    { key: "all", label: "All" },
    ...kinds.map((k) => ({ key: k, label: KIND_LABEL[k] ?? k })),
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  const reviews = reviewsJsonLd(testimonials, settings);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbJsonLd(breadcrumbs), ...(reviews ? [reviews] : [])],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Hero / lede */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">In their words</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Loved by couples and clients alike
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          From multi-day cultural weddings to corporate evenings — the words that matter most are
          the ones our guests share afterwards.
        </p>
      </SectionShell>

      {/* 2 · Pull-quote wall (grained parchment) */}
      <SectionShell tone="parchment">
        <TestimonialWall testimonials={testimonials} filters={filters} />
      </SectionShell>

      {/* 3 · Trust summary */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center gap-5 text-center">
        <FlourishDivider />
        <p className="max-w-xl font-display text-step-2 italic text-ink">
          Trusted by couples and families from every culture, across {testimonials.length}
          {" "}celebrations and counting.
        </p>
        <p className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-taupe">
          The Chigwell Marquees · Chigwell Hall, Essex
        </p>
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
