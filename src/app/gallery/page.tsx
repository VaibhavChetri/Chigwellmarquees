import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import type { FilterOption } from "@/components/sections/FilterChips";
import { MasonryGallery, type GalleryCard } from "@/components/sections/MasonryGallery";
import { getGalleryItems, getSiteSettings, resolveMedia } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, imageGalleryJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 14 — GALLERY (/gallery). High-res, filterable masonry + lightbox. All
   imagery from CMS GalleryItem records; categories drive the filter chips.
   ============================================================================ */

const seo = {
  title: "Wedding Venue Gallery Essex | The Chigwell Marquees",
  description:
    "A gallery of weddings, Asian celebrations, corporate events and parties across the marquees and 42-acre grounds at Chigwell Hall, Essex.",
  keywords: ["wedding venue gallery Essex", "marquee wedding photos", "Chigwell Marquees gallery"],
};

const FILTERS: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "weddings", label: "Weddings" },
  { key: "asian", label: "Asian" },
  { key: "corporate", label: "Corporate" },
  { key: "parties", label: "Parties" },
  { key: "grounds", label: "Grounds" },
  { key: "marquees", label: "Marquees" },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/gallery");
}

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([getGalleryItems(), getSiteSettings()]);

  const cards: GalleryCard[] = [];
  for (const item of items) {
    const media = resolveMedia(item.media);
    if (media) cards.push({ id: item.id, media, categories: item.category });
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      imageGalleryJsonLd(
        "The Chigwell Marquees Gallery",
        cards.map((c) => ({ url: c.media.url, alt: c.media.alt })),
      ),
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
        <ScriptEyebrow align="center">The gallery</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Let the photography do the talking
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Weddings and cultural celebrations, corporate events and parties — across the marquees
          and 42 acres of Essex countryside.
        </p>
      </SectionShell>

      {/* 2–3 · Filters + masonry + lightbox */}
      <SectionShell tone="parchment">
        <MasonryGallery cards={cards} filters={FILTERS} />
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
