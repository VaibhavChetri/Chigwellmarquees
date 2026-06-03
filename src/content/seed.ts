/* ============================================================================
   SEED CONTENT — stands in for the CMS until Payload v3 is wired (§7 law).
   Authored once, typed against the §7 models. lib/cms.ts reads from here.
   When Payload lands, only lib/cms.ts changes — no page touches this file.
   ============================================================================ */

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

/* A tiny shared blur placeholder (warm parchment) to avoid CLS on stub images. */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPScjZjNlYmRkJy8+PC9zdmc+";

const img = (
  id: string,
  url: string,
  alt: string,
  width = 1600,
  height = 1067,
): MediaAsset => ({
  id,
  type: "image",
  url,
  alt,
  width,
  height,
  blurDataURL: BLUR,
});

/* ---- Media library ------------------------------------------------------- */
export const media: MediaAsset[] = [
  img(
    "m-hero",
    "/media/marquee-warm.jpg",
    "The marquee dressed in warm florals and candlelight at Chigwell Hall",
    1080,
    720,
  ),
  {
    // Cinematic hero video (§3.5). Mux HLS drops in here later; for the stub the
    // poster is the LCP element and the <video> lazy-attaches post-paint. A
    // missing/placeholder src degrades gracefully to the poster (no CLS).
    id: "m-hero-video",
    type: "video",
    // The hero is the authentic Secret Garden gazebo at dusk — dark trees +
    // dramatic sky give the headline its negative space and keep text legible
    // (§3.5). No background video: the only real clips are portrait reels that
    // crop poorly full-bleed; they're surfaced in the social wall instead.
    url: "",
    posterUrl: "/media/secret-garden-gazebo.jpg",
    alt: "A couple in the Secret Garden gazebo at dusk, Chigwell Hall",
    width: 1080,
    height: 1350,
    blurDataURL: BLUR,
  },
  img(
    "m-mega",
    "/media/mega-marquee-dressed.jpg",
    "The Mega Marquee dressed in white with tall floral centrepieces",
    1080,
    720,
  ),
  img(
    "m-mini",
    "/media/mini-marquee.jpg",
    "The Mini Marquee set for an intimate reception",
    1080,
    720,
  ),
  img(
    "m-garden",
    "/media/secret-garden-gate.jpg",
    "The Secret Garden seen through its wrought-iron gate",
    1080,
    1350,
  ),
  img(
    "m-weddings",
    "/media/tablescape-candles.jpg",
    "A candlelit wedding banquet table in the marquee at Chigwell Hall",
    1080,
    1440,
  ),
  img(
    "m-multicultural",
    "/media/mandap-gold.jpg",
    "A golden mandap dressed for an Asian wedding ceremony",
    1080,
    720,
  ),
  img(
    "m-corporate",
    "/media/marquee-interior.jpg",
    "The marquee laid out for a formal seated dinner",
    1080,
    1350,
  ),
  img("m-offer", "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200", "Midweek wedding offer at Chigwell Marquees", 1200, 800),
  img("m-social-1", "/media/asian-celebration.jpg", "Guests celebrating at an Asian wedding", 1080, 1350),
  img("m-social-2", "/media/secret-garden-blossom.jpg", "Spring blossom in the Secret Garden", 1080, 1350),
  img("m-social-3", "/media/stage-lilac.jpg", "A wedding stage dressed under lilac lighting", 1080, 1350),
  img("m-social-4", "/media/ceremony-aisle.jpg", "A candle-lined ceremony aisle in the marquee", 1080, 1440),
  img("m-social-5", "/media/grounds-marquee.jpg", "The marquee in the grounds of Chigwell Hall", 1080, 1350),
  img("m-social-6", "/media/florals-gold.jpg", "A gilded floral centrepiece on a banquet table", 1080, 1440),
  // Instagram reels (real footage). Portrait, so used in the social grid — not
  // full-bleed. Each carries a poster frame; the tile renders the poster only
  // under prefers-reduced-motion (§3.4).
  {
    id: "m-reel-evening",
    type: "video",
    url: "/media/marquee-evening.mp4",
    posterUrl: "/media/marquee-evening-poster.jpg",
    alt: "An evening in the marquee — draped ceiling, fairy lights and candlelight",
    width: 1080,
    height: 1920,
  },
  {
    id: "m-reel-autumn",
    type: "video",
    url: "/media/marquee-autumn.mp4",
    posterUrl: "/media/marquee-autumn-poster.jpg",
    alt: "Autumn florals and festoon lighting in the marquee lounge",
    width: 1080,
    height: 1920,
  },
  // Gallery-specific imagery (§Page 14)
  img("g-marquee-night", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200", "The marquee aglow with festoon lighting after dark", 1200, 800),
  img("g-ceremony", "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200", "An outdoor ceremony in the Secret Garden", 1200, 1500),
  img("g-tablescape", "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200", "A styled banqueting table inside the marquee", 1200, 800),
  img("g-party", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200", "Guests dancing at an evening celebration", 1200, 1500),
  img("g-grounds", "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200", "The 42-acre grounds at golden hour", 1200, 800),
  img("g-corporate", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200", "A corporate dinner set in the Mega Marquee", 1200, 800),
  img("g-mandap", "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200", "A floral mandap dressed for an Asian wedding", 1200, 1500),
  img("g-firstdance", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200", "A couple's first dance beneath the lights", 1200, 800),
  { id: "m-brochure", type: "file", url: "/brochure/chigwell-marquees-brochure.pdf", alt: "The Chigwell Marquees brochure (PDF)" },
];

/* ---- SiteSettings (singleton) §7.2 -------------------------------------- */
export const siteSettings: SiteSettings = {
  id: "site-settings",
  brandName: "The Chigwell Marquees",
  // Contact details verified against the official site (thechigwellmarquees.com).
  contact: {
    phone: "020 3196 0159",
    email: "info@thechigwellmarquees.com",
    address: "159 High Road, Chigwell, Essex IG7 6BD",
    mapLat: 51.6178,
    mapLng: 0.0742,
  },
  social: {
    instagram: "https://www.instagram.com/thechigwellmarquees/",
    facebook: "https://www.facebook.com/thechigwellmarquees/",
    tiktok: "https://www.tiktok.com/@thechigwellmarquees",
    youtube: "https://www.youtube.com/channel/UCkorur4vvYUVoTDh5GAYzsw",
  },
  primaryNav: [
    { label: "Home", href: "/" },
    {
      label: "Weddings",
      href: "/weddings",
      children: [
        { label: "Weddings", href: "/weddings" },
        { label: "Multicultural Weddings", href: "/multicultural-weddings" },
        { label: "Real Weddings", href: "/real-weddings" },
      ],
    },
    {
      label: "Venues",
      href: "/venues",
      children: [
        { label: "Mega Marquee", href: "/venue/mega-marquee" },
        { label: "Mini Marquee", href: "/venue/mini-marquee" },
        { label: "Secret Garden", href: "/venue/secret-garden" },
      ],
    },
    {
      label: "Events",
      href: "/events",
      children: [
        { label: "Corporate", href: "/event/corporate-events" },
        { label: "Parties", href: "/event/parties" },
        { label: "Birthdays", href: "/event/birthdays" },
        { label: "Civil Ceremony", href: "/event/civil-ceremony" },
        { label: "Engagement", href: "/event/engagement-parties" },
      ],
    },
    {
      label: "Offers",
      href: "/offers",
      children: [
        { label: "Special Offers", href: "/offers" },
        { label: "Midweek Weddings", href: "/offers/midweek-weddings" },
        { label: "Late Availability", href: "/offers/late-availability" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "Our Story", href: "/about" },
        { label: "Heritage", href: "/history" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Weddings", href: "/weddings" },
    { label: "Multicultural Weddings", href: "/multicultural-weddings" },
    { label: "Venues", href: "/venues" },
    { label: "Events", href: "/events" },
    { label: "Offers", href: "/offers" },
    { label: "Real Weddings", href: "/real-weddings" },
    { label: "Gallery", href: "/gallery" },
    { label: "Virtual Tour", href: "/virtual-tour" },
    { label: "About", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  defaultSeo: {
    title: "Luxury Marquee Wedding Venue in Essex | The Chigwell Marquees",
    description:
      "A luxury marquee wedding & events venue in the 42-acre grounds of Chigwell Hall, Essex — 40 minutes from Central London. From 30 to 1,000 guests.",
    keywords: [
      "wedding venue Essex",
      "marquee wedding Chigwell",
      "luxury wedding venue Essex",
      "Asian wedding venue Essex",
    ],
  },
  enquiryRecipients: ["info@thechigwellmarquees.com"],
  announcement: {
    enabled: true,
    message: "Special Offers & Last-Minute Wedding Deals",
    cta: { label: "View offers", href: "/offers" },
    featuredOffer: "offer-midweek",
  },
  // hostSignature intentionally omitted: the official site names no individual
  // host/owner, so we don't fabricate one (the §3.7 signature feature stays
  // wired and lights up the moment a real name/role is supplied by the client).
  brochure: { file: "m-brochure", gated: true },
  // awards intentionally empty: the official site lists no awards. Populate the
  // `awards` collection + flip HomePage.showAwards to true when real ones exist.
  awards: [],
};

/* ---- Venues §7.3 (triptych) --------------------------------------------- */
export const venues: Venue[] = [
  {
    id: "venue-mega",
    slug: "mega-marquee",
    status: "published",
    name: "The Mega Marquee",
    tagline: "Grand celebrations for up to 1,000 guests",
    bestFor: "Grand celebrations & large cultural weddings",
    capacity: { min: 300, max: 1000 },
    intro:
      "Our flagship space — vast, light-filled and endlessly adaptable. The Mega Marquee is where the grandest celebrations come to life beneath one breathtaking roof.",
    body: [
      "Large windows frame the 42-acre estate, flooding the space with golden light by day and opening onto candle-lit grounds by night. Whether you are seating up to 1,000 for a banquet or hosting a flowing reception, the marquee reshapes effortlessly around your day.",
      "Temperature control keeps every season comfortable, while a state-of-the-art sound and lighting rig and built-in staging turn the room from ceremony to spectacle in moments. Free on-site parking and discreet back-of-house keep the whole occasion seamless.",
    ],
    heroMedia: "m-mega",
    gallery: ["m-mega", "m-multicultural", "m-weddings", "m-corporate", "m-hero", "m-garden"],
    specs: [
      { label: "Capacity", value: "Up to 1,000 guests" },
      { label: "Layout", value: "Seated or standing" },
      { label: "Climate", value: "Temperature controlled" },
      { label: "Sound & lighting", value: "State-of-the-art" },
      { label: "Staging", value: "Built-in stage" },
      { label: "Parking", value: "Free, on-site" },
    ],
    features: [
      "Large windows",
      "Temperature control",
      "State-of-the-art sound & lighting",
      "Built-in staging",
      "Bring your own caterers",
      "Free on-site parking",
      "Multi-day events",
    ],
    // PLACEHOLDER tour URL — swap for the real Matterport/360 link per space.
    virtualTour: { type: "matterport", url: "https://my.matterport.com/show/?m=SxQL3iGyoDo" },
    featuredTestimonial: "t-1",
    seo: {
      title: "Mega Marquee — Wedding Venue up to 1,000 Guests | Chigwell",
      description:
        "The Mega Marquee at Chigwell Hall — a luxury marquee wedding venue for up to 1,000 guests in 42 acres of Essex countryside. Climate-controlled, full AV, free parking.",
      keywords: ["marquee wedding venue Essex", "large wedding venue 1000 guests", "Asian wedding venue Essex"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "venue-mini",
    slug: "mini-marquee",
    status: "published",
    name: "The Mini Marquee",
    tagline: "Intimate gatherings for up to 200 guests",
    bestFor: "Intimate weddings & smaller gatherings",
    capacity: { min: 30, max: 200 },
    intro:
      "Warm and characterful, the Mini Marquee brings all the finish of our flagship space to a more intimate celebration.",
    body: [
      "Perfect for 30 to 200 guests, the Mini Marquee wraps your day in festoon-lit warmth. Climate-controlled and beautifully appointed, it carries the same attention to detail at a gentler scale.",
    ],
    heroMedia: "m-mini",
    gallery: ["m-mini", "m-weddings", "m-social-3", "m-garden"],
    specs: [
      { label: "Capacity", value: "Up to 200 guests" },
      { label: "Layout", value: "Seated or standing" },
      { label: "Climate", value: "Temperature controlled" },
      { label: "Parking", value: "Free, on-site" },
    ],
    features: ["Temperature control", "Large windows", "Dance floor", "Free on-site parking"],
    virtualTour: { type: "matterport", url: "https://my.matterport.com/show/?m=SxQL3iGyoDo" },
    featuredTestimonial: "t-2",
    seo: {
      title: "Mini Marquee — Intimate Wedding Venue ≤200 | Chigwell",
      description:
        "The Mini Marquee at Chigwell Hall — an intimate, climate-controlled marquee wedding venue for up to 200 guests in 42 acres of Essex countryside.",
      keywords: ["intimate wedding venue Essex", "small marquee wedding", "wedding venue up to 200 guests"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "venue-garden",
    slug: "secret-garden",
    status: "published",
    name: "The Secret Garden",
    tagline: "Manicured grounds for ceremonies & photography",
    bestFor: "Outdoor ceremonies & golden-hour photography",
    capacity: { min: 2, max: 1000 },
    intro:
      "Manicured English-garden grounds for ceremonies, photography and socialising within the 42-acre estate.",
    body: [
      "A romantic outdoor setting for vows beneath open sky, drinks on the lawn and golden-hour portraits. The Secret Garden flows naturally into both marquees, extending your celebration into the grounds.",
    ],
    heroMedia: "m-garden",
    gallery: ["m-garden", "m-hero", "m-social-3", "m-weddings", "m-social-4"],
    specs: [
      { label: "Ceremony", value: "Outdoor, open-air" },
      { label: "Photography", value: "Golden-hour grounds" },
      { label: "Grounds", value: "42-acre estate" },
      { label: "Pairs with", value: "Either marquee" },
    ],
    features: [
      "Ceremony lawn",
      "Golden-hour photography",
      "Estate grounds",
      "Drinks reception",
      "Flows into the marquees",
    ],
    virtualTour: { type: "matterport", url: "https://my.matterport.com/show/?m=SxQL3iGyoDo" },
    featuredTestimonial: "t-1",
    seo: {
      title: "Secret Garden — Outdoor Ceremony & Photography Grounds | Chigwell",
      description:
        "The Secret Garden at Chigwell Hall — manicured English-garden grounds for outdoor ceremonies and golden-hour photography within a 42-acre Essex estate.",
      keywords: ["outdoor ceremony Essex", "garden wedding photography", "English garden wedding venue"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

/* ---- Occasions §7.4 (Home editorial pillars) ---------------------------- */
const occBase = {
  status: "published" as const,
  intro: "",
  sections: [],
  gallery: [],
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

export const occasions: Occasion[] = [
  {
    ...occBase,
    id: "occ-weddings",
    slug: "weddings",
    kind: "wedding",
    title: "Weddings",
    heroHeadline: "Happily ever after begins here",
    heroSubheading: "Marquee weddings in 42 acres of Essex countryside.",
    heroMedia: "m-weddings",
    intro: [
      "A wedding at Chigwell Hall begins the moment you turn off the road and the manor rises through the trees.",
      "For one day, the house and its 42 acres are exclusively yours — a blank, beautiful canvas for a celebration that looks and feels entirely like you.",
    ],
    sections: [
      {
        heading: "The moment you arrive",
        layout: "split",
        media: ["m-hero"],
        body: [
          "Down a tree-lined drive, past lawns and old oaks, the Mega Marquee waits — light-filled by day, candle-lit by dusk. Whether you dream of a banquet for 800 or an intimate gathering, the space reshapes around your vision.",
        ],
      },
      {
        heading: "A day shaped entirely around you",
        layout: "text",
        body: [
          "There is no single way to marry here. Ceremony beneath the marquee or under open sky; a flowing reception or a seated feast; one perfect evening or a multi-day celebration. Our team holds every thread so you can simply be present.",
        ],
      },
      {
        heading: "Every detail considered",
        layout: "feature-list",
        list: [
          "Dedicated wedding coordinator",
          "Ceremony & reception under one roof",
          "Outdoor catering welcome",
          "Climate-controlled all year",
          "Free on-site parking",
          "Multi-day celebrations",
        ],
      },
      {
        heading: "Moments from the marquee",
        layout: "gallery",
        media: ["m-weddings", "m-multicultural", "m-hero", "m-garden", "m-social-3", "m-mega"],
      },
    ],
    facilities: [
      "Mega & Mini Marquees",
      "The Secret Garden",
      "Licensed for civil ceremonies",
      "Approved caterers welcome",
      "State-of-the-art AV",
      "Accessible throughout",
    ],
    whyChooseUs: [
      "42 acres, exclusively yours for the day",
      "From 30 to 1,000 guests",
      "40 minutes from Central London",
      "Genuine cultural fluency",
    ],
    gallery: ["m-weddings", "m-hero", "m-garden"],
    relatedRealWeddings: ["rw-aisha-tariq", "rw-elif-can", "rw-grace-james"],
    featuredTestimonial: "t-1",
    cta: { label: "Enquire about your wedding", href: "/enquire", style: "primary" },
    seo: {
      title: "Wedding Venue Essex | The Chigwell Marquees",
      description:
        "A luxury marquee wedding venue in 42 acres of Essex countryside, 40 minutes from London. Ceremonies and receptions for 30 to 1,000 guests at Chigwell Hall.",
      keywords: ["wedding venue Essex", "marquee wedding Chigwell", "luxury wedding venue Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-multicultural",
    slug: "multicultural-weddings",
    kind: "cultural-wedding",
    culture: "asian",
    title: "Multicultural Weddings",
    heroHeadline: "We speak the language of your celebration",
    heroSubheading: "Bangladeshi, Turkish, Hindu and South-Asian weddings, understood.",
    heroMedia: "m-multicultural",
    intro: [
      "A large part of our family are Bangladeshi, Turkish and South-Asian families — and we have learned their celebrations from the inside.",
      "That means halal and cultural caterers welcome, dedicated prayer space, gender-separated seating where you wish it, multi-day events and the room to host 500, 800, even 1,000 guests. Your traditions lead; we make them effortless.",
    ],
    // "How we support your traditions" groups for the hub (§Page 06 §4).
    sections: [
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Halal caterers welcome",
          "Approved outside caterers welcome",
          "Multi-course banquets",
          "Dietary & ritual requirements",
        ],
      },
      {
        heading: "Décor & styling",
        layout: "feature-list",
        list: ["Mandap", "Stage & sofa settings", "Draping & swagging", "Floral & lighting design"],
      },
      {
        heading: "Facilities",
        layout: "feature-list",
        list: [
          "Dedicated prayer space",
          "Gender-separated seating",
          "500–1,000 guests",
          "Multi-day events",
          "Getting-ready rooms",
        ],
      },
    ],
    // Specific cultural-fluency micro-copy for the Home feature band (§11 §8).
    facilities: [
      "Halal caterers welcome",
      "Prayer space",
      "500+ guests",
      "Baraat arrivals",
      "Holud & mehendi",
      "Davul & zurna",
      "Mandap & nikah",
      "Gender-separated seating",
    ],
    featuredTestimonial: "t-1",
    cta: { label: "Explore multicultural weddings", href: "/multicultural-weddings", style: "ghost" },
    seo: {
      title: "Multicultural Wedding Venue Essex — Asian, Bangladeshi, Turkish, Hindu | The Chigwell Marquees",
      description:
        "A multicultural wedding venue in Essex with genuine cultural fluency — halal caterers, prayer space, gender-separated seating and 500+ guest capacity for Asian, Bangladeshi, Turkish and Hindu weddings.",
      keywords: [
        "Asian wedding venue Essex",
        "Bangladeshi wedding venue Essex",
        "Turkish wedding venue Essex",
        "Hindu wedding venue Essex",
      ],
    },
  },
  {
    ...occBase,
    id: "occ-asian",
    slug: "asian-weddings",
    kind: "cultural-wedding",
    culture: "asian",
    title: "Asian Weddings",
    heroHeadline: "Asian weddings, on a grand scale",
    heroSubheading: "Space, fluency and flavour for 500, 800 or 1,000 guests.",
    heroMedia: "m-multicultural",
    intro: [
      "From 300 guests to well over 1,000, an Asian wedding asks for scale, flexibility and a team that understands the rhythm of a multi-day celebration — which is exactly what Chigwell Hall was built for.",
      "Hindu, Muslim, Sikh or civil; one grand day or several; the Mega Marquee and 42 acres flex around your ceremonies, your caterers and your guest list without compromise.",
    ],
    sections: [
      {
        heading: "Understanding Asian weddings",
        layout: "split",
        media: ["m-multicultural"],
        body: [
          "Every Asian wedding is its own world — a Hindu mandap and pheras, a Muslim nikah, a Sikh Anand Karaj, or a civil ceremony followed by a grand reception. We host them all, alongside the events that surround them: the baraat arrival, the mehendi, the sangeet and the walima.",
          "Our coordinators have run hundreds of these celebrations and understand the choreography — the timings, the entrances, the family logistics — so nothing is left to chance.",
        ],
      },
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Halal caterers welcome",
          "Indian & Pakistani caterers welcome",
          "Approved outside caterers welcome",
          "Multi-course banquets for up to 1,000",
          "Vegetarian, Jain & dietary menus",
        ],
      },
      {
        heading: "Décor & styling",
        layout: "split",
        media: ["m-weddings"],
        body: [
          "Floral mandaps, mirrored stage and sofa settings, fairy-light canopies and full draping — bring your own decorators or work with our trusted suppliers.",
          "Rich palettes of gold, crimson, emerald and blush sit beautifully against the marquee's clean lines and the gardens beyond.",
        ],
      },
      {
        heading: "A celebration in colour",
        layout: "gallery",
        media: ["m-multicultural", "m-weddings", "m-social-1", "m-social-2", "m-hero", "m-mega"],
      },
      {
        heading: "Facilities",
        layout: "feature-list",
        list: [
          "Bridal suite & getting-ready rooms",
          "Dedicated prayer room",
          "Gender-separated seating on request",
          "Large free car park",
          "Full climate control",
          "Separate entrances available",
        ],
      },
    ],
    whyChooseUs: [
      "Experienced multicultural events team",
      "Dancing until midnight",
      "Flexible, bring-your-own suppliers",
      "Competitive all-in pricing",
    ],
    relatedRealWeddings: ["rw-aisha-tariq"],
    featuredTestimonial: "t-1",
    cta: { label: "Book a private tour", href: "/enquire", style: "primary" },
    seo: {
      title: "Asian Wedding Venue Essex | The Chigwell Marquees",
      description:
        "A large-scale Asian wedding venue in Essex — halal caterers, mandap and stage styling, prayer space and capacity for over 1,000 guests at Chigwell Hall.",
      keywords: ["Asian wedding venue Essex", "large Asian wedding venue Essex", "marquee Asian wedding Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-bangladeshi",
    slug: "bangladeshi-weddings",
    kind: "cultural-wedding",
    culture: "bangladeshi",
    title: "Bangladeshi Weddings",
    heroHeadline: "Holud, nikah, walima — held beautifully",
    heroSubheading: "Multi-day Bangladeshi celebrations with halal caterers and prayer space.",
    heroMedia: "m-social-1",
    intro: [
      "A Bangladeshi wedding is a series of celebrations — and Chigwell Hall gives each one room to breathe, from an intimate Gaye Holud to a Walima for 800.",
      "Halal caterers welcome, dedicated prayer space and gender-separated seating come as standard here, not as a special request.",
    ],
    sections: [
      {
        heading: "Understanding Bangladeshi weddings",
        layout: "split",
        media: ["m-social-1"],
        body: [
          "From the Gaye Holud — families gathered to bless the couple in turmeric and marigold — through the Akd and Nikah, the Holud and Mehendi nights, to the Walima that follows, each occasion has its own mood and choreography.",
          "We host them across one venue or several days, holding the timings, the stage entrances and the money-pinning so the family can simply enjoy the moment.",
        ],
      },
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Halal caterers welcome",
          "Bangladeshi caterers welcome",
          "Kacchi biryani, rezala & mishti",
          "Approved outside caterers welcome",
          "Multi-course banquets for 500+",
        ],
      },
      {
        heading: "Décor & styling",
        layout: "split",
        media: ["m-social-2"],
        body: [
          "Marigold and rose, gold and deep red; the holud stage dressed in fresh flowers, fairy-light canopies overhead and full draping throughout.",
          "Bring your own decorators or work with our trusted Bangladeshi-wedding suppliers.",
        ],
      },
      {
        heading: "Moments of colour & ceremony",
        layout: "gallery",
        media: ["m-social-1", "m-social-2", "m-multicultural", "m-weddings", "m-hero"],
      },
      {
        heading: "Facilities",
        layout: "feature-list",
        list: [
          "Bridal suite & getting-ready rooms",
          "Dedicated prayer room",
          "Gender-separated seating on request",
          "Large free car park",
          "Full climate control",
        ],
      },
    ],
    whyChooseUs: [
      "Team experienced in multi-day Bengali weddings",
      "A midnight licence",
      "Money-pinning & stage choreography understood",
      "Competitive pricing for large guest lists",
    ],
    relatedRealWeddings: ["rw-aisha-tariq"],
    featuredTestimonial: "t-1",
    cta: { label: "Book a private tour", href: "/enquire", style: "primary" },
    seo: {
      title: "Bangladeshi Wedding Venue Essex | The Chigwell Marquees",
      description:
        "A Bangladeshi wedding venue in Essex for holud, nikah and walima — halal caterers, prayer space, gender-separated seating and 500+ guest capacity at Chigwell Hall.",
      keywords: ["Bangladeshi wedding venue Essex", "holud venue Essex", "walima venue Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-turkish",
    slug: "turkish-weddings",
    kind: "cultural-wedding",
    culture: "turkish",
    title: "Turkish Weddings",
    heroHeadline: "Davul, zurna and halay into the night",
    heroSubheading: "Kına gecesi and Turkish receptions with room to dance.",
    heroMedia: "m-social-4",
    intro: [
      "From the henna-night intimacy of Kına Gecesi to a reception that runs into the night, a Turkish wedding is built on music, food and family — and we know the tempo.",
      "Davul and zurna, Turkish pop, the takı money dance and hours of halay: bring it all. The Mega Marquee has the dance floor, the space to hold it.",
    ],
    sections: [
      {
        heading: "Understanding Turkish weddings",
        layout: "split",
        media: ["m-social-4"],
        body: [
          "The Kına Gecesi opens the celebration — the bride in red, henna and candlelight, the family gathered. The civil ceremony and grand reception follow, announced by davul and zurna and carried by Turkish pop and live music.",
          "We understand the takı, the entrances and the long, joyful halay — and we plan the evening so the dancing never has to stop early.",
        ],
      },
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Halal caterers welcome",
          "Turkish & Mediterranean caterers welcome",
          "Meze, kuzu, pilav & baklava",
          "Approved outside caterers welcome",
          "Multi-course banquets for 500+",
        ],
      },
      {
        heading: "Décor & styling",
        layout: "split",
        media: ["m-weddings"],
        body: [
          "Red and gold for the kına; elegant white-and-greenery for the reception. Fairy-light canopies, full draping and a stage with room for the band.",
          "Bring your own decorators, or style the day with our trusted suppliers.",
        ],
      },
      {
        heading: "Music, colour & celebration",
        layout: "gallery",
        media: ["m-social-4", "m-weddings", "m-multicultural", "m-hero", "m-garden"],
      },
      {
        heading: "Facilities",
        layout: "feature-list",
        list: [
          "Bridal suite & getting-ready rooms",
          "Large dance floor & staging",
          "Midnight licence",
          "Large free car park",
          "Full climate control",
        ],
      },
    ],
    whyChooseUs: [
      "Team fluent in Turkish wedding traditions",
      "Halay until midnight",
      "Live band & DJ friendly",
      "Competitive pricing for large guest lists",
    ],
    relatedRealWeddings: ["rw-elif-can"],
    featuredTestimonial: "t-2",
    cta: { label: "Book a private tour", href: "/enquire", style: "primary" },
    seo: {
      title: "Turkish Wedding Venue Essex | The Chigwell Marquees",
      description:
        "A Turkish wedding venue in Essex for kına gecesi and grand receptions — davul & zurna, halal caterers and a dance floor with room to celebrate into the night.",
      keywords: ["Turkish wedding venue Essex halal", "kina gecesi venue Essex", "Turkish wedding venue London"],
    },
  },
  {
    ...occBase,
    id: "occ-hindu",
    slug: "hindu-weddings",
    kind: "cultural-wedding",
    culture: "hindu",
    title: "Hindu Weddings",
    heroHeadline: "Baraat, mandap and the sacred fire",
    heroSubheading: "Hindu ceremonies with open-flame approval and mandap staging.",
    heroMedia: "m-weddings",
    intro: [
      "A Hindu wedding moves from the baraat's joyful arrival to the sacred fire of the pheras — and Chigwell Hall holds every moment, indoors and out.",
      "Open-flame ceremonies are approved, the mandap takes pride of place, and 42 acres make for an unforgettable baraat.",
    ],
    sections: [
      {
        heading: "Understanding Hindu weddings",
        layout: "split",
        media: ["m-weddings"],
        body: [
          "The groom's baraat arrives in music and dancing; the couple meet beneath the mandap; and around the sacred fire they take the saat phere — the seven steps that bind the marriage. The sangeet and reception carry the celebration on into the night.",
          "Our team is experienced with the havan and open flame, the mandap setup and the family rituals, planning each step so the ceremony flows exactly as your priest intends.",
        ],
      },
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Indian vegetarian caterers welcome",
          "Jain & satvik menus",
          "Live chaat & dosa stations",
          "Approved outside caterers welcome",
          "Multi-course banquets for 500+",
        ],
      },
      {
        heading: "Décor & styling",
        layout: "split",
        media: ["m-multicultural"],
        body: [
          "Floral mandaps in marigold and rose, mirrored stage settings, fairy-light canopies and full draping throughout.",
          "Bring your own decorators or work with our trusted mandap suppliers.",
        ],
      },
      {
        heading: "Ritual, colour & joy",
        layout: "gallery",
        media: ["m-multicultural", "m-weddings", "m-hero", "m-garden", "m-mega"],
      },
      {
        heading: "Facilities",
        layout: "feature-list",
        list: [
          "Bridal & groom suites",
          "Open-flame (havan) approved",
          "Mandap staging",
          "Baraat-friendly grounds",
          "Large free car park",
          "Full climate control",
        ],
      },
    ],
    whyChooseUs: [
      "Experienced with open-flame ceremonies",
      "Baraat-friendly 42-acre grounds",
      "Flexible mandap & décor suppliers",
      "Competitive pricing for large weddings",
    ],
    cta: { label: "Book a private tour", href: "/enquire", style: "primary" },
    seo: {
      title: "Hindu Wedding Venue Essex | The Chigwell Marquees",
      description:
        "A Hindu wedding venue in Essex with baraat arrivals, mandap staging, open-flame ceremony approval and vegetarian catering across 42 acres at Chigwell Hall.",
      keywords: ["Hindu mandap wedding venue Essex", "Hindu wedding venue Essex", "baraat venue Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-corporate",
    slug: "corporate-events",
    kind: "corporate",
    title: "Corporate & Events",
    heroHeadline: "From boardroom to banquet",
    heroSubheading: "Conferences, awards dinners and away-days, 40 minutes from London.",
    heroMedia: "m-corporate",
    intro: [
      "From conferences and awards dinners to product launches and away-days, Chigwell Hall pairs a blank-canvas marquee with serious infrastructure and 42 acres of privacy.",
      "One fully-serviced space for 30 delegates or 1,000 — easy to reach, easy to brand, and a world away from the office.",
    ],
    sections: [
      {
        heading: "A blank canvas that means business",
        layout: "split",
        media: ["m-corporate"],
        body: [
          "The Mega Marquee reconfigures from theatre-style conference to exhibition floor to gala dinner without compromise — your branding, your layout, your run of show.",
          "Our events team handles the logistics end to end, from AV and staging to registration, breakouts and timings, so your day runs to the minute.",
        ],
      },
      {
        heading: "Facilities & infrastructure",
        layout: "feature-list",
        list: [
          "State-of-the-art AV & PA",
          "Staging, lectern & screens",
          "High-speed connectivity",
          "Breakout & syndicate spaces",
          "Full climate control",
          "Around 600 free spaces",
        ],
      },
      {
        heading: "Capacity & layouts",
        layout: "feature-list",
        list: [
          "Theatre for up to 1,000",
          "Cabaret & banqueting",
          "Exhibition floor space",
          "Drinks receptions on the lawn",
        ],
      },
      {
        heading: "Catering",
        layout: "feature-list",
        list: [
          "Bring your own caterers",
          "Halal, vegetarian & dietary menus",
          "Drinks receptions & licensed bar",
          "Approved external caterers welcome",
        ],
      },
      {
        heading: "The space at work",
        layout: "gallery",
        media: ["m-corporate", "m-mega", "m-hero", "m-garden"],
      },
    ],
    whyChooseUs: [
      "Dedicated corporate event manager",
      "15 minutes off the M25",
      "Around 600 free spaces",
      "Competitive day-delegate rates",
    ],
    cta: { label: "Explore corporate events", href: "/event/corporate-events", style: "ghost" },
    seo: {
      title: "Corporate Events Venue Essex | The Chigwell Marquees",
      description:
        "A corporate events venue in Essex for conferences, awards dinners and away-days — full AV, breakout spaces, free parking and capacity for up to 1,000, 40 minutes from London.",
      keywords: ["corporate events venue Essex", "conference venue Essex", "awards dinner venue Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-parties",
    slug: "parties",
    kind: "party",
    title: "Parties",
    heroHeadline: "Throw a party they'll talk about",
    heroSubheading: "Anniversaries, celebrations and big nights, with a midnight licence.",
    heroMedia: "m-mega",
    intro: [
      "When the occasion calls for a proper celebration, Chigwell Hall gives you the room, the midnight licence and the dance floor to do it justice.",
      "Bring your own caterers, DJ and theme — we'll make the rest effortless.",
    ],
    sections: [
      {
        heading: "A party with room to dance",
        layout: "split",
        media: ["m-mega"],
        body: [
          "From 30 close friends to a thousand guests, the marquee transforms for the night — festoon-lit, sprung dance floor, full bar and a sound rig that goes the distance.",
        ],
      },
      {
        heading: "What's included",
        layout: "feature-list",
        list: [
          "Sprung dance floor",
          "Festoon & feature lighting",
          "Licensed bar",
          "Midnight licence",
          "Bring your own caterers & DJ",
          "Free on-site parking",
        ],
      },
      {
        heading: "The night in full swing",
        layout: "gallery",
        media: ["m-mega", "m-weddings", "m-hero", "m-garden"],
      },
    ],
    whyChooseUs: [
      "Dancing until midnight",
      "Bring your own caterers & DJ",
      "Free on-site parking",
      "30 to 1,000 guests",
    ],
    cta: { label: "Plan your party", href: "/enquire", style: "primary" },
    seo: {
      title: "Party Venue Essex | The Chigwell Marquees",
      description:
        "A party venue in Essex with a midnight licence, dance floor and room for 30 to 1,000 guests — bring your own caterers and DJ to a private 42-acre estate near London.",
      keywords: ["party venue Essex", "celebration venue Essex", "private party venue near London"],
    },
  },
  {
    ...occBase,
    id: "occ-birthdays",
    slug: "birthdays",
    kind: "party",
    title: "Birthdays",
    heroHeadline: "Milestone birthdays, beautifully done",
    heroSubheading: "From 18ths to 80ths, with space to make it special.",
    heroMedia: "m-weddings",
    intro: [
      "Some birthdays deserve more than a back room. Mark the milestone in 42 acres of Essex countryside, styled exactly your way.",
    ],
    sections: [
      {
        heading: "A celebration at any scale",
        layout: "split",
        media: ["m-weddings"],
        body: [
          "Intimate dinners in the Mini Marquee or grand parties in the Mega Marquee — climate-controlled, beautifully lit and entirely yours for the night.",
        ],
      },
      {
        heading: "What's included",
        layout: "feature-list",
        list: [
          "Dance floor & staging",
          "Festoon & feature lighting",
          "Licensed bar",
          "Midnight licence",
          "Free on-site parking",
        ],
      },
      {
        heading: "Moments worth marking",
        layout: "gallery",
        media: ["m-weddings", "m-mega", "m-hero", "m-garden"],
      },
    ],
    whyChooseUs: [
      "Intimate or grand — your call",
      "Midnight licence",
      "Bring your own caterers & entertainment",
      "Free on-site parking",
    ],
    cta: { label: "Plan your birthday", href: "/enquire", style: "primary" },
    seo: {
      title: "Birthday Party Venue Essex | The Chigwell Marquees",
      description:
        "A birthday party venue in Essex for milestone celebrations — from intimate dinners to parties for 1,000, with a midnight licence and free parking near London.",
      keywords: ["birthday party venue Essex", "milestone birthday venue Essex", "18th 40th 50th birthday venue"],
    },
  },
  {
    ...occBase,
    id: "occ-civil-ceremony",
    slug: "civil-ceremony",
    kind: "ceremony",
    title: "Civil Ceremonies",
    heroHeadline: "Say ‘I do’ in the Essex countryside",
    heroSubheading: "Licensed for civil ceremonies, indoors or under open sky.",
    heroMedia: "m-garden",
    intro: [
      "Hold your ceremony exactly where you'll celebrate — beneath the marquee or out in the Secret Garden — with everything in one beautiful place.",
    ],
    sections: [
      {
        heading: "Licensed for civil ceremonies",
        layout: "split",
        media: ["m-garden"],
        body: [
          "Our spaces are licensed for civil ceremonies and partnerships, indoors and outdoors. Marry under the open sky in the Secret Garden, then walk straight into your reception — no travel, no waiting, no compromise.",
          "A wet-weather plan is always ready, so the day is beautiful whatever the forecast.",
        ],
      },
      {
        heading: "Your ceremony, your way",
        layout: "text",
        body: [
          "Readings, music, an aisle through the garden or a candle-lit marquee — your registrar, your words, your people. We coordinate the timings so the moment is yours alone.",
        ],
      },
      {
        heading: "What's included",
        layout: "feature-list",
        list: [
          "Licensed indoor & outdoor ceremony",
          "Ceremony & reception in one place",
          "Wet-weather plan always ready",
          "42 acres for photography",
          "Free on-site parking",
        ],
      },
      {
        heading: "The setting",
        layout: "gallery",
        media: ["m-garden", "m-hero", "m-weddings", "m-social-3"],
      },
    ],
    whyChooseUs: [
      "Licensed indoors & outdoors",
      "Ceremony & reception in one place",
      "42 acres for photography",
      "Wet-weather plan always ready",
    ],
    cta: { label: "Enquire about your ceremony", href: "/enquire", style: "primary" },
    seo: {
      title: "Civil Ceremony Venue Essex | The Chigwell Marquees",
      description:
        "A civil ceremony venue in Essex licensed for indoor and outdoor ceremonies — marry in the Secret Garden or marquee and celebrate in one place across 42 acres.",
      keywords: ["civil ceremony venue Essex", "outdoor ceremony venue Essex", "licensed wedding venue Essex"],
    },
  },
  {
    ...occBase,
    id: "occ-engagement",
    slug: "engagement-parties",
    kind: "party",
    title: "Engagement Parties",
    heroHeadline: "Begin the celebration",
    heroSubheading: "Mark the engagement in style, before the big day arrives.",
    heroMedia: "m-multicultural",
    intro: [
      "Gather everyone to toast the news in a setting as memorable as the moment — and let it be a taste of the wedding to come.",
    ],
    sections: [
      {
        heading: "A first celebration to remember",
        layout: "split",
        media: ["m-multicultural"],
        body: [
          "An intimate dinner or a grand party, indoors or in the garden — styled your way, with the same warmth and flexibility that makes our weddings sing.",
        ],
      },
      {
        heading: "What's included",
        layout: "feature-list",
        list: [
          "Marquee or garden setting",
          "Festoon & feature lighting",
          "Licensed bar",
          "Bring your own caterers & DJ",
          "Free on-site parking",
        ],
      },
      {
        heading: "Set the tone",
        layout: "gallery",
        media: ["m-multicultural", "m-weddings", "m-hero", "m-garden"],
      },
    ],
    whyChooseUs: [
      "Intimate or grand",
      "A preview of your wedding venue",
      "Bring your own caterers & DJ",
      "Free on-site parking",
    ],
    cta: { label: "Plan your engagement party", href: "/enquire", style: "primary" },
    seo: {
      title: "Engagement Party Venue Essex | The Chigwell Marquees",
      description:
        "An engagement party venue in Essex — celebrate the news in a 42-acre estate near London, with marquee and garden settings, a licensed bar and free parking.",
      keywords: ["engagement party venue Essex", "engagement venue near London", "private celebration venue Essex"],
    },
  },
];

/* ---- Offers §7.5 -------------------------------------------------------- */
export const offers: Offer[] = [
  {
    id: "offer-midweek",
    slug: "midweek-weddings",
    status: "published",
    title: "Midweek Wedding Offer",
    kind: "midweek",
    summary: "Save on Monday–Thursday weddings throughout the year.",
    details: [
      "Choose a midweek date and enjoy the full Chigwell Hall experience for less — the same 42 acres, the same exclusive use, the same dedicated team, at a gentler price.",
      "Ideal for couples who want a relaxed celebration without the weekend premium, and for guests who love a midweek escape from the city.",
    ],
    heroMedia: "m-offer",
    badgeLabel: "Midweek",
    validFrom: "2026-01-01T00:00:00Z",
    validUntil: "2026-12-31T00:00:00Z",
    terms: [
      "Applies to new bookings for Monday–Thursday dates only.",
      "Subject to availability; cannot be combined with other offers.",
      "Bank holidays excluded.",
    ],
    featured: true,
    cta: { label: "Enquire about midweek", href: "/enquire", style: "primary" },
    seo: {
      title: "Midweek Wedding Offer Essex | The Chigwell Marquees",
      description:
        "Save on midweek weddings at Chigwell Hall — exclusive use of a 42-acre Essex estate for Monday–Thursday celebrations, at a gentler price than weekends.",
      keywords: ["midweek wedding offers Essex", "midweek wedding venue Essex"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "offer-late-availability",
    slug: "late-availability",
    status: "published",
    title: "Last-Minute 2026 Dates",
    kind: "late-availability",
    summary: "A handful of 2026 dates remain — celebrate sooner, for less.",
    details: [
      "Planning a wedding closer to the date? We release our remaining 2026 dates at a special rate for couples ready to book quickly.",
      "Everything you'd expect from a Chigwell Hall wedding — simply sooner.",
    ],
    heroMedia: "m-hero",
    badgeLabel: "Late availability",
    validUntil: "2026-09-30T00:00:00Z",
    terms: [
      "Applies to remaining 2026 dates only, while available.",
      "Booking and deposit required within 14 days of enquiry.",
      "Subject to availability; cannot be combined with other offers.",
    ],
    featured: false,
    cta: { label: "Check remaining dates", href: "/enquire", style: "primary" },
    seo: {
      title: "Last-Minute Wedding Offers Essex | The Chigwell Marquees",
      description:
        "Last-minute 2026 wedding dates at Chigwell Hall, Essex, at a special rate — exclusive use of a 42-acre estate for couples ready to book.",
      keywords: ["last-minute wedding offers Essex", "late availability wedding venue Essex"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "offer-winter",
    slug: "winter-wedding-savings",
    status: "published",
    title: "Winter Wedding Savings",
    kind: "seasonal",
    summary: "Candle-lit winter weddings, November to February, at a special rate.",
    details: [
      "There is something magical about a winter wedding here — the marquee aglow with candlelight, the grounds dusted and still, the climate control keeping everyone warm.",
      "Book a November to February date and enjoy our seasonal saving.",
    ],
    heroMedia: "m-garden",
    badgeLabel: "Seasonal",
    validFrom: "2026-11-01T00:00:00Z",
    validUntil: "2027-02-28T00:00:00Z",
    terms: [
      "Applies to new bookings for November–February dates.",
      "Excludes December weekends and the festive period.",
      "Subject to availability; cannot be combined with other offers.",
    ],
    featured: false,
    cta: { label: "Enquire about winter dates", href: "/enquire", style: "primary" },
    seo: {
      title: "Winter Wedding Offer Essex | The Chigwell Marquees",
      description:
        "Candle-lit winter weddings at Chigwell Hall, Essex — November to February dates at a special seasonal rate, with full climate control.",
      keywords: ["winter wedding venue Essex", "seasonal wedding offers Essex"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "offer-complimentary-shoot",
    slug: "complimentary-engagement-shoot",
    status: "published",
    title: "Complimentary Engagement Shoot",
    kind: "special",
    summary: "Book your 2026 or 2027 wedding and receive an engagement shoot in the grounds.",
    details: [
      "Confirm your wedding with us and we'll gift you a pre-wedding engagement shoot in our 42 acres — golden-hour portraits to treasure, and a chance to fall in love with your venue all over again.",
    ],
    heroMedia: "m-weddings",
    badgeLabel: "Special offer",
    validUntil: "2026-12-31T00:00:00Z",
    terms: [
      "Applies to confirmed 2026 and 2027 wedding bookings.",
      "Shoot subject to photographer and grounds availability.",
      "Cannot be exchanged for cash and cannot be combined with other offers.",
    ],
    featured: false,
    cta: { label: "Enquire about this offer", href: "/enquire", style: "primary" },
    seo: {
      title: "Wedding Offers Essex — Complimentary Engagement Shoot | The Chigwell Marquees",
      description:
        "Book your 2026 or 2027 wedding at Chigwell Hall, Essex and receive a complimentary engagement shoot in our 42-acre grounds.",
      keywords: ["wedding offers Essex", "engagement shoot wedding venue Essex"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

/* ---- Awards §7.5 -------------------------------------------------------- */
// Empty by design — the official site lists no awards, so none are invented.
// Add real Award records here (and set HomePage.showAwards = true) when supplied.
export const awards: Award[] = [];

/* ---- Heritage milestones §7.5 ------------------------------------------- */
// Thematic markers, not fabricated dates — the official site gives no detailed
// history timeline, so we present verifiable facts (Grade II listing, 42 acres)
// rather than inventing years. Replace `year` with real dates when supplied.
export const historyMilestones: HistoryMilestone[] = [
  {
    id: "hm-hall",
    year: "The Hall",
    title: "A Grade II listed manor",
    body: "Chigwell Hall is a Grade II listed manor — a piece of Essex heritage standing at the heart of the estate.",
    order: 1,
  },
  {
    id: "hm-grounds",
    year: "42 acres",
    title: "Wrapped in countryside",
    body: "Forty-two acres of private grounds, lawns and mature trees surround the Hall, just 40 minutes from Central London and 15 minutes off the M25.",
    order: 2,
  },
  {
    id: "hm-marquees",
    year: "The marquees",
    title: "Spaces for every celebration",
    body: "The Mega and Mini Marquees and the Secret Garden host weddings and events for 30 to 1,000 guests, with around 600 free parking spaces.",
    order: 3,
  },
  {
    id: "hm-today",
    year: "Today",
    title: "Exclusively yours",
    body: "For one day, the Hall and its grounds are entirely yours — a blank, beautiful canvas for a celebration that feels completely your own.",
    order: 4,
  },
];

/* ---- FAQs §7.5 (verbatim from thechigwellmarquees.com/faq) -------------- */
export const faqs: Faq[] = [
  {
    id: "faq-spaces-difference",
    category: "The spaces",
    order: 1,
    question: "What's the difference between your Mega and Mini Marquee?",
    answer:
      "Capacity. Our Mega Marquee is the larger of the two venues, accommodating from 300 to 1,000 guests. Our Mini Marquee is for a more intimate event, accommodating up to 200 guests.",
  },
  {
    id: "faq-civil",
    category: "The spaces",
    order: 2,
    question: "Is the venue licensed for civil ceremonies?",
    answer: "Our Secret Garden and Belmont Suite are both licensed to hold civil ceremonies.",
  },
  {
    id: "faq-catering",
    category: "Catering & drinks",
    order: 1,
    question: "Does the hire cost include catering?",
    answer:
      "No — The Chigwell Marquees are dry-hire venues, so you're free to bring your own caterers. That makes it easy to arrange halal, vegetarian, Jain or any cultural catering exactly as you wish.",
  },
  {
    id: "faq-hours",
    category: "Planning & logistics",
    order: 1,
    question: "How many hours does the hire charge include?",
    answer:
      "Twelve hours is standard. When you hold your civil ceremony with us, this can be extended.",
  },
  {
    id: "faq-finish",
    category: "Planning & logistics",
    order: 2,
    question: "What time does my event need to finish by?",
    answer: "Our licence permits events to go on until midnight.",
  },
  {
    id: "faq-fireworks",
    category: "Planning & logistics",
    order: 3,
    question: "Are fireworks permitted?",
    answer: "No, they are not.",
  },
  {
    id: "faq-parking",
    category: "Getting here & staying",
    order: 1,
    question: "Is there parking available at The Chigwell Marquees?",
    answer:
      "Yes — and lots of it. We have approximately 600 car park spaces available, free for guests to use.",
  },
  {
    id: "faq-tube",
    category: "Getting here & staying",
    order: 2,
    question: "What's the nearest tube station?",
    answer:
      "Chigwell Station is our nearest underground station, on the Central Line. From there it's a 15-minute walk to the venue or a 5-minute car journey.",
  },
  {
    id: "faq-accommodation",
    category: "Getting here & staying",
    order: 3,
    question: "Do you have accommodation for guests at the venue?",
    answer: "We don't have accommodation on-site, but there are several hotels nearby.",
  },
  {
    id: "faq-hotels",
    category: "Getting here & staying",
    order: 4,
    question: "Are there nearby hotels for guests to stay?",
    answer:
      "Yes. The Travelodge Chigwell is a 6-minute drive away, and the Premier Inn Buckhurst Hill is a 7-minute drive away.",
  },
];

/* ---- Social wall §7.5 --------------------------------------------------- */
export const socialPosts: SocialPost[] = [
  { id: "sp-1", media: "m-reel-evening", permalink: "https://instagram.com/thechigwellmarquees", caption: "An evening in the marquee ✨", culture: "asian", featured: true, order: 1 },
  { id: "sp-2", media: "m-social-1", permalink: "https://instagram.com/thechigwellmarquees", caption: "The celebration in full swing", culture: "asian", featured: true, order: 2 },
  { id: "sp-3", media: "m-social-2", permalink: "https://instagram.com/thechigwellmarquees", caption: "Blossom in the Secret Garden", culture: "western", featured: false, order: 3 },
  { id: "sp-4", media: "m-social-3", permalink: "https://instagram.com/thechigwellmarquees", caption: "Lilac-lit stage", culture: "asian", featured: false, order: 4 },
  { id: "sp-5", media: "m-reel-autumn", permalink: "https://instagram.com/thechigwellmarquees", caption: "Autumn florals & festoon light", culture: "asian", featured: false, order: 5 },
  { id: "sp-6", media: "m-social-4", permalink: "https://instagram.com/thechigwellmarquees", caption: "A candle-lined aisle", culture: "turkish", featured: false, order: 6 },
  { id: "sp-7", media: "m-social-5", permalink: "https://instagram.com/thechigwellmarquees", caption: "The marquee in the grounds", culture: "western", featured: false, order: 7 },
  { id: "sp-8", media: "m-social-6", permalink: "https://instagram.com/thechigwellmarquees", caption: "Gilded centrepieces", culture: "hindu", featured: false, order: 8 },
];

/* ---- Gallery §7.5 (filterable; categories drive the chips) -------------- */
export const galleryItems: GalleryItem[] = [
  { id: "gi-1", media: "m-hero", category: ["weddings", "grounds"] },
  { id: "gi-2", media: "g-marquee-night", category: ["marquees", "weddings"] },
  { id: "gi-3", media: "m-multicultural", category: ["asian", "weddings"] },
  { id: "gi-4", media: "g-ceremony", category: ["grounds", "weddings"] },
  { id: "gi-5", media: "m-corporate", category: ["corporate"] },
  { id: "gi-6", media: "g-party", category: ["parties"] },
  { id: "gi-7", media: "m-mega", category: ["marquees"] },
  { id: "gi-8", media: "g-mandap", category: ["asian", "weddings"] },
  { id: "gi-9", media: "g-tablescape", category: ["marquees", "weddings"] },
  { id: "gi-10", media: "m-garden", category: ["grounds"] },
  { id: "gi-11", media: "g-corporate", category: ["corporate"] },
  { id: "gi-12", media: "m-social-1", category: ["asian", "weddings"] },
  { id: "gi-13", media: "g-grounds", category: ["grounds"] },
  { id: "gi-14", media: "m-mini", category: ["marquees"] },
  { id: "gi-15", media: "m-social-4", category: ["asian", "parties"] },
  { id: "gi-16", media: "g-firstdance", category: ["weddings"] },
  { id: "gi-17", media: "m-weddings", category: ["weddings"] },
  { id: "gi-18", media: "m-social-2", category: ["asian", "weddings"] },
];

/* ---- Testimonials §7.5 -------------------------------------------------- */
// PLACEHOLDER COPY — the official testimonials page lists case studies (e.g.
// "Amy & Danny's Summer Wedding", "Bollywood Themed Engagement Party") but
// publishes no quote text. We therefore use non-attributed sample sentiment
// rather than putting fabricated words in real people's mouths. Replace with
// genuine, attributed quotes from the client before launch.
// NOTE: `rating` is intentionally omitted — the official site publishes no star
// ratings, so we don't fabricate any. Add real ratings here and the star display
// + Review/AggregateRating JSON-LD activate automatically (lib/seo).
export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "From the moment we arrived down the tree-lined drive, it felt like the grounds were exclusively ours.",
    author: "A recent couple",
    context: "Mega Marquee wedding",
    source: "direct",
    occasionKind: "wedding",
  },
  {
    id: "t-2",
    quote: "The team understood exactly what our day needed. Nothing was too much to ask.",
    author: "A recent couple",
    context: "Mini Marquee wedding",
    source: "direct",
    occasionKind: "wedding",
  },
  {
    id: "t-3",
    quote:
      "Every tradition was understood and handled with care — the halal caterers, the prayer space, the stage. We simply enjoyed our day.",
    author: "A recent couple",
    context: "Multicultural wedding · Mega Marquee",
    source: "direct",
    occasionKind: "cultural-wedding",
  },
  {
    id: "t-4",
    quote:
      "A faultless venue for our awards dinner. The space, the AV and the team made the whole evening effortless.",
    author: "A corporate client",
    context: "Awards dinner · Mega Marquee",
    source: "direct",
    occasionKind: "corporate",
  },
  {
    id: "t-5",
    quote:
      "The grounds at golden hour were unforgettable. Our guests are still talking about the setting.",
    author: "A recent couple",
    context: "Garden celebration · Secret Garden",
    source: "direct",
    occasionKind: "party",
  },
];

/* ---- Real Weddings §7.5 ------------------------------------------------- */
// ILLUSTRATIVE SAMPLE CASE STUDIES — these couples/stories are placeholders that
// demonstrate the template (the official site's real case studies, e.g. "Amy &
// Danny's Summer Wedding", don't publish full story/image content). Replace with
// genuine real weddings + supplier credits + imagery before launch.
export const realWeddings: RealWedding[] = [
  {
    id: "rw-aisha-tariq",
    slug: "aisha-and-tariq",
    status: "published",
    coupleNames: "Aisha & Tariq",
    date: "2025-08-16T00:00:00Z",
    culture: "bangladeshi",
    venue: "venue-mega",
    guestCount: 480,
    story: [
      "Over three unforgettable days, the Mega Marquee became the heart of Aisha and Tariq's celebration — a Gaye Holud awash with marigold and laughter, a serene Nikah, and a Walima for 480 that ran late into the warm August night.",
      "Halal caterers welcome, a dedicated prayer space and a stage dressed in fresh flowers meant every tradition was honoured. The grounds gave space for the baraat and golden-hour portraits beneath the old oaks.",
      "“From the moment we arrived down the tree-lined drive, it felt like the grounds were exclusively ours.”",
    ],
    heroMedia: "m-multicultural",
    gallery: ["m-multicultural", "m-social-1", "m-social-2", "m-hero", "m-mega"],
    suppliers: [
      { role: "Photography", name: "Studio Noor" },
      { role: "Catering", name: "Spice Route Halal Catering" },
      { role: "Florals & mandap", name: "Marigold & Co." },
      { role: "Entertainment", name: "Dhol Collective" },
    ],
    testimonial: "t-1",
    seo: {
      title: "Aisha & Tariq — Bangladeshi Wedding at Chigwell | The Chigwell Marquees",
      description:
        "A three-day Bangladeshi wedding at Chigwell Hall, Essex — holud, nikah and a walima for 480 guests, with halal caterers and prayer space.",
      keywords: ["Bangladeshi wedding Essex", "real wedding Chigwell", "holud walima venue"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "rw-elif-can",
    slug: "elif-and-can",
    status: "published",
    coupleNames: "Elif & Can",
    date: "2025-07-05T00:00:00Z",
    culture: "turkish",
    venue: "venue-mega",
    guestCount: 350,
    story: [
      "Elif and Can's celebration opened with a Kına Gecesi glowing in red and candlelight, and built to a reception powered by davul, zurna and Turkish pop.",
      "The takı, the long ribbons of halay, and a dance floor that never emptied carried 350 guests into the night — exactly the night they had dreamed of.",
      "“The team understood our traditions completely. Nothing was too much to ask.”",
    ],
    heroMedia: "m-weddings",
    gallery: ["m-weddings", "m-social-4", "m-multicultural", "m-garden"],
    suppliers: [
      { role: "Photography", name: "Işık Films" },
      { role: "Catering", name: "Anatolia Fine Dining" },
      { role: "Music", name: "Davul & Zurna Ensemble" },
      { role: "Styling", name: "Bosphorus Events" },
    ],
    testimonial: "t-2",
    seo: {
      title: "Elif & Can — Turkish Wedding at Chigwell | The Chigwell Marquees",
      description:
        "A Turkish wedding at Chigwell Hall, Essex — kına gecesi, davul & zurna and halay into the night for 350 guests in the Mega Marquee.",
      keywords: ["Turkish wedding Essex", "real wedding Chigwell", "kina gecesi venue"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "rw-grace-james",
    slug: "grace-and-james",
    status: "published",
    coupleNames: "Grace & James",
    date: "2025-09-20T00:00:00Z",
    culture: "western",
    venue: "venue-garden",
    guestCount: 140,
    story: [
      "Grace and James married under open sky in the Secret Garden, their vows carried on a soft September breeze before 140 of their closest people.",
      "Drinks flowed on the lawn through golden hour, then the celebration moved into the festoon-lit Mini Marquee for dinner and dancing — an English garden wedding, exactly as they'd imagined.",
    ],
    heroMedia: "m-social-3",
    gallery: ["m-social-3", "m-garden", "m-hero", "m-mini"],
    suppliers: [
      { role: "Photography", name: "Fern & Field" },
      { role: "Catering", name: "The Estate Kitchen" },
      { role: "Florals", name: "Wild Stem Studio" },
    ],
    seo: {
      title: "Grace & James — Garden Wedding at Chigwell | The Chigwell Marquees",
      description:
        "An English-garden wedding at Chigwell Hall, Essex — an outdoor Secret Garden ceremony and festoon-lit reception for 140 guests.",
      keywords: ["garden wedding Essex", "outdoor ceremony Essex", "real wedding Chigwell"],
    },
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

/* ---- HomePage singleton §7.5 (composed by editors) ---------------------- */
export const homePage: HomePage = {
  id: "home",
  hero: {
    media: "m-hero-video",
    eyebrow: "Luxury Marquee Wedding Venue · Chigwell Hall, Essex",
    headline: "Where Essex evenings become forever.",
    subheading:
      "A marquee wedding venue in 42 acres of English countryside, 40 minutes from London.",
    primaryCta: { label: "Enquire", href: "/enquire", style: "primary" },
    secondaryCta: { label: "Book a viewing", href: "/contact", style: "ghost" },
  },
  intro: [
    "The moment you arrive, down a tree-lined drive, Chigwell Hall reveals itself.",
    "A Grade II listed manor wrapped in 42 acres of Essex countryside, 40 minutes from London — and for one day, exclusively yours. From 30 guests to 1,000, your celebration unfolds exactly as you dreamed it.",
  ],
  signedBy: "site-settings",
  pillars: ["occ-weddings", "occ-multicultural", "occ-corporate"],
  featuredVenues: ["venue-mega", "venue-mini", "venue-garden"],
  featuredRealWeddings: ["rw-aisha-tariq", "rw-elif-can", "rw-grace-james"],
  featuredTestimonials: ["t-1", "t-2"],
  featuredOffer: "offer-midweek",
  showAwards: false,
  showSocialWall: true,
  // "Your Dream Day" pinned storyboard scenes (§11 §5) — CMS-driven copy.
  storyboard: {
    eyebrow: "Your dream day",
    heading: "From the first arrival to the last dance",
    scenes: [
      { title: "Arrival", caption: "Down the tree-lined drive, the manor appears.", media: "m-garden" },
      { title: "Ceremony", caption: "Vows beneath the marquee, or under open sky.", media: "m-multicultural" },
      { title: "Reception", caption: "A thousand candles, a room full of love.", media: "m-mega" },
      { title: "Golden hour", caption: "Essex evenings become forever.", media: "m-hero" },
    ],
  },
  seo: siteSettings.defaultSeo,
};
