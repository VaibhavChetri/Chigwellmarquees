"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Lightbox } from "@/components/sections/Lightbox";
import { prefersReducedMotion } from "@/lib/motion";
import type { MediaAsset } from "@/types";

/* VENUE FEATURE GALLERY (§Page 02 §4) — masonry grid (1→2→3) with a gentle
   "Garden Parallax" drift, opening the shared accessible Lightbox (§Page 14).
   Images lazy + blur with explicit dims (no CLS). */
export function VenueGallery({ media, venueName }: { media: MediaAsset[]; venueName: string }) {
  const images = media.filter((m) => m.type === "image");
  const [index, setIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  // Garden Parallax — gentle drift (reduced-motion safe).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const grid = gridRef.current;
    if (!grid) return;
    const figures = Array.from(grid.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        figures.forEach((fig, i) => {
          const rect = fig.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
          const speed = i % 2 === 0 ? 14 : 22;
          fig.style.transform = `translate3d(0, ${(offset * -speed).toFixed(1)}px, 0)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  if (count === 0) return null;

  return (
    <>
      <div ref={gridRef} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((m, i) => (
          <button
            key={m.id}
            data-parallax
            onClick={() => setIndex(i)}
            className="group block w-full overflow-hidden rounded-[var(--radius-card)] [break-inside:avoid] will-change-transform"
            aria-label={`View image ${i + 1} of ${count}: ${m.alt}`}
          >
            <Image
              src={m.url}
              alt={m.alt}
              width={m.width ?? 1200}
              height={m.height ?? 900}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={m.blurDataURL ? "blur" : "empty"}
              blurDataURL={m.blurDataURL}
              className="h-auto w-full object-cover transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={index}
        onIndex={setIndex}
        onClose={() => setIndex(-1)}
        label={`${venueName} gallery`}
      />
    </>
  );
}
