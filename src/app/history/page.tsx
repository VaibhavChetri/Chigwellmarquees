import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { HeritageTimeline } from "@/components/sections/HeritageTimeline";
import { getHistoryMilestones, getSiteSettings } from "@/lib/cms";
import { aboutPageJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/* ============================================================================
   PAGE 19 — HERITAGE (/history). The heritage of Chigwell Hall as a timeline.
   ============================================================================ */

const seo = {
  title: "Heritage of Chigwell Hall — Wedding Venue Essex | The Chigwell Marquees",
  description:
    "The heritage of Chigwell Hall — a Grade II listed Essex manor in 42 acres of countryside, now a marquee wedding and events venue for 30 to 1,000 guests.",
  keywords: ["Chigwell Hall history", "wedding venue Essex history", "Grade II listed wedding venue Essex"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/history");
}

export default async function HistoryPage() {
  const [milestones, settings] = await Promise.all([getHistoryMilestones(), getSiteSettings()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Heritage", path: "/history" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [aboutPageJsonLd(seo.title, seo.description, "/history"), breadcrumbJsonLd(breadcrumbs)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Heritage</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          The heritage of Chigwell Hall
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          A Grade II listed manor wrapped in 42 acres of Essex countryside — and the home of
          celebrations for 30 to 1,000 guests.
        </p>
      </SectionShell>

      <SectionShell tone="parchment">
        <HeritageTimeline milestones={milestones} />
      </SectionShell>

      <EnquiryBand settings={settings} />
    </>
  );
}
