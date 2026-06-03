import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { TourSelector, type TourSpace } from "@/components/sections/TourSelector";
import { getSiteSettings, getVenues, resolveMedia } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/* ============================================================================
   PAGE 17 — VIRTUAL TOUR (/virtual-tour). 360°/Matterport of the marquees &
   grounds. The viewer + embed are code-split and load only on "Launch", so the
   page carries no upfront viewer JS. Each space has a real text description.
   ============================================================================ */

const seo = {
  title: "Virtual Tour — Marquees & Grounds | The Chigwell Marquees",
  description:
    "Take a 360° virtual tour of the Mega Marquee, Mini Marquee and Secret Garden at Chigwell Hall, Essex — explore the spaces before you visit.",
  keywords: ["virtual tour wedding venue Essex", "360 marquee tour", "Chigwell Marquees virtual tour"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/virtual-tour");
}

export default async function VirtualTourPage() {
  const [venues, settings] = await Promise.all([getVenues(), getSiteSettings()]);

  const spaces: TourSpace[] = [];
  for (const venue of venues) {
    if (!venue.virtualTour) continue;
    const poster = resolveMedia(venue.heroMedia);
    if (!poster) continue;
    spaces.push({
      id: venue.id,
      name: venue.name,
      description: venue.intro,
      poster: { url: poster.url, alt: poster.alt, blurDataURL: poster.blurDataURL },
      tour: venue.virtualTour,
    });
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Virtual Tour", path: "/virtual-tour" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      {/* 1 · Hero / lede */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Step inside</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Wander the spaces from anywhere
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Explore the Mega Marquee, Mini Marquee and Secret Garden in 360° before you visit — the
          next best thing to walking the grounds yourself.
        </p>
      </SectionShell>

      {/* 2–3 · Tour selector + lazy viewer */}
      <SectionShell tone="parchment">
        {spaces.length > 0 ? (
          <TourSelector spaces={spaces} />
        ) : (
          <p className="text-center text-ink-soft">
            Our virtual tour is coming soon — in the meantime, do{" "}
            <a href="/contact" className="text-gold-deep underline-offset-4 hover:underline">
              book a show-round
            </a>{" "}
            to see the spaces in person.
          </p>
        )}
      </SectionShell>

      {/* 4 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
