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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  // The clip autoplays MUTED (browsers block unmuted autoplay); this toggle lets
  // a visitor turn the original sound on/off via a user gesture (§ audio).
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    v.muted = !next;
    if (next) {
      v.volume = 1;
      void v.play().catch(() => {});
    }
    setSoundOn(next);
  };

  // Clicking anywhere on the hero toggles the audio — except on real controls
  // (CTAs, the sound button, links) which keep their own behaviour. The visible
  // sound button remains the keyboard-accessible affordance.
  const onHeroClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!videoSrc) return;
    if ((e.target as HTMLElement).closest("a, button, input, select, textarea, [role='button']")) return;
    toggleSound();
  };

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
      onClick={onHeroClick}
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
        {/* Override the muted global image grade for the hero only: a richer,
            punchier treatment so the (necessarily upscaled) reel reads crisp and
            premium rather than flat. Cascades to the poster + <video> below via
            the --media-grade var that `img,video { filter }` consumes. */}
        <div
          ref={driftRef}
          className="absolute inset-0 will-change-transform"
          style={{ ["--media-grade" as string]: "saturate(1.12) contrast(1.09) brightness(1.03)" } as React.CSSProperties}
        >
          {poster && (
            <Image
              src={poster}
              alt={posterAlt}
              fill
              priority
              sizes="100vw"
              placeholder={media?.blurDataURL ? "blur" : "empty"}
              blurDataURL={media?.blurDataURL}
              // Full-bleed crop (§3.5): the portrait reel is biased slightly
              // above centre so the draped ceiling + lit room read behind the
              // headline. The poster shares this crop with the <video> below so
              // the poster→video hand-off is seamless.
              className="object-cover object-[50%_40%]"
            />
          )}
          {videoSrc && (
            <video
              ref={videoRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
            >
              {/* MP4 (H.264) — broad compatibility. A WebM (VP9/AV1) source can
                  be added here once ffmpeg is available for a smaller, sharper
                  alternative (per the optimization guide). */}
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
        {/* 5 · top scrim — the reel is bright (white drapes/chandeliers), so
            darken the top strip where the transparent header's ivory nav sits so
            it stays legible across the brightest frames of the clip. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(33,29,23,0.66)_0%,rgba(33,29,23,0.5)_9%,transparent_20%)]" />
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

      {/* Sound toggle — only when the video is actually playing (suppressed
          under reduced-motion / save-data, where no video attaches). Lets the
          visitor hear the original audio via a user gesture. */}
      {videoSrc && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Turn off sound" : "Turn on sound"}
          className="group absolute bottom-6 right-[var(--gutter)] z-10 grid h-11 w-11 place-items-center rounded-full border border-ivory/50 bg-[var(--overlay)] text-ivory backdrop-blur-sm transition-colors hover:border-champagne hover:text-champagne"
        >
          {soundOn ? (
            // speaker on
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 6a9 9 0 0 1 0 12" />
            </svg>
          ) : (
            // speaker muted
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              <path d="m17 9 5 6" />
              <path d="m22 9-5 6" />
            </svg>
          )}
        </button>
      )}

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
