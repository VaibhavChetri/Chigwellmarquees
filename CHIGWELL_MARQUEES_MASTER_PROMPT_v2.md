# THE CHIGWELL MARQUEES — MASTER BUILD PROMPT · v2.0
### Awwwards-grade, page-by-page build constitution for Claude Code / Codex / Antigravity

> **Version 2.0** · Luxury Romantic / English-Garden-Couture marquee wedding venue · Essex, UK
> **Owner:** Product / Tech Lead · **Audience:** the coding agent that will build this site
> **Build philosophy:** This is the *constitution*. We build **one page at a time**. Every page prompt inherits Sections 0–10. Never build the whole product in one pass.
> **v2.0 references two sites the owner admires:** `thechigwellmarquees.com` (warmth, structure, palette) and `northmymms.co.uk` (botanical ornament, editorial pillars, host signature, awards, brochure CTA, Instagram wall, offers layer). The good aspects of both are now baked in — see the changelog.

---

## ✦ WHAT CHANGED IN v2.0 (read first)

Every change traces to one of the two admired sites. Source tags: **[NMP]** = North Mymms Park, **[TCM]** = current Chigwell site.

| # | Change | Source | Lands in |
|---|---|---|---|
| 1 | **Botanical line-art ornament system** — flourishes, dividers, corner accents as the signature romantic device | [NMP] | §3.6, §8 (`FlourishDivider`, `OrnamentCorner`) |
| 2 | **Script / illustrated eyebrow** flourish above section labels | [NMP] | §3.6, §8 (`ScriptEyebrow`) |
| 3 | **Host signature** (handwritten SVG) signing romantic statements — bespoke human warmth | [NMP] | §3.7, §7.2, §8 (`HostSignature`) |
| 4 | **Alternating editorial pillar blocks** (image + script eyebrow + serif heading + one romantic line + Read more) | [NMP] | §8 (`EditorialPillar`), §11 §3 |
| 5 | **Awards / accolades strip** for social proof | [NMP] | §7.5 (`Award`), §8 (`AwardsStrip`), §11 §6 |
| 6 | **Brochure download + Info & Pricing dual cards** (lead-gated brochure feeds Enquiry) | [NMP] | §7.2, §8 (`BrochureCTA`), §11 §10 |
| 7 | **Live curated Instagram / Social Wall** showcasing multicultural real weddings | [NMP] | §7.5 (`SocialPost`), §8 (`SocialWall`), §11 §11 |
| 8 | **Announcement / Offers bar + Offers nav pillar** (Special Offers, Midweek, Late Availability) | [NMP] | §6, §7.5 (`Offer`), §8 (`AnnouncementBar`), §9 |
| 9 | **"Multicultural Weddings" umbrella pillar** in nav, cultures nested inside | [NMP] | §6 (IA), §9 (manifest) |
| 10 | **Heritage storytelling layer** (Chigwell Hall history, "exclusively yours") | [NMP]+[TCM] | §2, §7.5 (`HistoryMilestone`), §9 |
| 11 | **`HomePage` singleton** so editors compose the home (hero, pillars, featured offer) | new (backend ease) | §7.5, §11 |
| 12 | **Conditional pillars** Stay / Filming — included only if Chigwell offers them | [NMP] (transferable) | §6, §9 (marked optional) |
| 13 | Kept Chigwell's warm palette, Venues (Mega/Mini/Secret Garden) structure, events taxonomy, testimonials/FAQs, SEO `/event/...` URLs, quick-contact widget | [TCM] | throughout (validated) |

> Sections 0–10 are otherwise stable from v1.0; the additions above are integrated in place. **Diff markers `▲ v2`** flag new/changed content inside each section.

---

## 0 · HOW TO USE THIS DOCUMENT

1. **Sections 0–10 are global law.** Loaded once, apply to every page. Immutable unless explicitly amended (bump the version).
2. **We ship page by page.** Build order is §9. Do **not** scaffold all pages at once. Each page = its own PR, its own prompt, its own Definition-of-Done (§12).
3. **Page 00 (Foundation + App Shell) is built first and only once** — design system, ornament system, tokens, layout shell, announcement bar, nav, footer, global providers (§8). Every later page assumes it exists.
4. **Page prompts are generated from the template in §10.** §11 (Home) is the gold standard — match its rigour for every page.
5. When handed a page prompt, respond: *plan → file tree for this page → implementation → self-review against §12*. Stop at the page boundary.

---

## 1 · THE MANDATE

**Adopt this role:** principal-level front-end engineer who has shipped Awwwards Site-of-the-Day winners *and* enforces FAANG-grade engineering rigour. You care equally about cinematic beauty and Core Web Vitals, and you never trade one for the other.

**Mission in one line:**
> Make the website finally *worthy of the Instagram* — a site that feels like a film about a wedding, with the romantic editorial soul of North Mymms Park and the warmth of Chigwell Hall.

**The bar:** every page is a credible Awwwards SOTD submission *and* scores ≥ 95 Lighthouse mobile within the §5 budgets. Beauty that janks is a failure; speed that's ugly is a failure.

**Emotional target words:** *ultra-premium · smooth · elegant · luxurious · luxury-romantic · heritage · botanical.* Check every decision against these.

---

## 2 · BRAND BIBLE

**Who they are.** The Chigwell Marquees — a luxury marquee wedding & events venue in the grounds of **Chigwell Hall**, a **Grade II listed** manor inside **42 acres** of Essex countryside, 40 minutes from Central London, 15 minutes off the M25.

**The spaces (real product entities, §7):**
- **Mega Marquee** — up to **1,000** guests.
- **Mini Marquee** — up to **200** guests.
- **The Secret Garden** — manicured grounds for ceremonies, photography & socialising.
- Large windows, temperature control, state-of-the-art sound/lighting, staging, free parking, outdoor catering. **30–1,000** guests.

