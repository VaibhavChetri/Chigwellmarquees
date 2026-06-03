import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { OfferDetail } from "@/components/sections/OfferDetail";
import { getOffer, getOffers, getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, offerJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 13 — OFFER DETAIL (/offers/[slug]). Offer JSON-LD (validThrough) +
   BreadcrumbList; CTA → enquiry source:'offer'. Statically generated per slug.
   ============================================================================ */

export async function generateStaticParams() {
  const offers = await getOffers();
  return offers.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOffer(slug);
  if (!offer) return {};
  return buildMetadata(offer.seo, `/offers/${offer.slug}`);
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [offer, settings] = await Promise.all([getOffer(slug), getSiteSettings()]);
  if (!offer || offer.status !== "published") notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Offers", path: "/offers" },
    { name: offer.title, path: `/offers/${offer.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [offerJsonLd(offer, settings.brandName), breadcrumbJsonLd(breadcrumbs)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OfferDetail offer={offer} breadcrumbs={breadcrumbs} />
      <EnquiryBand settings={settings} source="offer" prefill={{ eventType: "wedding" }} />
    </>
  );
}
