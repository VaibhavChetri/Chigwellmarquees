"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types";

export type StoryScene = { title: string; caption: string; media: MediaAsset | null };

/* ============================================================================
   "YOUR DREAM DAY" — PINNED STORYBOARD (§11 §5).  THE page's signature moment.
   Desktop + motion-OK: GSAP ScrollTrigger pins the panel and scrubs through
   Arrival → Ceremony → Reception → Golden hour.
   Mobile OR reduced-motion: the SAME markup renders as a readable vertical
   stack (no pin, no scroll-jacking) — and it works with no JS at all.
   GSAP loads dynamically post-hydration so it never blocks the hero (§5 perf).
   ============================================================================ */
export function DreamDayStoryboard({
  eyebrow,
  heading,
  scenes,
}: {
  eyebrow: string;
  heading: string;
  scenes: StoryScene[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    let cleanup: (() => void) | undefined;
    let active = true;

    // Defer GSAP to idle so it never competes with first paint.
    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!active) return;
      gsap.registerPlugin(ScrollTrigger);

      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
      const captions = panels.map((p) => p.querySelector<HTMLElement>("[data-caption]"));

      const mm = gsap.matchMedia();
      // Pin only on large screens with motion allowed; else native vertical stack.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(track, { height: "100vh" });
        gsap.set(panels, { position: "absolute", inset: 0, height: "100vh" });
        gsap.set(panels.slice(1), { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${panels.length * 100}%`,
            pin: track,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel, i) => {
          const caption = captions[i];
          if (i === 0) {
            if (caption) {
              tl.fromTo(caption, { yPercent: 12, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4 });
            }
            return;
          }
          const prev = panels[i - 1];
          if (prev) tl.to(prev, { autoAlpha: 0, duration: 0.5 }, "+=0.6");
          tl.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, "<");
          if (caption) {
            tl.fromTo(
              caption,
              { yPercent: 12, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.4 },
              "<0.1",
            );
          }
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      cleanup = () => mm.revert();
    };

    const idle =
      "requestIdleCallback" in window
        ? (cb: () => void) =>
            (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(cb)
        : (cb: () => void) => window.setTimeout(cb, 300);
    idle(() => {
      void init();
    });

    return () => {
      active = false;
      cleanup?.();
    };
  }, [scenes.length]);

  return (
    <section className="bg-ink text-ivory">
      <div className="container-edge pt-[var(--section-y)] text-center">
        <ScriptEyebrow align="center" className="text-champagne">
          {eyebrow}
        </ScriptEyebrow>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-step-3 text-ivory">{heading}</h2>
      </div>

      <div ref={wrapperRef} className="relative mt-12">
        <div ref={trackRef} className="relative w-full overflow-hidden">
          {scenes.map((scene, i) => (
            <div
              key={scene.title}
              data-panel
              className="relative flex min-h-[78vh] w-full items-end justify-center overflow-hidden lg:min-h-screen"
            >
              {scene.media && (
                <Image
                  src={scene.media.url}
                  alt={scene.media.alt}
                  fill
                  sizes="100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  placeholder={scene.media.blurDataURL ? "blur" : "empty"}
                  blurDataURL={scene.media.blurDataURL}
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(33,29,23,0.78),rgba(33,29,23,0.2)_60%)]" />
              <div
                data-caption
                className={cn("relative z-10 mb-[12vh] flex flex-col items-center gap-3 px-6 text-center")}
              >
                <span className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-champagne">
                  {String(i + 1).padStart(2, "0")} · {scene.title}
                </span>
                <p className="max-w-2xl font-display text-step-3 italic leading-tight text-ivory">
                  {scene.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
