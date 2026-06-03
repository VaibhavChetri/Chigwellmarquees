"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { Button } from "@/components/primitives/Button";
import { RevealText } from "@/components/primitives/RevealText";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Cta, MediaAsset } from "@/types";

type ConnectionLike = { saveData?: boolean; effectiveType?: string };

/* ============================================================================
   HERO — full-bleed cinematic (§11 §1).
   Poster is the LCP element (priority); the Mux/MP4 video lazy-attaches
   post-paint (preload=metadata). Curtain Reveal (clip-path centre-out) +
   Marquee Drift (≤8% parallax) + Editorial Rise headline. All motion is
   suppressed under reduced-motion / save-data — poster + static text remain.
   ============================================================================ */
export function Hero({
  media,
  eyebrow,
  headline,
  subheading,
  primaryCta,
  secondaryCta,
}: {
  media: MediaAsset | null;
  eyebrow: string;
  headline: string;
  subheading: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}) {
  const driftRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const poster = media?.type === "video" ? media.posterUrl : media?.url;
  const posterAlt = media?.alt ?? "";
  const isVideo = media?.type === "video" && Boolean(media.url);

  // Curtain Reveal on mount; lazy-attach the hero video after first paint.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const conn = (navigator as Navigator & { connection?: ConnectionLike }).connection;
    const saveData = Boolean(conn?.saveData) || conn?.effectiveType === "2g";

    // Trigger the reveal on the next frame so the transition runs.
    const raf = requestAnimationFrame(() => setRevealed(true));

    if (isVideo && !reduced && !saveData) {
      // Defer video attach to idle so it never competes with the LCP poster.
      const attach = () => setVideoSrc(media?.url ?? null);
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(attach);
      } else {
        setTimeout(attach, 600);
      }
    }
    return () => cancelAnimationFrame(raf);
  }, [isVideo, media?.url]);

  // Marquee Drift — slow parallax on the media layer (reduced-motion safe).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        const layer = driftRef.current;
        if (!el || !layer) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
        layer.style.transform = `translate3d(0, ${(progress * 8).toFixed(2)}%, 0) scale(1.06)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-dark-hero
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* No OrnamentCorner here (§3.6 restraint): the script eyebrow already
          carries the hero's single botanical flourish (its sprig), and the
          top-left is anchored by the brand wordmark. A corner vine stacked in
          the same zone would crowd both and read as decoration, not intent. */}

      {/* Media layer — Curtain Reveal wrapper */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-[clip-path] duration-[1100ms] ease-[var(--ease-cinematic)] motion-reduce:transition-none",
        )}
        style={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 50% 0% 50%)" }}
      >
        <div ref={driftRef} className="absolute inset-0 will-change-transform">
          {poster && (
            <Image
              src={poster}
              alt={posterAlt}
              fill
              priority
              sizes="100vw"
              placeholder={media?.blurDataURL ? "blur" : "empty"}
              blurDataURL={media?.blurDataURL}
              // Full-bleed art crop (§3.5): the portrait gazebo frame is biased
              // up so the dramatic dusk sky sits behind the headline and the
              // gazebo/couple rest behind the subhead.
              className="object-cover object-[50%_46%]"
            />
          )}
          {videoSrc && (
            <video
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
        {/* Scrim (§3.4/§3.5) — layered so text is always legible while the
            upper-right sky stays open as calm negative space:
            1 · atmospheric gradient: 0.60 at the foot → 0.15 at the sky;
            2 · soft radial vignette to settle the edges;
            3 · a "title shadow" down the left column (where the left-aligned
                eyebrow → headline live) so it reads against the bright dusk sky;
            4 · a bottom plate under the subhead → CTAs.
            Together these guarantee ≥4.5:1 on the eyebrow and headline. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.60)_0%,rgba(33,29,23,0.15)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_42%,transparent_52%,rgba(33,29,23,0.40)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(33,29,23,0.82)_0%,rgba(33,29,23,0.38)_40%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.78)_0%,rgba(33,29,23,0.44)_28%,transparent_62%)]" />
      </div>

      {/* Content */}
      <div className="container-edge pb-24 pt-36 md:pb-28">
        {/* Script eyebrow — restrained (§3.6): small fluid clamp, ~30ch,
            left-aligned above the headline, NOT full width. */}
        <ScriptEyebrow
          tone="champagne"
          sizeClassName="text-[clamp(0.95rem,0.9rem+0.3vw,1.25rem)] leading-none"
          className="max-w-[30ch]"
        >
          {eyebrow}
        </ScriptEyebrow>
        <RevealText
          lines={[headline]}
          as="h1"
          className="mt-5 max-w-5xl font-display text-step-5 leading-[0.95] text-ivory"
        />
        {/* Subhead — cream, --step-1, tracked, directly under the headline. */}
        <p className="mt-6 max-w-xl text-step-1 tracking-[0.01em] text-ivory">{subheading}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <EnquireButton
            source="global-drawer"
            magnetic
            className="border-ivory! bg-ivory! text-ink! hover:bg-champagne! hover:border-champagne!"
          >
            {primaryCta.label}
          </EnquireButton>
          <Button
            href={secondaryCta.href}
            variant="ghost"
            className="border-ivory/60! text-ivory! hover:border-champagne! hover:text-champagne!"
          >
            {secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/70"
      >
        <span className="font-sans text-[0.62rem] uppercase tracking-[0.22em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ivory/50" />
      </div>
    </section>
  );
}
