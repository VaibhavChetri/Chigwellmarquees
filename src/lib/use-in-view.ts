"use client";

import { useEffect, useRef, useState } from "react";

/* IntersectionObserver hook driving the §3.4 scroll-in motions
   (Botanical Bloom, Editorial Rise, Signed-by-Hand). Fires once, then
   disconnects. Under reduced-motion the CSS renders the static end-state,
   so visibility toggling here is purely additive and safe. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
          break;
        }
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
