import type { MetadataRoute } from "next";

import { getOffers, getVenues } from "@/lib/cms";
import { absoluteUrl } from "@/lib/utils";

/* Native sitemap (§5). Static routes + CMS-driven venue/offer slugs. Expands
   automatically as content pages (02+) come online. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [venues, offers] = await Promise.all([getVenues(), getOffers()]);

  const staticRoutes = [
    "/",
    "/weddings",
    "/multicultural-weddings",
    "/venues",
    "/events",
    "/offers",
    "/gallery",
    "/real-weddings",
    "/testimonials",
    "/virtual-tour",
    "/about",
    "/history",
    "/faqs",
    "/contact",
    "/enquire",
    "/floor-plans",
  ].map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 }));

  const venueRoutes = venues.map((v) => ({
    url: absoluteUrl(`/venue/${v.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const offerRoutes = offers.map((o) => ({
    url: absoluteUrl(`/offers/${o.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...venueRoutes, ...offerRoutes];
}
