import { MediaFrame } from "@/components/primitives/MediaFrame";
import { resolveMedia } from "@/lib/cms";
import type { Award } from "@/types";

/* AWARDS / ACCOLADES STRIP (§7.5, [NMP]) — quiet social proof, muted/mono on
   parchment. Server component. */
export function AwardsStrip({
  awards,
  heading = "Host your celebration at our award-winning venue",
}: {
  awards: Award[];
  heading?: string;
}) {
  if (awards.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <p className="max-w-xl font-display text-step-1 italic text-ink-soft">{heading}</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {awards.map((award) => {
          const logo = resolveMedia(award.logo);
          return (
            <li
              key={award.id}
              className="flex flex-col items-center gap-2 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <MediaFrame media={logo} ratio="square" rounded={false} sizes="64px" />
              </div>
              <span className="max-w-[10rem] text-[0.66rem] uppercase tracking-[0.14em] text-taupe">
                {award.awardingBody}
                {award.year ? ` · ${award.year}` : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
