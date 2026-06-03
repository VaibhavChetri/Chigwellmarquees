# The Chigwell Marquees

Luxury marquee wedding & events venue — Essex, UK. Built per the **Master Prompt v2.0**
(`CHIGWELL_MARQUEES_MASTER_PROMPT_v2.md`), one page at a time.

## Status

- ✅ **Page 00 — Foundation + App Shell** (this commit). Design system, botanical
  ornament system, primitives, layout shell (announcement bar, mega-menu, footer,
  global enquiry drawer), shared sections, typed data layer, API routes.
- ⏳ Page 01 (Home) onward — see the page manifest (§9) in the master prompt.

## Stack

Next.js 15 (App Router, RSC) · React 19 · TypeScript strict · Tailwind CSS v4
(`@theme`) · next/font (Fraunces / Geist / Pinyon Script) · Lenis smooth scroll · Zod.

## Architecture decisions (Page 00)

- **Data layer (§7):** every page reads typed models through `src/lib/cms.ts`. Today
  that client returns **seed content** (`src/content/seed.ts`). When **Payload v3 +
  Postgres** is wired, only `lib/cms.ts` changes — **no page touches seed data**, and
  the typed signatures are identical.
- **Third-party integrations are typed stubs:** Resend (`lib/email.ts`), Mux, Cloudflare
  Turnstile, Mapbox. The app boots and the enquiry flow round-trips with **no API keys**.
  Each stub logs in dev and has a `TODO` marking where the real call goes.
- **Tokens are the single source of truth:** `src/styles/tokens.css` → wired into Tailwind
  utilities via `@theme inline` in `globals.css`. No component hard-codes a hex.
- **Motion (§3.4)** is centralised in `lib/motion.ts` and driven by CSS classes that all
  respect `prefers-reduced-motion`. GSAP/SplitText/DrawSVG are deferred to later pages
  that need the pinned storyboard (§11 §5); the shell ships Lenis only.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — nothing below is required to boot
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` (strict, no `any`) |
| `npm run lint` | ESLint (next + a11y + import-order) |
| `npm run format` | Prettier write |

## Project structure (§5)

```
src/
  app/                routes, metadata, api/{enquiries,availability}, error/not-found/loading
  components/
    primitives/       Button, LinkGilded, Eyebrow, Field, Tag, SectionShell, RevealText, MediaFrame
    ornaments/        botanical SVGs + FlourishDivider, OrnamentCorner, ScriptEyebrow, HostSignature
    sections/         EditorialPillar, AwardsStrip, BrochureCTA, SocialWall, EnquiryBand
    layout/           Header, MegaMenu, MobileNav, AnnouncementBar, Footer, SmoothScroll, Cursor,
                      CookieConsent, EnquiryDrawer (+ provider)
  lib/                cms (typed), motion, seo, validators (zod), email (stub), utils, use-in-view
  content/            seed.ts (stands in for the CMS)
  types/              §7 models — the shared contract
  styles/             tokens.css
```

## Not yet wired (intentional, per scope)

Payload v3 + Postgres · Resend live send · Turnstile verification · Mux hero video ·
Mapbox · Storybook · Vitest/Playwright/axe CI · Lighthouse CI. These attach to the
existing typed seams without page rewrites.
