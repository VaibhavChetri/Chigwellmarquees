import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OccasionTemplate } from "@/components/sections/OccasionTemplate";
import {
  getOccasion,
  getRealWeddingsByIds,
  getSiteSettings,
  getTestimonial,
} from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

/* ============================================================================
   PAGE 05 — OCCASION TEMPLATE + WEDDINGS (/weddings).
   Renders the "weddings" Occasion through the reusable OccasionTemplate. The
   same template powers every cultural + event page (06–12) from content alone.
   ============================================================================ */

export async function generateMetadata(): Promise<Metadata> {
  const occasion = await getOccasion("weddings");
  if (!occasion) return {};
  return buildMetadata(occasion.seo, "/weddings");
}

export default async function WeddingsPage() {
  const [occasion, settings] = await Promise.all([getOccasion("weddings"), getSiteSettings()]);
  if (!occasion || occasion.status !== "published") notFound();

  const [relatedWeddings, testimonial] = await Promise.all([
    getRealWeddingsByIds(occasion.relatedRealWeddings ?? []),
    getTestimonial(occasion.featuredTestimonial),
  ]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: occasion.title, path: "/weddings" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        name: `${occasion.title} — ${settings.brandName}`,
        description: occasion.seo.description,
        url: absoluteUrl("/weddings"),
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.contact.address,
          addressRegion: "Essex",
          addressCountry: "GB",
        },
        telephone: settings.contact.phone,
      },
      breadcrumbJsonLd(breadcrumbs),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OccasionTemplate
        occasion={occasion}
        settings={settings}
        relatedWeddings={relatedWeddings}
        testimonial={testimonial}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
