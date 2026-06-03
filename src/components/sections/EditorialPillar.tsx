import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { LinkGilded } from "@/components/primitives/LinkGilded";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { RevealText } from "@/components/primitives/RevealText";
import { Tag } from "@/components/primitives/Tag";
import { resolveMedia } from "@/lib/cms";
import { cn } from "@/lib/utils";
import type { Occasion, Venue } from "@/types";

/* ALTERNATING EDITORIAL PILLAR BLOCK (§8, [NMP]) — full-width image + script
   eyebrow + serif heading + one romantic line + gilded "Read more". Botanical
   bloom + stagger handled by the in-view reveal. Server component.

   Renders from either an Occasion (Home pillars, §11 §3) or a Venue (Venues
   index, Page 04) — normalised to one shape so the block is truly reusable. */

type Normalised = {
  eyebrow: string;
  heading: string;
  line: string;
  media: ReturnType<typeof resolveMedia>;
  href: string;
  ctaLabel: string;
  badge?: string;
};

function fromOccasion(occasion: Occasion): Normalised {
  return {
    eyebrow: occasion.title,
    heading: occasion.heroHeadline,
    line: occasion.heroSubheading,
    media: resolveMedia(occasion.heroMedia),
    href: occasion.cta.href,
    ctaLabel: occasion.cta.label,
  };
}

function fromVenue(venue: Venue): Normalised {
  return {
    eyebrow: venue.name,
    heading: venue.tagline,
    line: venue.intro,
    media: resolveMedia(venue.heroMedia),
    href: `/venue/${venue.slug}`,
    ctaLabel: `Discover ${venue.name}`,
    badge: `${venue.capacity.min}–${venue.capacity.max.toLocaleString("en-GB")} guests`,
  };
}

export function EditorialPillar(
  props: { index: number } & ({ occasion: Occasion } | { venue: Venue }),
) {
  const item = "venue" in props ? fromVenue(props.venue) : fromOccasion(props.occasion);
  const flip = props.index % 2 === 1;

  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div className={cn("relative", flip && "md:order-2")}>
        <MediaFrame
          media={item.media}
          ratio="portrait"
          sizes="(min-width: 768px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 ease-[var(--ease-cinematic)] hover:scale-[1.03]"
        />
      </div>

      <div className={cn("flex flex-col items-start gap-5", flip && "md:order-1")}>
        <ScriptEyebrow>{item.eyebrow}</ScriptEyebrow>
        <RevealText
          lines={[item.heading]}
          as="h2"
          className="font-display text-step-3 text-ink"
        />
        <p className="max-w-md text-step-0 text-ink-soft">{item.line}</p>
        {item.badge && <Tag tone="gold">{item.badge}</Tag>}
        <LinkGilded href={item.href} className="mt-2">
          {item.ctaLabel}
        </LinkGilded>
      </div>
    </article>
  );
}
