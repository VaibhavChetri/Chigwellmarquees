"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/motion";

/* Lenis smooth scroll (§4) — the signature buttery feel. Deferred to after
   hydration; fully disabled under reduced-motion (native scroll). */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    // Lazy-import so Lenis never blocks the hero paint (§5).
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
