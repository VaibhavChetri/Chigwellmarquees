"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { OrnamentCorner } from "@/components/ornaments/OrnamentCorner";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { RevealText } from "@/components/primitives/RevealText";
import { Tag } from "@/components/primitives/Tag";
import { cn } from "@/lib/utils";
import type { MediaAsset, Venue } from "@/types";

/* VENUE HERO (§Page 02 §1) — full-bleed heroMedia, ScriptEyebrow, Fraunces
   name, capacity badge, Curtain Reveal, OrnamentCorner. The signature scale
   beat: the capacity number reveals beneath the name. Poster is priority/LCP. */
export function VenueHero({ venue, media }: { venue: Venue; media: MediaAsset | null }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const poster = media?.type === "video" ? media.posterUrl : media?.url;

  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden">
      <OrnamentCorner corner="tl" stroke="var(--champagne)" />

      <div
        className="absolute inset-0 -z-10 transition-[clip-path] duration-[1100ms] ease-[var(--ease-cinematic)] motion-reduce:transition-none"
        style={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 50% 0% 50%)" }}
      >
        {poster && (
          <Image
            src={poster}
            alt={media?.alt ?? venue.name}
            fill
            priority
            sizes="100vw"
            placeholder={media?.blurDataURL ? "blur" : "empty"}
            blurDataURL={media?.blurDataURL}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.78),rgba(33,29,23,0.1)_55%,rgba(33,29,23,0.42))]" />
      </div>

      <div className="container-edge pb-20 pt-36">
        <ScriptEyebrow className="text-champagne">{venue.tagline}</ScriptEyebrow>
        <RevealText
          lines={[venue.name]}
          as="h1"
          className="mt-4 max-w-4xl font-display text-step-5 leading-[0.95] text-ivory"
        />
        {/* Scale beat — the grandeur number */}
        <p
          className={cn(
            "mt-6 flex items-baseline gap-3 text-ivory transition-all duration-700 ease-[var(--ease-cinematic)] motion-reduce:transition-none",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <span className="font-display text-step-3 text-champagne">
            {venue.capacity.max.toLocaleString("en-GB")}
          </span>
          <span className="font-sans text-[0.78rem] uppercase tracking-[0.18em] text-ivory/80">
            guests at their grandest
          </span>
        </p>
        <div className="mt-7">
          <Tag tone="gold" className="border-champagne/50 text-champagne">
            {venue.capacity.min}–{venue.capacity.max.toLocaleString("en-GB")} guests
          </Tag>
        </div>
      </div>
    </section>
  );
}
