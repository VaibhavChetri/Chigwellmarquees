/* ============================================================================
   SEO helpers — §5. Per-route generateMetadata builds on buildMetadata();
   JSON-LD builders emit the §5 schema types (LocalBusiness / EventVenue …).
   ============================================================================ */

import type { Metadata } from "next";

import { resolveMedia } from "@/lib/cms";
import { absoluteUrl } from "@/lib/utils";
import type { Faq, Offer, Seo, SiteSettings, Testimonial, Venue } from "@/types";

export function buildMetadata(seo: Seo, path = "/"): Metadata {
  const ogImage = seo.ogImage ? resolveMedia(seo.ogImage)?.url : undefined;
  return {
    // Absolute: each seo.title already carries its own branding, so we opt out
    // of the root layout's `%s | brand` template to avoid double-branding and
    // to honour the exact per-page titles in the spec.
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: absoluteUrl(path) },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(path),
      type: "website",
      locale: "en_GB",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/** Sitewide LocalBusiness / EventVenue JSON-LD (§5, §8). */
export function localBusinessJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventVenue"],
    name: settings.brandName,
    description: settings.defaultSeo.description,
    url: absoluteUrl("/"),
    telephone: settings.contact.phone,
    email: settings.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.contact.address,
      addressRegion: "Essex",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.contact.mapLat,
      longitude: settings.contact.mapLng,
    },
    sameAs: Object.values(settings.social).filter(Boolean),
  };
}

/** EventVenue JSON-LD (§5) for a venue detail page, with capacity. */
export function venueJsonLd(venue: Venue, settings: SiteSettings) {
  const hero = resolveMedia(venue.heroMedia)?.url;
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: `${venue.name} — ${settings.brandName}`,
    description: venue.intro,
    url: absoluteUrl(`/venue/${venue.slug}`),
    image: hero ? [hero] : undefined,
    maximumAttendeeCapacity: venue.capacity.max,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.contact.address,
      addressRegion: "Essex",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.contact.mapLat,
      longitude: settings.contact.mapLng,
    },
    telephone: settings.contact.phone,
  };
}

/** ImageGallery JSON-LD (§5) — for the gallery page. */
export function imageGalleryJsonLd(name: string, images: { url: string; alt: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    url: absoluteUrl("/gallery"),
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      caption: img.alt,
    })),
  };
}

/** ItemList JSON-LD (§5) — for index pages listing entities (e.g. /venues). */
export function itemListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Review + AggregateRating JSON-LD (§5) for the testimonials page.
 *  Returns null unless at least one testimonial carries a real rating — we never
 *  fabricate review markup (it would be a structured-data policy risk). */
export function reviewsJsonLd(testimonials: Testimonial[], settings: SiteSettings) {
  const rated = testimonials.filter(
    (t): t is Testimonial & { rating: number } => typeof t.rating === "number",
  );
  if (rated.length === 0) return null;

  const ratingValue =
    Math.round((rated.reduce((sum, t) => sum + t.rating, 0) / rated.length) * 10) / 10;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.brandName,
    url: absoluteUrl("/"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: rated.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: rated.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.author },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5, worstRating: 1 },
    })),
  };
}

/** FAQPage JSON-LD (§5) — for /faqs. */
export function faqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(f.answer) ? f.answer.join(" ") : String(f.answer),
      },
    })),
  };
}

/** AboutPage JSON-LD (§5) — for /about and /history. */
export function aboutPageJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name,
    description,
    url: absoluteUrl(path),
  };
}

/** Article JSON-LD (§5) — for real-wedding case studies. */
export function articleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  brandName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: opts.image ? [opts.image] : undefined,
    datePublished: opts.datePublished,
    publisher: { "@type": "Organization", name: opts.brandName },
  };
}

/** BreadcrumbList JSON-LD (§5). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Offer JSON-LD (§5) — Home (featured) + Offer detail pages. */
export function offerJsonLd(offer: Offer, brandName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.title,
    description: offer.summary,
    category: offer.kind,
    url: absoluteUrl(`/offers/${offer.slug}`),
    seller: { "@type": "Organization", name: brandName },
    availability: "https://schema.org/LimitedAvailability",
    availabilityStarts: offer.validFrom,
    availabilityEnds: offer.validUntil,
    validFrom: offer.validFrom,
    validThrough: offer.validUntil,
  };
}
