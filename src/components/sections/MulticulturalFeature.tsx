import Image from "next/image";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { OrnamentCorner } from "@/components/ornaments/OrnamentCorner";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { Button } from "@/components/primitives/Button";
import { resolveMedia } from "@/lib/cms";
import type { Occasion } from "@/types";

/* MULTICULTURAL FEATURE BAND (§11 §8, [NMP]) — "We speak the language of your
   celebration." Botanical frame, full-bleed image, specific cultural micro-copy
   from occasion.facilities. All copy CMS-driven. Server component. */
export function MulticulturalFeature({ occasion }: { occasion: Occasion }) {
  const media = resolveMedia(occasion.heroMedia);
  const chips = occasion.facilities ?? [];

  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      {media && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={media.url}
            alt=""
            fill
            sizes="100vw"
            placeholder={media.blurDataURL ? "blur" : "empty"}
            blurDataURL={media.blurDataURL}
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(33,29,23,0.85),rgba(33,29,23,0.55))]" />
        </div>
      )}

      <OrnamentCorner corner="tl" stroke="var(--champagne)" />
      <OrnamentCorner corner="br" stroke="var(--champagne)" />

      <div className="container-edge flex flex-col items-center gap-7 py-[var(--section-y)] text-center">
        <ScriptEyebrow align="center" className="text-champagne">
          Multicultural Weddings
        </ScriptEyebrow>
        <h2 className="max-w-3xl font-display text-step-3 text-ivory">{occasion.heroHeadline}</h2>
        <p className="max-w-xl text-step-0 text-ivory/80">{occasion.heroSubheading}</p>

        {chips.length > 0 && (
          <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-champagne/40 px-4 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.14em] text-champagne"
              >
                {chip}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button
            href={occasion.cta.href}
            variant="ghost"
            className="border-champagne/50 text-ivory hover:border-champagne hover:text-champagne"
          >
            {occasion.cta.label}
          </Button>
          <EnquireButton source="occasion-cta" className="bg-gold text-ink border-gold hover:bg-champagne">
            Enquire
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}
