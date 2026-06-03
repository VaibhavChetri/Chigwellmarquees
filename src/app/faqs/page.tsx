import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getFaqs, getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, faqPageJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 19 — FAQs (/faqs). Accordion grouped by category. FAQPage JSON-LD.
   Answers are verbatim from the official site.
   ============================================================================ */

const seo = {
  title: "FAQs — Wedding Venue Essex | The Chigwell Marquees",
  description:
    "Frequently asked questions about The Chigwell Marquees — capacity, dry hire, catering, parking, timings, civil ceremonies and getting here.",
  keywords: ["wedding venue Essex FAQs", "Chigwell Marquees FAQ", "marquee wedding venue questions"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/faqs");
}

export default async function FaqsPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "FAQs", path: "/faqs" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [faqPageJsonLd(faqs), breadcrumbJsonLd(breadcrumbs)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Good to know</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Frequently asked questions
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          The practical answers — and if there&rsquo;s anything else, we&rsquo;re only a call away.
        </p>
      </SectionShell>

      <SectionShell tone="parchment">
        <FaqAccordion faqs={faqs} />
      </SectionShell>

      <EnquiryBand settings={settings} />
    </>
  );
}