**▲ v2 — Heritage layer [NMP+TCM].** Lean into Chigwell Hall's history the way North Mymms leans into its Elizabethan house. Tree-lined arrival, the manor appearing, "exclusively yours for the day." Heritage is romance — use it in the Home intro and an About/History section.

**Cultural specialism is a headline, not a footnote.** A large share of clientele are Bangladeshi, Turkish and South-Asian families. The site must show *genuine cultural fluency* (Akd/Nikah, Holud/Mehendi, Walima, Kına Gecesi, davul & zurna, money-pinning, halay, baraat, mandap, halal catering, gender-separated seating, prayer space, 500+ guests, multi-day events) — never a generic "we welcome all cultures" page. **▲ v2:** these now sit under one **Multicultural Weddings** umbrella (nav pillar + hub), with SEO-specific sub-pages per culture. Copy specs are in the content seed (§7.6), sourced from the brief.

**▲ v2 — Commercial layer [NMP].** Add an **Offers** pillar: Special Offers, Midweek Weddings, Late Availability — surfaced in a slim announcement bar and an Offers hub. This is conversion infrastructure Chigwell currently lacks.

**▲ v2 — Conditional pillars [NMP].** North Mymms offers **Stay** (accommodation) and **Filming** (location hire). Include these for Chigwell **only if the venue actually offers them**; otherwise omit. Do not invent capabilities. (History/Heritage applies regardless.)

**Voice & tone.** Warm, prestigious, quietly confident, UK English, romantic and literary in micro-doses ("The moment you arrive…", "Happily ever after begins here…"). Photography does the talking; copy is sparse and specific. Culturally respectful and expert.

**Conversion goal.** Make *Enquire* and *Book a Viewing / Show-round* feel inevitable on every page, especially mobile.

---

## 3 · DESIGN LANGUAGE — *"English Garden Couture"*

**Concept.** Editorial, cinematic, unhurried, *botanical*. A high-end bridal magazine spread crossed with a film title sequence, dressed in hand-drawn botanical line-art. Vast negative space, oversized romantic serif headlines, full-bleed imagery as art, a whisper of gold, sage and blush as quiet accents, and delicate botanical flourishes threading the whole site together. Restraint is the luxury.

> Direction = **refined minimalism + botanical romance + cinematic motion**. Not maximalism. Elegance from spacing, typography, ornament, and one or two perfect moments per page.

### 3.1 Colour tokens (Chigwell's warm manor palette, refined)
```css
/* Canvas */ --ivory:#FBF7F0; --parchment:#F3EBDD; --sand:#E7DCC9;
/* Ink */    --ink:#211D17;  --ink-soft:#4A4339;  --taupe:#8B8170;
/* Gold (primary accent — deliberate, never fill-spam) */
--gold:#B08D4F; --champagne:#D8C39B; --gold-deep:#8A6D34;
/* Sage (English-garden secondary) */
--sage:#8E9B82; --sage-deep:#5E6B52; --sage-light:#C3CDB6;
/* Blush (romantic whisper) */
--blush:#E6C9C1; --rose:#C99A91; --rose-deep:#A9756C;
/* System */ --focus-ring:#8A6D34; --overlay:color-mix(in oklab,var(--ink) 55%,transparent);
```
**Contrast law:** body text ≥ 4.5:1, large ≥ 3:1 (WCAG 2.2 AA). Gold-on-ivory decorative only unless it passes.

### 3.2 Typography
- **Display:** **Fraunces** (variable serif, optical sizing, romantic italic). Upgrade path: *Canela / GT Super*.
- **UI/body:** **Geist Sans** (clean, fast, neutral). No Inter/Roboto/Arial.
- **Romantic accent:** *Fraunces italic* for quotes & couple names.
- **▲ v2 — Script accent [NMP]:** a refined script for the *script eyebrow* and host signature only — **Pinyon Script** (or hand-lettered SVG). Use sparingly, set small, in `--gold`. Never for paragraphs.
- **Eyebrows/labels:** Geist Sans, uppercase, `letter-spacing:0.18em`, small, taupe — *or* the script-eyebrow flourish (§3.6) for romantic sections.
- Load via `next/font` (self-hosted, subset, `display:swap`, preload hero face only).

**Fluid type scale (clamp):**
```
--step--1:clamp(.83rem,.79rem+.18vw,.94rem)  --step-0:clamp(1rem,.95rem+.25vw,1.13rem)
--step-1:clamp(1.33rem,1.22rem+.6vw,1.78rem) --step-2:clamp(1.78rem,1.5rem+1.4vw,2.84rem)
--step-3:clamp(2.37rem,1.9rem+2.6vw,4.5rem)  --step-4:clamp(3.16rem,2.2rem+5vw,7.1rem)
--step-5:clamp(4.2rem,2.4rem+9vw,11rem)
```

### 3.3 Spacing, radius, elevation, texture
- **Spacing:** 8px base; section padding `clamp(6rem,12vh,11rem)`. Luxury = air.
- **Radius:** architectural/sharp; `2–4px` on inputs/cards only.
- **Elevation:** warm, whisper-soft shadows (`0 30px 60px -30px rgba(33,29,23,.25)`).
- **Texture:** invisible film grain (`opacity ≤ .04`), subtle paper/linen noise on parchment, faint hero vignette.
- **Lines:** gilded hairlines (`1px` `--champagne`) as editorial rules.

