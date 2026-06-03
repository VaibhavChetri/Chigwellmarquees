import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OccasionTemplate } from "@/components/sections/OccasionTemplate";
import {
  getEventOccasions,
  getOccasion,
  getRealWeddingsByIds,
  getSiteSettings,
  getTestimonial,
} from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import type { Occasion } from "@/types";

/* ============================================================================
   PAGES 07–12 ENGINE — /event/[slug]. One route renders every cultural +
   event Occasion through the reusable OccasionTemplate (Page 05). New culture
   or event page = a CMS record, not a deploy.
   ============================================================================ */

export async function generateStaticParams() {
  const occasions = await getEventOccasions();
  return occasions.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const occasion = await getOccasion(slug);
  if (!occasion) return {};
  return buildMetadata(occasion.seo, `/event/${occasion.slug}`);
}

/* Cultural pages sit under the Multicultural hub; other events under Events. */
function buildBreadcrumbs(occasion: Occasion) {
  const trail = [{ name: "Home", path: "/" }];
  if (occasion.kind === "cultural-wedding") {
    trail.push({ name: "Multicultural Weddings", path: "/multicultural-weddings" });
  } else {
    trail.push({ name: "Events", path: "/events" });
  }
  trail.push({ name: occasion.title, path: `/event/${occasion.slug}` });
  return trail;
}

export default async function EventOccasionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [occasion, settings] = await Promise.all([getOccasion(slug), getSiteSettings()]);
  if (!occasion || occasion.status !== "published") notFound();

  const [relatedWeddings, testimonial] = await Promise.all([
    getRealWeddingsByIds(occasion.relatedRealWeddings ?? []),
    getTestimonial(occasion.featuredTestimonial),
  ]);

  const breadcrumbs = buildBreadcrumbs(occasion);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        name: `${occasion.title} — ${settings.brandName}`,
        description: occasion.seo.description,
        url: absoluteUrl(`/event/${occasion.slug}`),
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
