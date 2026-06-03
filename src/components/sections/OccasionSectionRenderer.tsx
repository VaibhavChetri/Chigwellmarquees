import { MediaFrame } from "@/components/primitives/MediaFrame";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionShell } from "@/components/primitives/SectionShell";
import { Tag } from "@/components/primitives/Tag";
import { VenueGallery } from "@/components/sections/VenueGallery";
import { resolveMedia } from "@/lib/cms";
import { cn, paragraphs } from "@/lib/utils";
import type { OccasionSection } from "@/types";

/* OCCASION SECTION RENDERER (§Page 05 §3) — the flexible content engine.
   Switches on section.layout to render text / split / gallery / feature-list.
   Heading is always an h2 (correct order beneath the hero h1); Editorial Rise
   via RevealText. Alternating tone keeps long pages rhythmic. Server component. */
export function OccasionSectionRenderer({
  section,
  index,
  occasionTitle,
}: {
  section: OccasionSection;
  index: number;
  occasionTitle: string;
}) {
  const tone = index % 2 === 0 ? "ivory" : "parchment";
  const heading = (
    <RevealText lines={[section.heading]} as="h2" className="font-display text-step-3 text-ink" />
  );

  switch (section.layout) {
    case "split": {
      const media = resolveMedia(section.media?.[0]);
      const flip = index % 2 === 1;
      return (
        <SectionShell tone={tone}>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className={cn("relative", flip && "md:order-2")}>
              <MediaFrame
                media={media}
                ratio="landscape"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className={cn("flex flex-col gap-5", flip && "md:order-1")}>
              {heading}
              <div className="space-y-4">
                {paragraphs(section.body).map((p, i) => (
                  <p key={i} className="text-step-0 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      );
    }

    case "gallery":
      return (
        <SectionShell tone={tone} innerClassName="flex flex-col gap-10">
          <div className="flex flex-col items-center text-center">{heading}</div>
          <VenueGallery
            media={(section.media ?? [])
              .map((ref) => resolveMedia(ref))
              .filter((m): m is NonNullable<typeof m> => Boolean(m))}
            venueName={`${occasionTitle} gallery`}
          />
        </SectionShell>
      );

    case "feature-list":
      return (
        <SectionShell tone={tone} innerClassName="flex flex-col items-center gap-8 text-center">
          {heading}
          {section.list && section.list.length > 0 && (
            <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {section.list.map((item) => (
                <li key={item}>
                  <Tag tone="sage">{item}</Tag>
                </li>
              ))}
            </ul>
          )}
        </SectionShell>
      );

    case "text":
    default:
      return (
        <SectionShell tone={tone} innerClassName="flex flex-col items-center text-center">
          {heading}
          <div className="mt-5 max-w-2xl space-y-4">
            {paragraphs(section.body).map((p, i) => (
              <p key={i} className="text-step-1 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </SectionShell>
      );
  }
}