### 3.4 Motion language (cinematic, never gratuitous)
One or two orchestrated moments per page beat a thousand micro-wiggles. **All motion respects `prefers-reduced-motion`** (static equivalents required).
- **Curtain Reveal** — hero media unveiled centre-out via `clip-path`.
- **Marquee Drift** — slow hero parallax (≤ 8%).
- **Editorial Rise** — line-by-line headline reveal (GSAP SplitText, mask up).
- **Gilded Underline** — gold underline draws on link/nav hover.
- **Magnetic Enquire** — primary CTA tracks cursor (desktop, ≤ 6px).
- **▲ v2 — Botanical Bloom** — ornament SVGs draw on via `stroke-dashoffset` / GSAP DrawSVG when scrolled into view.
- **▲ v2 — Signed by Hand** — host signature strokes itself in beneath statement blocks.
- **Pinned Storyboard** — "Your Dream Day" pins and advances on scroll.
- **Page transition** — cross-fade + 1.02→1 scale via View Transitions API.
Easing `cubic-bezier(.16,1,.3,1)`; reveals 0.6–1.1s, micro 0.2–0.35s; stagger 60–90ms.

### 3.5 Art direction
Source golden-hour, dusk-marquee, tablescape, candid-couple frames from the official site & Instagram. Full-bleed art crops, one consistent warm grade. Pipeline: AVIF/WebP, responsive `srcset`, LQIP blur, `priority` on hero only, lazy everything else. Hero **video** = adaptive HLS (Mux), muted/loop, poster, `preload=metadata`, image + reduced-motion fallback.

### ▲ v2 — 3.6 THE BOTANICAL ORNAMENT SYSTEM [NMP]
The thread that ties the whole site together and reads as *romantic, hand-made luxury*.
- **Assets:** a small library of hand-drawn botanical **SVG line-art** (sprigs, laurels, single stems, corner vines, a centred flourish). Stored **in code** as design-system assets (`/components/ornaments/`), not in the CMS.
- **Stroke:** `--champagne` or `--sage` hairline (`1–1.5px`), never filled; occasionally a soft `--gold` fill at low opacity for a featured flourish.
- **Usage (sparingly, intentionally):**
  - `FlourishDivider` — a centred botanical flourish between major sections (replaces plain rules at key beats).
  - `OrnamentCorner` — delicate vine in hero/card corners.
  - `ScriptEyebrow` — the *illustrated/script* eyebrow above section labels (e.g. a tiny sprig + "Marquee Wedding Venue" in Pinyon Script gold).
- **Motion:** **Botanical Bloom** draw-on. **a11y:** all ornaments `aria-hidden`, decorative, must not cause CLS, suppressed under reduced-motion (render static).
- **Rule of restraint:** at most one hero flourish + one divider flourish per viewport. Ornament should feel discovered, not decorated.

### ▲ v2 — 3.7 HOST SIGNATURE [NMP]
A handwritten-style signature (e.g. *"Lynn Goodman"* on NMP) lends bespoke human warmth. For Chigwell, the events lead/owner signs the welcome statement and key romantic blocks.
- **Implementation:** an SVG signature (preferred, draws on via **Signed by Hand**) or Pinyon Script as fallback, in `--ink-soft`/`--gold`.
- **Data:** `SiteSettings.hostSignature { name, role, signatureMedia }` (§7.2) — editable, never hard-coded.
- **Placement:** beneath the Home heritage intro, the About story, and optionally the closing enquiry band.

### 3.8 The "wow" doctrine
Each page earns **one** signature moment (storyboard, blooming flourish, magnetic CTA, hand-signed welcome). Everything else is calm. Never stack two competing spectacles in one viewport.

---

## 4 · TECH STACK (latest, fast, buttery-smooth)

Pin **latest stable**; don't substitute without cause.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (latest, App Router, RSC, PPR, Turbopack)** | Near-zero client JS by default; streams static shell; first-class image/font/metadata. |
| UI runtime | **React 19** | Server Components, Actions, transitions. |
| Language | **TypeScript 5.x `strict`** | Type-safety = integration-safety. |
| Styling | **Tailwind CSS v4 (`@theme`, Oxide)** | Tokens as native CSS vars; tiny & fast. |
| Animation | **Motion (motion.dev)** + **GSAP + ScrollTrigger + SplitText + DrawSVG** | Motion for micro-interactions; GSAP for storyboards & **Botanical Bloom**. |
| Smooth scroll | **Lenis** | The signature buttery feel; pairs with ScrollTrigger. |
| Carousels | **Embla** | Light, accessible galleries. |
| Media | **Mux** (adaptive video) + **next/image** (or Cloudinary) | Cinematic hero video without jank. |
| **CMS / data** | **Payload v3** (in-repo, **Postgres**) | *Backend-integration win:* auto REST **+** GraphQL **+** typed Local API + generated TS types, same repo, real admin UI. **Alt:** Sanity. |
| Forms | **React Hook Form + Zod** via **Server Actions** | One schema validates client+server+DB. |
| Email | **Resend** + React Email | Enquiry notify + auto-reply + brochure delivery. |
| Spam | **Cloudflare Turnstile** + honeypot + rate-limit | Protect enquiry/brochure endpoints. |
| ▲ v2 Social wall | **CMS-curated `SocialPost` collection** (optional live IG sync) | Instagram wall that never breaks when the API changes. |
| 360 / tour | **`@photo-sphere-viewer`** or **Matterport** embed | Virtual tour of marquees & grounds. |
| Maps | **Mapbox GL** (luxe custom style) | Directions, on-brand. |
| SEO | **next-sitemap**, JSON-LD, **next/og** | "wedding venue Essex" etc. |
| Hosting | **Vercel** (Edge, ISR, image opt, Speed Insights) | Fast global delivery. |
| Analytics | **Vercel Analytics + Speed Insights**; **Plausible** | Vitals + privacy. |
| Testing | **Vitest + RTL**, **Playwright** (E2E + visual), **axe-core** | Quality gates. |
| Component lab | **Storybook** | Build/review in isolation. |
| CI | **GitHub Actions** | lint → typecheck → test → Lighthouse CI → build. |

