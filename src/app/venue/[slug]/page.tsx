import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VenueTemplate } from "@/components/sections/VenueTemplate";
import {
  getRealWeddingsByVenue,
  getSiteSettings,
  getTestimonial,
  getVenue,
  getVenues,
} from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, venueJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 02 — VENUE TEMPLATE + MEGA MARQUEE  (/venue/[slug])
   One template renders ANY Venue. Statically generated per slug.
   ============================================================================ */

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenue(slug);
  if (!venue) return {};
  return buildMetadata(venue.seo, `/venue/${venue.slug}`);
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [venue, settings] = await Promise.all([getVenue(slug), getSiteSettings()]);
  if (!venue || venue.status !== "published") notFound();

  const [relatedWeddings, testimonial] = await Promise.all([
    getRealWeddingsByVenue(venue.id),
    getTestimonial(venue.featuredTestimonial),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      venueJsonLd(venue, settings),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Venues", path: "/venues" },
        { name: venue.name, path: `/venue/${venue.slug}` },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VenueTemplate
        venue={venue}
        settings={settings}
        relatedWeddings={relatedWeddings}
        testimonial={testimonial}
      />
    </>
  );
}
