import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EditorialPillar } from "@/components/sections/EditorialPillar";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { VenueCompare } from "@/components/sections/VenueCompare";
import { getSiteSettings, getVenues } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 04 — VENUES INDEX (/venues). Editorial overview routing to the three
   spaces; frames the choice (scale vs intimacy vs garden). All from CMS.
   ============================================================================ */

const seo = {
  title: "Our Venues — Marquee & Garden Wedding Venues Essex | The Chigwell Marquees",
  description:
    "Three ways to celebrate at Chigwell Hall — the Mega Marquee (up to 1,000), the intimate Mini Marquee (up to 200) and the Secret Garden. Find your space.",
  keywords: ["wedding venues Essex", "marquee wedding venue", "garden wedding venue Essex"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/venues");
}

export default async function VenuesIndexPage() {
  const [venues, settings] = await Promise.all([getVenues(), getSiteSettings()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      itemListJsonLd(venues.map((v) => ({ name: v.name, path: `/venue/${v.slug}` }))),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Venues", path: "/venues" },
      ]),
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
        <ScriptEyebrow align="center">Our venues</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Three ways to celebrate
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Grand scale, intimate warmth, or open-air romance — within one 42-acre Essex estate.
          Here&rsquo;s how to find the space that fits your day.
        </p>
      </SectionShell>

      {/* 2 · Alternating editorial venue blocks (Botanical Bloom reveals) */}
      <SectionShell tone="parchment" innerClassName="flex flex-col gap-24 md:gap-32">
        {venues.map((venue, i) => (
          <EditorialPillar key={venue.id} venue={venue} index={i} />
        ))}
      </SectionShell>

      {/* 3 · Comparison strip (true accessible table) */}
      <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
        <div className="flex flex-col items-center text-center">
          <ScriptEyebrow align="center">Compare at a glance</ScriptEyebrow>
          <h2 className="mt-3 font-display text-step-3 text-ink">Which space is yours?</h2>
        </div>
        <VenueCompare venues={venues} />
        <FlourishDivider />
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