> **On the brief's component libraries (21st.dev, 60fps.design, Aceternity) and the Webflow MCP:** North Mymms is built on Webflow — admire the *aesthetic*, but we ship Next.js for speed/control. Harvest *ideas and motion patterns*; never paste un-audited dependencies. A wiggle that costs 60KB does not ship.

---

## 5 · ENGINEERING STANDARDS (Google / Meta / Amazon-aligned)

**Architecture**
- **RSC by default;** `'use client'` only at the smallest interactive leaf. Lean client bundles.
- **Feature/atomic structure**, co-located tests/stories:
  ```
  src/
    app/                    routes, route groups, metadata
    components/
      primitives/           Button, LinkGilded, Eyebrow, Field, MediaFrame…
      ornaments/            ▲ v2 botanical SVGs + FlourishDivider, OrnamentCorner, ScriptEyebrow
      sections/             Hero, EditorialPillar, VenueTriptych, Storyboard, AwardsStrip,
                            BrochureCTA, SocialWall, EnquiryBand…
      layout/               Header, Footer, MegaMenu, AnnouncementBar, SmoothScroll, Cursor
    lib/                    cms client, motion presets, seo, validators (zod), utils
    content/                seed content + copy specs (§7.6)
    styles/                 tokens.css, globals.css
    payload/                collections, fields, access, hooks
  tests/ e2e/               Playwright
  ```
- **Single source of truth for tokens** (`styles/tokens.css` → Tailwind `@theme`); no hard-coded hex in components.
- **Motion presets centralised** in `lib/motion.ts`.

**Quality gates (CI-enforced)**
- TS `strict`, **no `any`**, no unchecked non-null assertions.
- ESLint (`eslint-config-next` + `typescript-eslint` strict + a11y + import-order) + Prettier; zero-warning policy.
- **A11y WCAG 2.2 AA:** semantic landmarks, one `h1`/page, logical headings, visible focus, full keyboard, `prefers-reduced-motion`, alt text, labelled forms, **all ornaments `aria-hidden`**. axe-core zero violations.
- **Testing:** Vitest+RTL (logic/primitives), Playwright (enquiry/brochure flows, nav, visual snapshots/page).
- **Conventional Commits**, trunk-based, small PRs, required review + green CI.

**Performance budgets (mobile, 4G — hard limits)**
- **LCP ≤ 2.0s · INP ≤ 200ms · CLS ≤ 0.05 · TTFB ≤ 0.6s**
- Initial route JS ≤ **~180KB** gz; lazy/split galleries, maps, 360, video, **social wall**.
- AVIF/WebP + correct `sizes` + explicit dimensions; blur placeholders.
- Fonts via `next/font`, subset, preload hero face; `font-display:swap`.
- GSAP/Lenis/DrawSVG deferred to idle/post-hydration; never block hero paint.
- **Lighthouse ≥ 95** all four categories; Lighthouse CI gates the PR.

**SEO**
- Per-route `generateMetadata` (title, description, canonical, OG via next/og).
- **JSON-LD:** `LocalBusiness`/`EventVenue` (sitewide), `FAQPage`, `BreadcrumbList`, `Review`/`AggregateRating`, `Offer` ▲ v2, `Event`.
- `sitemap.xml` + `robots.txt`; clean URLs (§6).
- Target terms in headings/copy/alt: *wedding venue Essex, marquee wedding Chigwell, Asian/Bangladeshi/Turkish wedding venue Essex, corporate events Essex, midweek wedding offers Essex* ▲ v2.

---

## 6 · INFORMATION ARCHITECTURE & ROUTES ▲ v2

Restructured to North Mymms' clarity while preserving Chigwell's SEO URLs.

**Global chrome ▲ v2:** a slim, dismissible **Announcement Bar** above the header (featured offer → `/offers`).

**Primary nav (mega-menu):**
```
Home
Weddings        ▸ Weddings · Multicultural Weddings · Real Weddings
Venues          ▸ Mega Marquee · Mini Marquee · Secret Garden
Events          ▸ Corporate · Parties · Birthdays · Civil Ceremony · Engagement
Offers ▲ v2     ▸ Special Offers · Midweek Weddings · Late Availability
Gallery
About           ▸ Our Story · Heritage · FAQs
Contact         (+ standout "Enquire" CTA, always visible)
```

**Route table:**
```
/                                  Home
/weddings                          Weddings (Occasion)
/multicultural-weddings            ▲ v2 Multicultural umbrella HUB (links all cultures)
/event/asian-weddings              Asian umbrella (SEO URL kept)            ─┐
/event/bangladeshi-weddings        Bangladeshi (SEO URL, brief copy)         │ ONE OccasionTemplate,
/event/turkish-weddings            Turkish (SEO URL, brief copy)             │ content-driven; all
/event/hindu-weddings              Hindu (SEO URL, brief copy)               │ reachable from the hub
/venues                            Venues index
/venue/mega-marquee                Venue detail   ─┐
/venue/mini-marquee                Venue detail    ├─ ONE VenueTemplate
/venue/secret-garden               Venue detail   ─┘
/events                            Events / Occasions index
/event/corporate-events            Occasion        ─┐
/event/parties                     Occasion         ├─ same OccasionTemplate
/event/birthdays                   Occasion         │
/event/civil-ceremony              Occasion         │
/event/engagement-parties          Occasion        ─┘
/offers                            ▲ v2 Offers hub
/offers/[slug]                     ▲ v2 Offer detail (special/midweek/late-availability/seasonal)
/real-weddings                     Real Weddings index ─┐ index + [slug] detail
/real-weddings/[slug]              Real wedding story  ─┘
/gallery                           Filterable gallery (Weddings/Asian/Corporate/Grounds/Marquees)
/testimonials                      Testimonials
/virtual-tour                      360° marquees & grounds
/about                             ▲ v2 Our Story (+ heritage section, host signature)
/history                           ▲ v2 Heritage of Chigwell Hall (optional standalone; else folds into /about)
/faqs                              FAQs
/contact                           Contact + map + find-us + availability
/enquire                           Full-page enquiry (shares the global drawer)
/floor-plans   (optional)          ▲ v2 Aggregated marquee floor plans
/stay          (conditional)       ▲ v2 Accommodation — ONLY if offered
/filming       (conditional)       ▲ v2 Location hire — ONLY if offered
```
**Brochure ▲ v2:** not a page — a lead-gated download (capture email → creates `Enquiry` source `brochure` → Resend delivers PDF). Surfaced via `BrochureCTA`.

