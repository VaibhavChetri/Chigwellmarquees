import type { Metadata } from "next";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { OfferCard } from "@/components/sections/OfferCard";
import { getOffers, getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 13 — OFFERS HUB (/offers). The commercial conversion layer; surfaces
   every live offer by kind. All from CMS.
   ============================================================================ */

const seo = {
  title: "Wedding Offers Essex — Midweek & Last-Minute Deals | The Chigwell Marquees",
  description:
    "Special offers at Chigwell Hall — midweek wedding savings, last-minute 2026 dates, winter weddings and more across a 42-acre Essex estate.",
  keywords: [
    "midweek wedding offers Essex",
    "last-minute wedding offers Essex",
    "wedding offers Essex",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/offers");
}

export default async function OffersHubPage() {
  const [offers, settings] = await Promise.all([getOffers(), getSiteSettings()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Offers", path: "/offers" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      itemListJsonLd(offers.map((o) => ({ name: o.title, path: `/offers/${o.slug}` }))),
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
        <ScriptEyebrow align="center">Special offers</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          A little more, for a little less
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Midweek savings, last-minute dates and seasonal offers — the same exclusive 42-acre
          estate, at a gentler price.
        </p>
      </SectionShell>

      {/* 2 · Offer cards */}
      <SectionShell tone="parchment">
        {offers.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink-soft">
            No offers are running just now — please{" "}
            <a href="/enquire" className="text-gold-deep underline-offset-4 hover:underline">
              enquire
            </a>{" "}
            and we&rsquo;ll share our best available pricing.
          </p>
        )}
      </SectionShell>

      {/* 3 · Enquiry band */}
      <EnquiryBand settings={settings} source="offer" prefill={{ eventType: "wedding" }} />
    </>
  );
}
