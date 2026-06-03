"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { FilterChips, type FilterOption } from "@/components/sections/FilterChips";
import { Lightbox } from "@/components/sections/Lightbox";
import { prefersReducedMotion } from "@/lib/motion";
import type { MediaAsset } from "@/types";

export type GalleryCard = { id: string; media: MediaAsset; categories: string[] };

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => void };

/* MASONRY GALLERY (§Page 14 §3) — filterable masonry (next/image, lazy, blur,
   explicit dims → no CLS) with a gentle Garden Parallax and the shared a11y
   Lightbox. Filtering uses the View Transitions API so the grid reflows
   smoothly without jank; reduced-motion / unsupported browsers swap instantly. */
export function MasonryGallery({
  cards,
  filters,
}: {
  cards: GalleryCard[];
  filters: FilterOption[];
}) {
  const [active, setActive] = useState("all");
  const [lightIndex, setLightIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = active === "all" ? cards : cards.filter((c) => c.categories.includes(active));
  const visibleMedia = visible.map((c) => c.media);

  function applyFilter(next: string) {
    if (next === active) return;
    const doc = typeof document !== "undefined" ? (document as ViewTransitionDocument) : null;
    if (doc?.startViewTransition && !prefersReducedMotion()) {
      doc.startViewTransition(() => flushSync(() => setActive(next)));
    } else {
      setActive(next);
    }
  }

  // Garden Parallax — gentle drift (reduced-motion safe).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const grid = gridRef.current;
    if (!grid) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        grid.querySelectorAll<HTMLElement>("[data-parallax]").forEach((fig, i) => {
          const rect = fig.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
          const speed = i % 3 === 0 ? 12 : i % 3 === 1 ? 20 : 8;
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
  }, [active]);

  return (
    <div className="flex flex-col gap-12">
      <FilterChips filters={filters} active={active} onChange={applyFilter} label="Filter gallery by category" />

      <p role="status" aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "photo" : "photos"} shown
      </p>

      <div ref={gridRef} className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((card, i) => (
          <button
            key={card.id}
            data-parallax
            onClick={() => setLightIndex(i)}
            style={{ ["viewTransitionName" as string]: `gal-${card.id}` }}
            className="group block w-full overflow-hidden rounded-[var(--radius-card)] [break-inside:avoid] will-change-transform"
            aria-label={`View image ${i + 1} of ${visible.length}: ${card.media.alt}`}
          >
            <Image
              src={card.media.url}
              alt={card.media.alt}
              width={card.media.width ?? 1200}
              height={card.media.height ?? 800}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={card.media.blurDataURL ? "blur" : "empty"}
              blurDataURL={card.media.blurDataURL}
              className="h-auto w-full object-cover transition-transform duration-700 ease-[var(--ease-cinematic)] group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={visibleMedia}
        index={lightIndex}
        onIndex={setLightIndex}
        onClose={() => setLightIndex(-1)}
        label="Gallery"
      />
    </div>
  );
}