**Architectural decision (unchanged from v1, reinforced):** venue & occasion pages are **two templates** (`VenueTemplate`, `OccasionTemplate`) rendered from CMS content. New culture/offer page later = a content record, not a deploy. Cultural depth lives in *content*, not components.

---

## 7 · DATA ARCHITECTURE — BACKEND-READY (non-negotiable)

> **Law:** every page is built against typed models *first*. No page hard-codes copy/media. UI consumes interfaces; backend fills them.

### 7.0 Conventions
camelCase fields (Payload → snake_case Postgres). Every doc: `id` (uuid), `slug` (unique kebab), `status` (`'draft'|'published'`), `seo`, `createdAt`, `updatedAt` (ISO 8601 UTC). Enums = string-literal unions. Media = `MediaRef` (never raw URLs). Locale-ready (`en-GB` default). Generated TS types are the shared contract.

### 7.1 Core types
```ts
type ID=string; type ISODate=string; type Slug=string;
interface Seo { title:string; description:string; ogImage?:MediaRef; keywords?:string[]; noindex?:boolean; }
interface MediaAsset { id:ID; type:'image'|'video'|'file'; url:string; alt:string; width?:number; height?:number; blurDataURL?:string; posterUrl?:string; credit?:string; tags?:string[]; }
type MediaRef=ID;
interface Cta { label:string; href:string; style?:'primary'|'ghost'; }
type RichText=unknown; // Payload/Lexical or Sanity Portable Text
```

### 7.2 `SiteSettings` (singleton) ▲ v2
```ts
interface SiteSettings {
  id:ID;
  brandName:string;
  contact:{ phone:string; email:string; address:string; mapLat:number; mapLng:number; };
  social:{ instagram?:string; facebook?:string; tiktok?:string; youtube?:string; pinterest?:string; };
  primaryNav:NavItem[]; footerNav:NavItem[];
  defaultSeo:Seo;
  enquiryRecipients:string[];
  // ▲ v2
  announcement?:{ enabled:boolean; message:string; cta:Cta; featuredOffer?:ID; }; // -> Offer
  hostSignature?:{ name:string; role:string; signatureMedia?:MediaRef; };          // §3.7
  brochure?:{ file:MediaRef; gated:boolean; };                                     // §11 §10
  awards?:ID[];                                                                    // -> Award[]
}
interface NavItem { label:string; href:string; children?:NavItem[]; }
```

### 7.3 `Venue`
```ts
interface Venue { id:ID; slug:Slug; status:'draft'|'published';
  name:string; tagline:string; capacity:{min:number;max:number};
  intro:string; body:RichText; heroMedia:MediaRef; gallery:MediaRef[];
  specs:{label:string;value:string}[]; features:string[];
  floorPlan?:MediaRef; virtualTour?:{type:'360'|'matterport';url:string};
  seo:Seo; createdAt:ISODate; updatedAt:ISODate; }
```

### 7.4 `Occasion` (weddings + cultural + every event page)
```ts
interface Occasion { id:ID; slug:Slug; status:'draft'|'published';
  kind:'wedding'|'cultural-wedding'|'corporate'|'party'|'ceremony';
  culture?:'asian'|'bangladeshi'|'turkish'|'hindu';   // ▲ v2 for the multicultural hub
  title:string; heroHeadline:string; heroSubheading:string; heroMedia:MediaRef;
  intro:RichText; sections:OccasionSection[];
  facilities?:string[]; whyChooseUs?:string[];
  featuredTestimonial?:ID; gallery:MediaRef[]; relatedRealWeddings?:ID[];
  cta:Cta; seo:Seo; createdAt:ISODate; updatedAt:ISODate; }
interface OccasionSection { heading:string; body:RichText; media?:MediaRef[]; list?:string[];
  layout:'text'|'split'|'gallery'|'feature-list'; }
```
> Brief copy specs (Bangladeshi/Turkish/Asian/Hindu) map onto `sections[]`: Understanding → Catering → Décor & Styling → Facilities → Why families choose us → Testimonial → CTA. Authored once as content.

