"use client";

import { useEffect, useState } from "react";

import { useEnquiry } from "@/components/layout/EnquiryDrawer";
import { cn } from "@/lib/utils";

/* STICKY MOBILE ENQUIRE BAR (§11 responsive) — appears past the hero on small
   screens; keeps "Enquire inevitable". Hidden ≥ lg (header CTA is always
   visible there). Tap target ≥ 44px. */
export function MobileEnquireBar() {
  const { open } = useEnquiry();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-announcement)] border-t border-champagne bg-ivory/95 p-3 backdrop-blur-md lg:hidden",
        "transition-transform duration-300 ease-[var(--ease-cinematic)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <button
        onClick={() => open("global-drawer")}
        className="flex min-h-12 w-full items-center justify-center rounded-[var(--radius-input)] bg-ink font-sans text-[0.82rem] uppercase tracking-[0.16em] text-ivory"
      >
        Enquire — book a free show-round
      </button>
    </div>
  );
}
