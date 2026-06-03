"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { OrnamentCorner } from "@/components/ornaments/OrnamentCorner";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { RevealText } from "@/components/primitives/RevealText";
import type { MediaAsset, Occasion } from "@/types";

/* OCCASION HERO (§Page 05 §1) — heroHeadline / heroSubheading / heroMedia with
   Curtain Reveal + ScriptEyebrow + OrnamentCorner. The only h1 on the page.
   Poster is priority/LCP. */
export function OccasionHero({
  occasion,
  media,
}: {
  occasion: Occasion;
  media: MediaAsset | null;
}) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const poster = media?.type === "video" ? media.posterUrl : media?.url;

  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden">
      <OrnamentCorner corner="tl" stroke="var(--champagne)" />
      <div
        className="absolute inset-0 -z-10 transition-[clip-path] duration-[1100ms] ease-[var(--ease-cinematic)] motion-reduce:transition-none"
        style={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 50% 0% 50%)" }}
      >
        {poster && (
          <Image
            src={poster}
            alt={media?.alt ?? occasion.title}
            fill
            priority
            sizes="100vw"
            placeholder={media?.blurDataURL ? "blur" : "empty"}
            blurDataURL={media?.blurDataURL}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.74),rgba(33,29,23,0.1)_55%,rgba(33,29,23,0.4))]" />
      </div>

      <div className="container-edge pb-20 pt-36">
        <ScriptEyebrow className="text-champagne">{occasion.title}</ScriptEyebrow>
        <RevealText
          lines={[occasion.heroHeadline]}
          as="h1"
          className="mt-4 max-w-4xl font-display text-step-5 leading-[0.95] text-ivory"
        />
        <p className="mt-6 max-w-xl text-step-1 text-ivory/85">{occasion.heroSubheading}</p>
      </div>
    </section>
  );
}