### 7.5 Content models ▲ v2 (RealWedding, Testimonial, Faq, GalleryItem + new)
```ts
interface RealWedding { id:ID; slug:Slug; status:'draft'|'published';
  coupleNames:string; date:ISODate;
  culture?:'bangladeshi'|'turkish'|'asian'|'hindu'|'western'|'other';
  venue:ID; guestCount?:number; story:RichText; heroMedia:MediaRef; gallery:MediaRef[];
  suppliers?:{role:string;name:string;url?:string}[]; testimonial?:ID;
  seo:Seo; createdAt:ISODate; updatedAt:ISODate; }

interface Testimonial { id:ID; quote:string; author:string; context?:string;
  rating?:1|2|3|4|5; source?:'google'|'instagram'|'direct'; media?:MediaRef;
  occasionKind?:Occasion['kind']; }

interface Faq { id:ID; question:string; answer:RichText; category:string; order:number; }

interface GalleryItem { id:ID; media:MediaRef;
  category:('weddings'|'asian'|'corporate'|'parties'|'grounds'|'marquees')[]; realWedding?:ID; }

// ▲ v2 NEW
interface Offer { id:ID; slug:Slug; status:'draft'|'published';
  title:string; kind:'special'|'midweek'|'late-availability'|'seasonal';
  summary:string; details:RichText; heroMedia:MediaRef; terms?:RichText;
  badgeLabel?:string; validFrom?:ISODate; validUntil?:ISODate;
  featured:boolean;            // surfaces in the Announcement Bar
  cta:Cta; seo:Seo; createdAt:ISODate; updatedAt:ISODate; }

interface SocialPost { id:ID; media:MediaRef; permalink:string; caption?:string;
  culture?:RealWedding['culture']; featured:boolean; order:number; }   // CMS-curated IG wall

interface Award { id:ID; title:string; awardingBody:string; year?:number;
  logo:MediaRef; url?:string; order:number; }

interface HistoryMilestone { id:ID; year:string; title:string; body:RichText;
  media?:MediaRef; order:number; }                                     // heritage timeline

// ▲ v2 — editors compose the home page
interface HomePage { id:ID;
  hero:{ media:MediaRef; eyebrow:string; headline:string; subheading:string; primaryCta:Cta; secondaryCta:Cta; };
  intro:RichText; signedBy?:ID;          // host signature via SiteSettings
  pillars:ID[];                          // -> Occasion[] for editorial pillar blocks
  featuredVenues:ID[];                   // -> Venue[] (triptych)
  featuredRealWeddings:ID[];
  featuredTestimonials:ID[];
  featuredOffer?:ID;                     // -> Offer
  showAwards:boolean; showSocialWall:boolean;
  seo:Seo; }
```

### 7.6 `Enquiry` — live backend contract
```ts
interface Enquiry { id:ID; name:string; email:string; phone?:string;
  eventType:Occasion['kind']|'unsure'; eventDate?:ISODate; guestCount?:number;
  venuePreference?:'mega-marquee'|'mini-marquee'|'secret-garden'|'unsure';
  message?:string;
  source:'enquiry-page'|'global-drawer'|'contact-page'|'occasion-cta'|'offer'|'brochure'; // ▲ v2
  consent:boolean; status:'new'|'contacted'|'booked'|'archived'; createdAt:ISODate; }
```
**API**
- `POST /api/enquiries` → Zod-validated → Turnstile + honeypot + rate-limit → persist → Resend notify + auto-reply (and **deliver brochure PDF if `source:'brochure'`**) → `201 {id,status:'new'}`. Errors `422`/`429`.
- `GET /api/availability?from=&to=` → `AvailabilitySlot[]` (`{date,status:'available'|'provisional'|'booked'}`) — own collection, future-syncable to the real booking system.

---

## 8 · GLOBAL APP SHELL (Page 00 — built once, before any content page) ▲ v2

Deliverables:
- **Token + ornament layer:** `tokens.css`, Tailwind `@theme`, resets, grain/noise, fonts via `next/font` (incl. Pinyon Script for script eyebrow/signature). **Botanical SVG library** in `/components/ornaments/`.
- **Primitives (Storybook):** `Button` (primary/ghost + Magnetic), `LinkGilded`, `Eyebrow`, `Field/Select/Textarea`, `Tag`, `SectionShell`, `RevealText`, `MediaFrame`.
- **▲ v2 Ornament components:** `FlourishDivider`, `OrnamentCorner`, `ScriptEyebrow`, `HostSignature` (Botanical Bloom + Signed-by-Hand motion, reduced-motion static).
- **Layout shell:** `RootLayout` with `<SmoothScrollProvider>` (Lenis), `<CustomCursor>` (desktop, reduced-motion-aware), View-Transitions wiring, skip-link, `<main id="main">`.
- **▲ v2 `AnnouncementBar`:** slim, dismissible (cookie/localStorage), reads `SiteSettings.announcement`/featured `Offer`.
- **Header:** transparent over hero → solidifies (ivory + blur) on scroll; logo, mega-menu (Weddings/Venues/Events/**Offers**/About), phone, standout **Enquire** CTA. Mobile = full-screen elegant overlay with botanical flourish.
- **Footer:** sitemap nav, contact, socials, **brochure download**, newsletter (optional), legal, enquiry CTA band, a `FlourishDivider`.
- **Global Enquiry Drawer** → `POST /api/enquiries`; reusable from any CTA.
- **▲ v2 Shared sections:** `EditorialPillar`, `AwardsStrip`, `BrochureCTA`, `SocialWall` (lazy), `OfferBadge` — built here, consumed by pages.
- **Cookie/consent** (GDPR), `error.tsx`, `not-found.tsx`, `loading.tsx` (elegant skeletons), global SEO defaults + JSON-LD `LocalBusiness`.
- **`lib/motion.ts`, `lib/cms.ts` (typed), `lib/seo.ts`.**

Ships when Storybook renders all primitives + ornaments, the shell passes axe + Lighthouse, the announcement bar reads a stub offer, and the enquiry drawer round-trips.

---

## 9 · PAGE MANIFEST (build order) ▲ v2

