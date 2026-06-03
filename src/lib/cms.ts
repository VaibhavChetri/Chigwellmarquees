/* ============================================================================
   TYPED CMS CLIENT — §7 contract boundary.
   Pages import ONLY from here; they never read seed.ts directly. When Payload
   v3 + Postgres lands, swap these function bodies for Local API / REST calls —
   the signatures (and therefore every page) stay identical.
   ============================================================================ */

import {
  awards as seedAwards,
  faqs as seedFaqs,
  galleryItems as seedGallery,
  historyMilestones as seedHistory,
  homePage as seedHome,
  media as seedMedia,
  occasions as seedOccasions,
  offers as seedOffers,
  realWeddings as seedRealWeddings,
  siteSettings as seedSettings,
  socialPosts as seedSocial,
  testimonials as seedTestimonials,
  venues as seedVenues,
} from "@/content/seed";
import type {
  Award,
  Faq,
  GalleryItem,
  HistoryMilestone,
  HomePage,
  MediaAsset,
  Occasion,
  Offer,
  RealWedding,
  SiteSettings,
  SocialPost,
  Testimonial,
  Venue,
} from "@/types";

/* Simulate async data fetching so swapping in Payload is a no-op for callers. */
const resolve = <T>(value: T): Promise<T> => Promise.resolve(value);

/* ---- Singletons --------------------------------------------------------- */
export const getSiteSettings = (): Promise<SiteSettings> => resolve(seedSettings);
export const getHomePage = (): Promise<HomePage> => resolve(seedHome);

/* ---- Media -------------------------------------------------------------- */
const mediaIndex = new Map(seedMedia.map((m) => [m.id, m]));

/** Resolve a MediaRef (id) to a full MediaAsset. Returns null when missing. */
export const getMedia = (ref?: string | null): Promise<MediaAsset | null> =>
  resolve(ref ? (mediaIndex.get(ref) ?? null) : null);

/** Synchronous resolver for render paths that already hold the ref. */
export const resolveMedia = (ref?: string | null): MediaAsset | null =>
  ref ? (mediaIndex.get(ref) ?? null) : null;

export const getManyMedia = (refs: string[]): Promise<MediaAsset[]> =>
  resolve(refs.map((r) => mediaIndex.get(r)).filter((m): m is MediaAsset => Boolean(m)));

/* ---- Collections -------------------------------------------------------- */
export const getVenues = (): Promise<Venue[]> =>
  resolve(seedVenues.filter((v) => v.status === "published"));

export const getVenue = (slug: string): Promise<Venue | null> =>
  resolve(seedVenues.find((v) => v.slug === slug) ?? null);

export const getOccasions = (): Promise<Occasion[]> =>
  resolve(seedOccasions.filter((o) => o.status === "published"));

export const getOccasion = (slug: string): Promise<Occasion | null> =>
  resolve(seedOccasions.find((o) => o.slug === slug) ?? null);

/** Per-culture occasions for the multicultural hub (excludes the umbrella). */
export const getCulturalOccasions = (): Promise<Occasion[]> =>
  resolve(
    seedOccasions.filter(
      (o) =>
        o.status === "published" &&
        o.kind === "cultural-wedding" &&
        Boolean(o.culture) &&
        o.slug !== "multicultural-weddings",
    ),
  );

/** Occasions served under /event/[slug] — everything except the occasions that
 *  have their own dedicated routes (/weddings, /multicultural-weddings). */
export const getEventOccasions = (): Promise<Occasion[]> =>
  resolve(
    seedOccasions.filter(
      (o) =>
        o.status === "published" &&
        o.slug !== "weddings" &&
        o.slug !== "multicultural-weddings",
    ),
  );

export const getOffers = (): Promise<Offer[]> =>
  resolve(seedOffers.filter((o) => o.status === "published"));

export const getOffer = (slug: string): Promise<Offer | null> =>
  resolve(seedOffers.find((o) => o.slug === slug) ?? null);

export const getFeaturedOffer = (): Promise<Offer | null> =>
  resolve(seedOffers.find((o) => o.featured && o.status === "published") ?? null);

export const getAwards = (): Promise<Award[]> =>
  resolve([...seedAwards].sort((a, b) => a.order - b.order));

export const getSocialPosts = (): Promise<SocialPost[]> =>
  resolve([...seedSocial].sort((a, b) => a.order - b.order));

export const getTestimonials = (): Promise<Testimonial[]> => resolve(seedTestimonials);

export const getGalleryItems = (): Promise<GalleryItem[]> => resolve(seedGallery);

export const getHistoryMilestones = (): Promise<HistoryMilestone[]> =>
  resolve([...seedHistory].sort((a, b) => a.order - b.order));

export const getFaqs = (): Promise<Faq[]> =>
  resolve([...seedFaqs].sort((a, b) => a.order - b.order));

export const getRealWeddings = (): Promise<RealWedding[]> =>
  resolve(seedRealWeddings.filter((r) => r.status === "published"));

export const getRealWedding = (slug: string): Promise<RealWedding | null> =>
  resolve(seedRealWeddings.find((r) => r.slug === slug) ?? null);

export const getRealWeddingsByIds = (ids: string[]): Promise<RealWedding[]> =>
  resolve(
    ids
      .map((id) => seedRealWeddings.find((r) => r.id === id))
      .filter((r): r is RealWedding => Boolean(r)),
  );

export const getRealWeddingsByVenue = (venueId: string): Promise<RealWedding[]> =>
  resolve(seedRealWeddings.filter((r) => r.venue === venueId && r.status === "published"));

/** Other published real weddings (same culture first), for the detail page. */
export const getRelatedRealWeddings = (
  currentId: string,
  limit = 3,
): Promise<RealWedding[]> => {
  const current = seedRealWeddings.find((r) => r.id === currentId);
  const others = seedRealWeddings.filter((r) => r.id !== currentId && r.status === "published");
  const sorted = [...others].sort((a, b) => {
    const aMatch = a.culture === current?.culture ? 0 : 1;
    const bMatch = b.culture === current?.culture ? 0 : 1;
    return aMatch - bMatch;
  });
  return resolve(sorted.slice(0, limit));
};

export const getTestimonial = (id?: string | null): Promise<Testimonial | null> =>
  resolve(id ? (seedTestimonials.find((t) => t.id === id) ?? null) : null);

/* ---- Helpers for resolving id lists from the HomePage singleton ---------- */
export const getOccasionsByIds = (ids: string[]): Promise<Occasion[]> =>
  resolve(ids.map((id) => seedOccasions.find((o) => o.id === id)).filter((o): o is Occasion => Boolean(o)));

export const getVenuesByIds = (ids: string[]): Promise<Venue[]> =>
  resolve(ids.map((id) => seedVenues.find((v) => v.id === id)).filter((v): v is Venue => Boolean(v)));

export const getTestimonialsByIds = (ids: string[]): Promise<Testimonial[]> =>
  resolve(ids.map((id) => seedTestimonials.find((t) => t.id === id)).filter((t): t is Testimonial => Boolean(t)));
