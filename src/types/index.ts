/* ============================================================================
   DATA ARCHITECTURE — §7 of the Master Prompt v2.0
   These typed models are the shared contract. UI consumes these interfaces;
   the backend (seed cms now, Payload v3 later) fills them. No page hard-codes
   copy or media — everything flows through these types.
   ============================================================================ */

export type ID = string;
export type ISODate = string;
export type Slug = string;
export type Status = "draft" | "published";

/* ---- §7.1 Core types ----------------------------------------------------- */

export interface Seo {
  title: string;
  description: string;
  ogImage?: MediaRef;
  keywords?: string[];
  noindex?: boolean;
}

export interface MediaAsset {
  id: ID;
  type: "image" | "video" | "file";
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  posterUrl?: string;
  credit?: string;
  tags?: string[];
}

/** A reference to a MediaAsset by id (never a raw URL in content models). */
export type MediaRef = ID;

export interface Cta {
  label: string;
  href: string;
  style?: "primary" | "ghost";
}

/** Payload Lexical / Sanity Portable Text at runtime. Rendered via lib helpers.
 *  In the seed layer we use a plain string or string[] of paragraphs. */
export type RichText = string | string[];

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/* ---- §7.2 SiteSettings (singleton) --------------------------------------- */

export interface SiteSettings {
  id: ID;
  brandName: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    mapLat: number;
    mapLng: number;
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    pinterest?: string;
  };
  primaryNav: NavItem[];
  footerNav: NavItem[];
  defaultSeo: Seo;
  enquiryRecipients: string[];
  announcement?: {
    enabled: boolean;
    message: string;
    cta: Cta;
    featuredOffer?: ID;
  };
  hostSignature?: {
    name: string;
    role: string;
    signatureMedia?: MediaRef;
  };
  brochure?: {
    file: MediaRef;
    gated: boolean;
  };
  awards?: ID[];
}

/* ---- §7.3 Venue ---------------------------------------------------------- */

export interface Venue {
  id: ID;
  slug: Slug;
  status: Status;
  name: string;
  tagline: string;
  /** ▲ Page 04 — short "best for" line used in the venues comparison table. */
  bestFor?: string;
  capacity: { min: number; max: number };
  intro: string;
  body: RichText;
  heroMedia: MediaRef;
  gallery: MediaRef[];
  specs: { label: string; value: string }[];
  features: string[];
  floorPlan?: MediaRef;
  virtualTour?: { type: "360" | "matterport"; url: string };
  /** ▲ Page 02 — venue's featured testimonial for the template. */
  featuredTestimonial?: ID;
  seo: Seo;
  createdAt: ISODate;
  updatedAt: ISODate;
}

/* ---- §7.4 Occasion ------------------------------------------------------- */

export type OccasionKind =
  | "wedding"
  | "cultural-wedding"
  | "corporate"
  | "party"
  | "ceremony";

export type Culture = "asian" | "bangladeshi" | "turkish" | "hindu";

export interface OccasionSection {
  heading: string;
  /** Optional: prose layouts (text/split) use it; gallery/feature-list don't. */
  body?: RichText;
  media?: MediaRef[];
  list?: string[];
  layout: "text" | "split" | "gallery" | "feature-list";
}

export interface Occasion {
  id: ID;
  slug: Slug;
  status: Status;
  kind: OccasionKind;
  culture?: Culture;
  title: string;
  heroHeadline: string;
  heroSubheading: string;
  heroMedia: MediaRef;
  intro: RichText;
  sections: OccasionSection[];
  facilities?: string[];
  whyChooseUs?: string[];
  featuredTestimonial?: ID;
  gallery: MediaRef[];
  relatedRealWeddings?: ID[];
  cta: Cta;
  seo: Seo;
  createdAt: ISODate;
  updatedAt: ISODate;
}

/* ---- §7.5 Content models ------------------------------------------------- */

export interface RealWedding {
  id: ID;
  slug: Slug;
  status: Status;
  coupleNames: string;
  date: ISODate;
  culture?: "bangladeshi" | "turkish" | "asian" | "hindu" | "western" | "other";
  venue: ID;
  guestCount?: number;
  story: RichText;
  heroMedia: MediaRef;
  gallery: MediaRef[];
  suppliers?: { role: string; name: string; url?: string }[];
  testimonial?: ID;
  seo: Seo;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Testimonial {
  id: ID;
  quote: string;
  author: string;
  context?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source?: "google" | "instagram" | "direct";
  media?: MediaRef;
  occasionKind?: OccasionKind;
}

export interface Faq {
  id: ID;
  question: string;
  answer: RichText;
  category: string;
  order: number;
}

export interface GalleryItem {
  id: ID;
  media: MediaRef;
  category: ("weddings" | "asian" | "corporate" | "parties" | "grounds" | "marquees")[];
  realWedding?: ID;
}

export interface Offer {
  id: ID;
  slug: Slug;
  status: Status;
  title: string;
  kind: "special" | "midweek" | "late-availability" | "seasonal";
  summary: string;
  details: RichText;
  heroMedia: MediaRef;
  terms?: RichText;
  badgeLabel?: string;
  validFrom?: ISODate;
  validUntil?: ISODate;
  featured: boolean;
  cta: Cta;
  seo: Seo;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface SocialPost {
  id: ID;
  media: MediaRef;
  permalink: string;
  caption?: string;
  culture?: RealWedding["culture"];
  featured: boolean;
  order: number;
}

export interface Award {
  id: ID;
  title: string;
  awardingBody: string;
  year?: number;
  logo: MediaRef;
  url?: string;
  order: number;
}

export interface HistoryMilestone {
  id: ID;
  year: string;
  title: string;
  body: RichText;
  media?: MediaRef;
  order: number;
}

export interface HomePage {
  id: ID;
  hero: {
    media: MediaRef;
    eyebrow: string;
    headline: string;
    subheading: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  intro: RichText;
  signedBy?: ID;
  pillars: ID[];
  featuredVenues: ID[];
  featuredRealWeddings: ID[];
  featuredTestimonials: ID[];
  featuredOffer?: ID;
  showAwards: boolean;
  showSocialWall: boolean;
  /** ▲ Page 01 — "Your Dream Day" pinned storyboard scenes (CMS-driven copy). */
  storyboard?: {
    eyebrow: string;
    heading: string;
    scenes: { title: string; caption: string; media: MediaRef }[];
  };
  seo: Seo;
}

/* ---- §7.6 Enquiry — live backend contract -------------------------------- */

export type EnquirySource =
  | "enquiry-page"
  | "global-drawer"
  | "contact-page"
  | "occasion-cta"
  | "offer"
  | "brochure";

export interface Enquiry {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  eventType: OccasionKind | "unsure";
  eventDate?: ISODate;
  guestCount?: number;
  venuePreference?: "mega-marquee" | "mini-marquee" | "secret-garden" | "unsure";
  message?: string;
  source: EnquirySource;
  consent: boolean;
  status: "new" | "contacted" | "booked" | "archived";
  createdAt: ISODate;
}

export interface AvailabilitySlot {
  date: ISODate;
  status: "available" | "provisional" | "booked";
}