| # | Page | Route | Depends | Scope |
|---|---|---|---|---|
| 00 | **Foundation + App Shell** | global | — | Tokens, ornament system, primitives, layout, **announcement bar**, mega-menu, footer, drawer, shared sections (§8). |
| 01 | **Home** | `/` | 00 | Announcement bar → cinematic hero → heritage intro **+ host signature** → **editorial pillars** → venue triptych → "Your Dream Day" storyboard → **awards strip** → real-weddings teaser → multicultural feature → testimonials → **brochure + pricing cards** → **Instagram/social wall** → enquiry band. *(Worked in §11.)* |
| 02 | **Venue template + Mega Marquee** | `/venue/mega-marquee` | 00 | Build `VenueTemplate`; render Mega from CMS. |
| 03 | **Mini Marquee + Secret Garden** | `/venue/mini-marquee`, `/venue/secret-garden` | 02 | Two content records, same template. |
| 04 | **Venues index** | `/venues` | 02 | Editorial overview of the three spaces. |
| 05 | **Occasion template + Weddings** | `/weddings` | 00 | Build `OccasionTemplate`; render Weddings. |
| 06 | **▲ Multicultural umbrella hub** | `/multicultural-weddings` | 05 | Editorial hub linking all cultures; botanical, inclusive, specific. |
| 07 | **Asian Weddings** | `/event/asian-weddings` | 05,06 | Content record (SEO URL kept). |
| 08 | **Bangladeshi Weddings** | `/event/bangladeshi-weddings` | 05,06 | Content record (brief copy spec §7.6). |
| 09 | **Turkish Weddings** | `/event/turkish-weddings` | 05,06 | Content record (brief copy spec). |
| 10 | **Hindu Weddings** | `/event/hindu-weddings` | 05,06 | Content record (brief copy spec). |
| 11 | **Other occasions** | corporate, parties, birthdays, civil-ceremony, engagement | 05 | Content records, same template. |
| 12 | **Events index** | `/events` | 05 | Filterable grid of occasions. |
| 13 | **▲ Offers hub + Offer detail** | `/offers`, `/offers/[slug]` | 00 | `Offer`-driven; midweek/late-availability/special; feeds announcement bar + `Offer` JSON-LD. |
| 14 | **Gallery (filterable)** | `/gallery` | 00 | Masonry + filters + lightbox. |
| 15 | **Real Weddings (index + detail)** | `/real-weddings`, `/real-weddings/[slug]` | 00 | Story index + cinematic case study. |
| 16 | **Testimonials** | `/testimonials` | 00 | Editorial wall + `Review` JSON-LD. |
| 17 | **Virtual Tour** | `/virtual-tour` | 00 | 360°/Matterport, lazy-loaded. |
| 18 | **Contact + Availability + Find-us** | `/contact` | 00 | Map, details, availability calendar, enquiry. |
| 19 | **▲ About + Heritage + FAQs** | `/about`, `/history`, `/faqs` | 00 | Story of Chigwell Hall + `HistoryMilestone` timeline + host signature + FAQ accordion (`FAQPage` JSON-LD). |
| 20 | **Enquire** | `/enquire` | 00 | Full-page enquiry; shares drawer logic. |
| 21 | **Floor plans** (optional) | `/floor-plans` | 02 | Aggregated `Venue.floorPlan`. |
| 22 | **Stay / Filming** (conditional) | `/stay`, `/filming` | 00 | Only if Chigwell offers them. |

---

## 10 · PER-PAGE PROMPT TEMPLATE (pages 02–22)

> Prefix every page: *"Inherit the Chigwell Marquees Master Prompt v2.0 §0–10. Build only this page; stop at its boundary. Use the botanical ornament system (§3.6) and host signature (§3.7) where it elevates, never decoratively."*

```
PAGE: <name> — ROUTE(S): <route(s)>
GOAL: <emotional + conversion outcome>
DATA: <§7 models read; new fields → amend §7>
SECTIONS (top→bottom):
  1. <section> — content, layout, ornament use, the ONE signature motion beat, data source
  2. …
SIGNATURE MOMENT: <the single memorable thing>
COMPONENTS: <reuse from §8 / new section components>
RESPONSIVE: <mobile-first; md/lg changes>
A11Y: <page-specific>
SEO: <title, description, JSON-LD type, target terms>
PERF: <heavy assets + deferral/optimisation>
DONE-WHEN: <criteria beyond §12>
```

---

## 11 · PAGE 01 — HOME *(fully worked — paste-ready, v2)*

> **Prompt:** Inherit the Master Prompt v2.0 §0–10. Build **only the Home page** (`/`). Plan → file tree → implement → self-review vs §12. Compose entirely from the `HomePage` singleton + referenced records — zero hard-coded copy/media.

**GOAL.** In 3 seconds: luxury, romance, English-countryside grandeur. Feel like the opening of a film, threaded with botanical romance, signed by a real human. Make *Enquire* inevitable.

**DATA.** `HomePage`, `SiteSettings` (announcement, hostSignature, brochure, awards), `Occasion[]` (pillars), `Venue[]` (triptych), `RealWedding[]`, `Testimonial[]`, featured `Offer`, `SocialPost[]`, `Award[]`. All from CMS.

**SECTIONS (top → bottom):**

0. **▲ Announcement Bar [NMP].** Slim, dismissible, warm parchment, gilded hairline; featured `Offer` ("Special Offers & Last-Minute Wedding Deals →"). Reads `SiteSettings.announcement`.

1. **Hero — full-bleed cinematic.** Mux HLS golden-hour marquee/grounds video (muted/loop), image + reduced-motion fallback, vignette + grain, **`OrnamentCorner`** vine top-corner. `ScriptEyebrow` ("Luxury Marquee Wedding Venue · Chigwell Hall, Essex"), Fraunces monument headline (`--step-5`, leading .95) e.g. *"Where Essex evenings become forever."*, one-line subhead, **Magnetic Enquire + ghost Book a Viewing**. **Motion: Curtain Reveal + Editorial Rise + Marquee Drift.** Scroll cue. (LCP = poster, `priority`.)

2. **▲ Heritage intro + Host Signature [NMP].** Generous whitespace; romantic storytelling — tree-lined arrival, Chigwell Hall (Grade II, 42 acres, 40 min from London, 30–1,000 guests), "exclusively yours." Fraunces lead + `ScriptEyebrow`. Closes with the **`HostSignature`** (Signed-by-Hand draw-on). **`FlourishDivider`** beneath.

3. **▲ Editorial Pillar Blocks [NMP].** Alternating left/right full-width image + `ScriptEyebrow` + Fraunces heading + one romantic line + gilded **Read more**, with a botanical accent. Pillars from `HomePage.pillars`: **Weddings**, **Multicultural Weddings**, **Corporate & Events** (+ optional Filming/Stay if offered). Botanical Bloom on scroll-in; 80ms stagger.

