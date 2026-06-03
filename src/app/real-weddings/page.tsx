import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import type { FilterOption } from "@/components/sections/FilterChips";
import type { RealWeddingCardData } from "@/components/sections/RealWeddingCard";
import { RealWeddingsGrid } from "@/components/sections/RealWeddingsGrid";
import { getRealWeddings, getSiteSettings, resolveMedia } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

/* ============================================================================
   PAGE 15 — REAL WEDDINGS INDEX (/real-weddings). Cinematic case-study index,
   filterable by culture. All from CMS.
   ============================================================================ */

const seo = {
  title: "Real Weddings at Chigwell | The Chigwell Marquees",
  description:
    "Real weddings at Chigwell Hall, Essex — Bangladeshi, Turkish and English-garden celebrations across the marquees and 42-acre grounds.",
  keywords: ["real weddings Essex", "marquee wedding stories", "Chigwell Marquees real weddings"],
};

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/real-weddings");
}

export default async function RealWeddingsIndexPage() {
  const [weddings, settings] = await Promise.all([getRealWeddings(), getSiteSettings()]);

  const cards: RealWeddingCardData[] = weddings.map((w) => ({
    id: w.id,
    slug: w.slug,
    coupleNames: w.coupleNames,
    culture: w.culture,
    dateLabel: formatDate(w.date) ?? undefined,
    media: resolveMedia(w.heroMedia),
  }));

  const cultures = Array.from(new Set(weddings.map((w) => w.culture))).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  const filters: FilterOption[] = [
    { key: "all", label: "All" },
    ...cultures.map((c) => ({ key: c, label: capitalise(c) })),
  ];

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Real Weddings", path: "/real-weddings" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      itemListJsonLd(weddings.map((w) => ({ name: w.coupleNames, path: `/real-weddings/${w.slug}` }))),
      breadcrumbJsonLd(breadcrumbs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Hero / lede */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Real weddings</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Celebrations held here
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Real couples, real days — from multi-day cultural celebrations to intimate garden
          ceremonies, each one entirely their own.
        </p>
      </SectionShell>

      {/* 2–3 · Filter + story cards */}
      <SectionShell tone="parchment">
        <RealWeddingsGrid weddings={cards} filters={filters} />
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
