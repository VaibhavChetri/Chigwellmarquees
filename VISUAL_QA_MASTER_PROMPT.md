# VISUAL QA & REFINEMENT — MASTER PROMPT (Playwright MCP)
### The Chigwell Marquees · one reusable loop, applicable to every page

> **What this is.** A page-agnostic refinement loop that makes Claude Code *look* at the rendered page with the Playwright MCP, score it against your design language (Playbook §3), accessibility/perf standards (§5), and the Definition of Done (§12), fix what fails, and **re-verify with fresh screenshots** before passing. Paste it once per page (set `PAGE`), or run the whole-site batch at the end.
>
> **Honest scope.** Playwright MCP is a *visual + interaction + a11y-structure* loop — it navigates, resizes, screenshots, reads the a11y tree, clicks/hovers/keys, emulates reduced-motion, reads the console, and can inject axe-core. It does **not** produce a true Lighthouse performance score — keep Lighthouse CI for the hard numbers (§5). Use this loop to catch everything you can *see and operate*; let CI catch the rest.

---

## ▶ THE MASTER PROMPT (paste this; set PAGE)

```
Inherit the Full Build Playbook §1–§12. You have the Playwright MCP connected and the dev
server running at http://localhost:3000.

TASK: Run the Visual QA & Refinement Loop on ONE page and bring it to the Pass Gate.
PAGE = "<route, e.g. / or /weddings or /venue/mega-marquee>"

Work the loop in strict order. Do not skip CAPTURE or VERIFY. Token-driven fixes only
(no stray hex, no magic numbers — use §3 tokens / lib/motion.ts). Fix only THIS page;
if a shared component must change, flag the cross-page impact before editing it.

── 1. CAPTURE ──────────────────────────────────────────────
Navigate to PAGE. Take FULL-PAGE screenshots at four viewports:
  • 390×844  (mobile)   • 768×1024 (tablet)
  • 1440×900 (desktop)  • 1920×1080 (wide)
Also capture these states (where present on the page):
  • header over hero AND header after scrolling (transparent→solid)
  • mega-menu open + mobile menu open
  • primary CTA hover, and the Enquiry drawer open
  • the page with prefers-reduced-motion EMULATED (reducedMotion: 'reduce')
Read the browser console and the accessibility-tree snapshot for each viewport.

── 2. DIAGNOSE ─────────────────────────────────────────────
Score the page against THE RUBRIC below. Output a defect table:
  | Area | Severity (P0/P1/P2) | What's wrong (cite the viewport) | Fix |
P0 = broken/illegible/inaccessible. P1 = clearly off-brand or cramped. P2 = polish.
Be specific and visual ("eyebrow fails contrast over the bright image at 1440",
not "improve hero"). If the page looks correct, say so and list only P2s.

── 3. FIX ──────────────────────────────────────────────────
Resolve all P0 + P1 (and P2 where cheap). Smallest-scope edits, tokens only.
After each meaningful change, re-screenshot the affected region.

── 4. VERIFY ───────────────────────────────────────────────
Re-run CAPTURE. Confirm every P0/P1 is resolved AND nothing regressed at any
viewport. Inject axe-core and confirm zero serious/critical violations. Confirm
the console is clean. Confirm the reduced-motion path renders static + legible.

── 5. GATE ─────────────────────────────────────────────────
Only finish when EVERY item in THE PASS GATE is true. Then output a short
before/after summary (defects found → fixed → verified) and commit:
  "fix(<page>): visual QA pass — contrast, composition, a11y, responsive".
Stop at this page's boundary. Do not touch other pages.
```

---

## ◆ THE RUBRIC (what "good" means — drawn from §3, §5, §12 + the hero lessons)

**A. Art direction & atmosphere**
- Hero/section imagery is *atmospheric with a calm negative-space zone for type* — not a busy frame that collides with the headline. One consistent warm grade across all media in view.
- Every full-bleed image carries a **scrim** strong enough for legibility: a linear-gradient ≈ `rgba(33,29,23,0.60)` (bottom) → `0.15` (top) **plus** a soft radial vignette. Text never floats on bare photo.

**B. Typography & hierarchy**
- Fraunces display at the right step (§3.2); clear H1→H2→H3 rhythm; no headline widows/orphans; body line-length 60–75ch.
- **Script eyebrow is RESTRAINED** — small (`clamp(0.95rem,0.9rem+0.3vw,1.25rem)`), constrained width (~30ch), gold, left-aligned. Never full-width Pinyon. (If it reads "wedding clipart," switch to tracked-out uppercase Geist.)
- Subheads are *styled and integrated* (cream, tracked, under the headline) — never stranded grey at the bottom.

**C. Contrast (verified, not assumed)**
- Body ≥ 4.5:1, large/headline ≥ 3:1 — **sampled over the actual image region**, at every viewport. Re-check eyebrow + headline + CTA labels specifically.

**D. Layout, spacing & grid**
- Generous section rhythm (`clamp(6rem,12vh,11rem)`); consistent alignment; nothing cramped or colliding; intentional whitespace = the luxury.