4. **Venue triptych.** Three `MediaFrame` cards (Mega / Mini / Secret Garden) — capacity, tagline, gilded-underline link; hover image scale 1.03 + caption rise. Data `Venue[]`.

5. **"Your Dream Day" — Pinned Storyboard.** GSAP ScrollTrigger pins; advances Arrival → Ceremony → Reception → Golden hour, Fraunces captions. **The page's signature cinematic moment.** Reduced-motion = stacked sequence.

6. **▲ Awards strip [NMP].** "Host your celebration at our award-winning venue" + `Award` logos, muted/monochrome on parchment. Quiet social proof.

7. **Real Weddings teaser.** Editorial 3-up (couple names in Fraunces italic, culture tag, thumbnail) → `/real-weddings`. Data `RealWedding[]`.

8. **▲ Multicultural feature [NMP].** Confident band — *"We speak the language of your celebration."* Botanical frame; specific micro-copy (halal catering, prayer space, 500+ guests, baraat, holud, davul & zurna) → `/multicultural-weddings`. Data `Occasion` (culture).

9. **Testimonials.** One/two large Fraunces-italic pull-quotes on grained parchment; author + context; fade/blur-in. Data `Testimonial[]`.

10. **▲ Brochure + Info & Pricing dual cards [NMP].** Two icon-led cards: **Download Brochure** (lead-gated → `POST /api/enquiries` source `brochure` → Resend delivers PDF) and **Info & Pricing** (→ enquiry drawer). Botanical icon flourishes.

11. **▲ Instagram / Social Wall [NMP].** Lazy-loaded curated grid of `SocialPost[]` — lead with multicultural real weddings (mandap, holud, henna night) to mirror their strongest asset → links to IG. Hover: subtle zoom + caption.

12. **Enquiry band.** Warm close — *"Tell us about your day."* Opens the global drawer (or inline mini-form → API). Reassurance line (free show-round). Optional closing `HostSignature`.

**SIGNATURE MOMENT:** the pinned "Your Dream Day" storyboard (people screenshot it); the blooming botanical ornaments and hand-signed welcome are the supporting soul.

**COMPONENTS:** reuse `Hero`, `MediaFrame`, `SectionShell`, `RevealText`, `Button`(Magnetic), `LinkGilded`, `Eyebrow`, `ScriptEyebrow`, `FlourishDivider`, `OrnamentCorner`, `HostSignature`, `EnquiryDrawer`, `EditorialPillar`, `AwardsStrip`, `BrochureCTA`, `SocialWall`; new: `VenueTriptych`, `DreamDayStoryboard`, `RealWeddingsTeaser`, `MulticulturalFeature`, `AnnouncementBar` (from §8), `TestimonialPullQuote`.

**RESPONSIVE:** mobile-first. Hero video → poster on save-data/slow links. Editorial pillars stack image-over-text on mobile. Storyboard = vertical stacked scenes (no pin) on mobile. Triptych 1→3 cols at `lg`. Social wall 2→3→4 cols. Sticky bottom **Enquire** on mobile. Ornaments scale down / reduce count on small screens. Tap targets ≥ 44px.

**A11Y:** one `h1` (hero); video `aria-hidden` + text equivalent; **all ornaments + signature `aria-hidden`**; storyboard readable without scroll-jacking under reduced-motion; brochure form fully labelled; CTAs keyboard-reachable with `--focus-ring`.

**SEO:** `generateMetadata` → *"Luxury Marquee Wedding Venue in Essex | The Chigwell Marquees"* + description + dynamic OG. JSON-LD `LocalBusiness` + `EventVenue` (+ `Offer` if a featured offer is shown). Target: *wedding venue Essex, marquee wedding Chigwell, luxury/Asian wedding venue Essex.*

**PERF:** hero poster `priority`; video lazy-attaches post-paint (`preload=metadata`); below-fold media + **social wall** lazy + blur; GSAP/Lenis/DrawSVG post-hydration/idle; route JS ≤ 180KB; LCP ≤ 2.0s, CLS ≤ 0.05.

**DONE-WHEN:** §12 passes + storyboard 60fps on mid-tier Android + reduced-motion verified + botanical Bloom + Signed-by-Hand verified + brochure form round-trips (email delivered) + social wall lazy-loads without CLS.

---

## 12 · DEFINITION OF DONE (every page)

- [ ] Built **only** for its scope; no scope bleed.
- [ ] All content/media from CMS via typed models (§7); **no hard-coded copy/URLs**.
- [ ] Mobile-first; flawless 360px → 1920px+; tap targets ≥ 44px.
- [ ] **Botanical ornaments + host signature used with restraint (§3.6–3.7), all `aria-hidden`, reduced-motion-safe.** ▲ v2
- [ ] `prefers-reduced-motion` path implemented and verified.
- [ ] WCAG 2.2 AA; axe-core zero violations; full keyboard; visible focus.
- [ ] Lighthouse mobile ≥ 95 all four categories; §5 budgets met.
- [ ] `generateMetadata` + correct JSON-LD + OG image.
- [ ] TS strict, ESLint/Prettier clean (zero warnings), no `any`.
- [ ] Vitest + Playwright (flow + visual snapshot) green; Storybook for new components.
- [ ] Conventional-commit PR, green CI (lint → typecheck → test → Lighthouse → build).
- [ ] The page has its **one** signature moment, running 60fps on mid-tier mobile.

---

*End of Master Prompt v2.0. Amend §0–10 only via an explicit versioned change. Pages are generated from §10, held to §12. Good aspects of `thechigwellmarquees.com` and `northmymms.co.uk` are integrated per the v2.0 changelog above.*
