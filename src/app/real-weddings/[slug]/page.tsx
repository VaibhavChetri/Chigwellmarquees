import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EnquiryBand } from "@/components/sections/EnquiryBand";
import type { RealWeddingCardData } from "@/components/sections/RealWeddingCard";
import { RealWeddingStory } from "@/components/sections/RealWeddingStory";
import {
  getRealWedding,
  getRealWeddings,
  getRelatedRealWeddings,
  getSiteSettings,
  getTestimonial,
  getVenue,
  resolveMedia,
} from "@/lib/cms";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

/* ============================================================================
   PAGE 15 — REAL WEDDING DETAIL (/real-weddings/[slug]). Cinematic case study;
   Article + BreadcrumbList JSON-LD. Statically generated per slug.
   ============================================================================ */

export async function generateStaticParams() {
  const weddings = await getRealWeddings();
  return weddings.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wedding = await getRealWedding(slug);
  if (!wedding) return {};
  return buildMetadata(wedding.seo, `/real-weddings/${wedding.slug}`);
}

export default async function RealWeddingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [wedding, settings] = await Promise.all([getRealWedding(slug), getSiteSettings()]);
  if (!wedding || wedding.status !== "published") notFound();

  const [venue, testimonial, relatedRecords] = await Promise.all([
    getVenue(wedding.venue),
    getTestimonial(wedding.testimonial),
    getRelatedRealWeddings(wedding.id, 3),
  ]);

  const related: RealWeddingCardData[] = relatedRecords.map((w) => ({
    id: w.id,
    slug: w.slug,
    coupleNames: w.coupleNames,
    culture: w.culture,
    dateLabel: formatDate(w.date) ?? undefined,
    media: resolveMedia(w.heroMedia),
  }));

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Real Weddings", path: "/real-weddings" },
    { name: wedding.coupleNames, path: `/real-weddings/${wedding.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      articleJsonLd({
        headline: wedding.seo.title,
        description: wedding.seo.description,
        path: `/real-weddings/${wedding.slug}`,
        image: resolveMedia(wedding.heroMedia)?.url,
        datePublished: wedding.date,
        brandName: settings.brandName,
      }),
      breadcrumbJsonLd(breadcrumbs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RealWeddingStory
        wedding={wedding}
        venueName={venue?.name ?? null}
        testimonial={testimonial}
        related={related}
        breadcrumbs={breadcrumbs}
      />
      <EnquiryBand settings={settings} />
    </>
  );
}