**E. Ornament restraint (§3.6)**
- Botanical flourishes are *anchored with intent* (corner/divider), max one hero + one divider flourish per viewport, never a stray floating squiggle. All `aria-hidden`.

**F. Motion (§3.4)**
- Exactly ONE signature moment per page; smooth, no jank, no scroll-jacking. `prefers-reduced-motion` path verified static + fully legible.

**G. Responsive integrity**
- No horizontal overflow at any width; no element collisions; tap targets ≥ 44px; mobile composition recomposed (not just shrunk); ornaments reduce/scale on small screens.

**H. Interaction & navigation**
- Header transparent→solid transition is jank-free; mega-menu + mobile menu + Enquiry drawer are keyboard-operable with visible focus and focus-trap; hover states present (Gilded Underline, Magnetic CTA).

**I. Conversion**
- Primary **Enquire** CTA reachable above the fold on desktop AND via a sticky affordance on mobile; secondary CTA (Book a Viewing) present where the page spec calls for it.

**J. Accessibility structure**
- Exactly one `h1`; logical heading order; landmarks present; all meaningful media has alt text; focus visible everywhere; injected axe-core = zero serious/critical; ornaments + decorative video `aria-hidden`.

**K. Performance signals (flag here; score in CI)**
- No layout shift during load (capture mid-load); below-fold media lazy; images in AVIF/WebP with explicit dimensions; no console errors; no oversized hero asset.

**L. Brand consistency**
- Tokens only — no stray hex introduced. Components and rhythm match sibling pages (a visitor shouldn't feel they changed sites between routes).

---

## ✅ THE PASS GATE (page is done only when ALL are true)
- [ ] All P0 + P1 defects fixed and **re-verified by fresh screenshot** at 390 / 768 / 1440 / 1920.
- [ ] Contrast passes over imagery for eyebrow, headline, body, and CTA labels at every viewport.
- [ ] No horizontal overflow and no element collisions at any viewport; tap targets ≥ 44px.
- [ ] One `h1`, logical headings; injected axe-core = zero serious/critical; focus visible; ornaments `aria-hidden`.
- [ ] Nav (mega-menu + mobile) and Enquiry drawer fully keyboard-operable with focus-trap.
- [ ] Primary CTA above the fold (desktop) + sticky on mobile.
- [ ] One signature motion moment present; reduced-motion path verified static + legible.
- [ ] Console clean; no CLS captured during load; below-fold media lazy; AVIF/WebP with dimensions.
- [ ] Tokens only (no stray hex); visually consistent with sibling pages.
- [ ] Before/after defect summary output; single scoped commit made.

---

## ⟳ WHOLE-SITE BATCH MODE (optional — run after individual pages are stable)

```
Inherit the Full Build Playbook §1–§12 and the Visual QA & Refinement Loop above.
Using the Playwright MCP, run the loop on EVERY page in the manifest, IN THIS ORDER,
fully passing the Pass Gate (and committing) on each before starting the next:

  /  →  /weddings  →  /multicultural-weddings  →  /event/asian-weddings  →
  /event/bangladeshi-weddings  →  /event/turkish-weddings  →  /event/hindu-weddings  →
  /venues  →  /venue/mega-marquee  →  /venue/mini-marquee  →  /venue/secret-garden  →
  /events  →  /event/corporate-events  →  /event/parties  →  /event/birthdays  →
  /event/civil-ceremony  →  /event/engagement-parties  →  /offers  →  /offers/[a real slug]  →
  /gallery  →  /real-weddings  →  /real-weddings/[a real slug]  →  /testimonials  →
  /virtual-tour  →  /contact  →  /about  →  /faqs  →  /enquire

Rules: one page at a time; never batch two. If a fix touches a SHARED component (Header,
Footer, EditorialPillar, MediaFrame, ornaments), pause, list every page it affects, fix it
once, then re-verify the affected pages before continuing. Maintain cross-page consistency
(Rubric L). After the last page, output a one-line status per page (PASS / PASS-with-P2s).
```

---

## ⚠ GUARDRAILS (so the loop improves, not thrashes)
- **Scope discipline.** Fix the current page only. Shared-component edits must be flagged with their cross-page blast radius first — these are the changes that silently break four other pages.
- **Token-only.** Every fix references §3 tokens / `lib/motion.ts`. A new hardcoded `#hexcode` or magic pixel value is itself a defect.
- **Verify or it didn't happen.** No defect is "fixed" until a fresh screenshot at the relevant viewport proves it. Re-capture is mandatory, not optional.
- **Don't gild what's broken.** Resolve P0/P1 (legibility, accessibility, overflow) before any P2 polish.
- **Reduced-motion is a first-class state**, not an afterthought — emulate and screenshot it every time.
- **Lighthouse stays in CI.** This loop flags perf *signals*; the gate for real Core Web Vitals numbers is Lighthouse CI (§5).

*Reusable across all pages. Pair with: Figma MCP (build-to-spec), Context7 MCP (correct Tailwind v4 / Motion / Payload APIs), Magic MCP (fast components).*
