/* ============================================================================
   MOTION PRESETS — §3.4 centralised (Master Prompt §5: "Motion presets
   centralised in lib/motion.ts"). Framework-agnostic tokens consumed by both
   CSS classes (globals.css) and any JS-driven motion added later (GSAP/Motion).
   All motion has a reduced-motion fallback; see useReducedMotion().
   ============================================================================ */

export const EASE_CINEMATIC = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  micro: 0.28,
  reveal: 0.85,
  curtain: 1.1,
} as const;

export const STAGGER = 0.075; // 75ms (§3.4: 60–90ms)

/** Tokens for the named §3.4 motions, kept declarative for reuse. */
export const MOTION = {
  curtainReveal: { duration: DURATION.curtain, ease: EASE_CINEMATIC },
  editorialRise: { duration: DURATION.reveal, ease: EASE_CINEMATIC, stagger: STAGGER },
  gildedUnderline: { duration: DURATION.micro, ease: EASE_CINEMATIC },
  botanicalBloom: { duration: 1.4, ease: EASE_CINEMATIC },
  signedByHand: { duration: 1.8, ease: EASE_CINEMATIC },
} as const;

/** SSR-safe reduced-motion check for client components. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
