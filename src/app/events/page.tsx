import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import type { FilterOption } from "@/components/sections/FilterChips";
import { OccasionGrid, type OccasionCard } from "@/components/sections/OccasionGrid";
import { getOccasions, getSiteSettings, resolveMedia } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import type { Occasion } from "@/types";

/* ============================================================================
   PAGE 12 — EVENTS INDEX (/events). Filterable grid of every occasion the
   venue hosts. All from CMS; filtering is client-side with smooth, CLS-free
   View Transitions (OccasionGrid).
   ============================================================================ */

const seo = {
  title: "Events & Occasions | The Chigwell Marquees",
  description:
    "Weddings, multicultural celebrations, corporate events, parties, birthdays and civil ceremonies — everything we host in 42 acres of Essex countryside.",
  keywords: ["events venue Essex", "wedding & events venue Essex", "celebration venue near London"],
};

/* kind → filter group + human label shown on the card */
const KIND: Record<Occasion["kind"], { filterKey: string; label: string }> = {
  wedding: { filterKey: "weddings", label: "Wedding" },
  "cultural-wedding": { filterKey: "multicultural", label: "Multicultural" },
  corporate: { filterKey: "corporate", label: "Corporate" },
  party: { filterKey: "parties", label: "Party" },
  ceremony: { filterKey: "ceremonies", label: "Ceremony" },
};

const FILTERS: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "weddings", label: "Weddings" },
  { key: "multicultural", label: "Multicultural" },
  { key: "corporate", label: "Corporate" },
  { key: "parties", label: "Parties" },
  { key: "ceremonies", label: "Ceremonies" },
];

/* Occasions have three URL shapes (§6 IA). */
function occasionHref(o: Occasion): string {
  if (o.slug === "weddings") return "/weddings";
  if (o.slug === "multicultural-weddings") return "/multicultural-weddings";
  return `/event/${o.slug}`;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/events");
}

export default async function EventsIndexPage() {
  const [occasions, settings] = await Promise.all([getOccasions(), getSiteSettings()]);

  const cards: OccasionCard[] = occasions.map((o) => ({
    id: o.id,
    title: o.title,
    line: o.heroSubheading,
    kindLabel: KIND[o.kind].label,
    filterKey: KIND[o.kind].filterKey,
    href: occasionHref(o),
    media: resolveMedia(o.heroMedia),
  }));

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      itemListJsonLd(occasions.map((o) => ({ name: o.title, path: occasionHref(o) }))),
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
        <ScriptEyebrow align="center">Events &amp; occasions</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Every occasion, beautifully held
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Weddings and cultural celebrations, corporate events, parties and ceremonies — all in
          42 acres of Essex countryside, 40 minutes from London.
        </p>
      </SectionShell>

      {/* 2–3 · Filters + grid */}
      <SectionShell tone="parchment">
        <OccasionGrid cards={cards} filters={FILTERS} />
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
