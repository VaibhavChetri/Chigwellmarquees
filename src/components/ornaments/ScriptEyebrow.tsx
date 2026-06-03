import { cn } from "@/lib/utils";

import { Sprig } from "./svgs";

/* The illustrated / script eyebrow above section labels (§3.6): a tiny sprig +
   a short line set in Pinyon Script, small. Server-renderable. The sprig is
   decorative (aria-hidden); the text is real, readable content.
   `tone` picks the accent — gold is the romantic default; sage gives the
   refined-professional accent used on corporate pages (§Page 11). */

type Tone = "gold" | "sage" | "champagne";

const TONE: Record<Tone, { text: string; sprig: string; stroke: string }> = {
  // --gold-deep (not --gold): plain --gold (#b08d4f) only reaches ~2.6–2.9:1 on
  // ivory/parchment and fails WCAG even for large text (§3.1). gold-deep clears it.
  gold: { text: "text-gold-deep", sprig: "text-gold-deep/80", stroke: "var(--gold-deep)" },
  sage: { text: "text-sage-deep", sprig: "text-sage-deep/70", stroke: "var(--sage-deep)" },
  // Lighter gold-family accent for use over dark/photographic backgrounds where
  // --gold can't clear 4.5:1 (§3.1 contrast law). Used by the cinematic hero.
  champagne: { text: "text-champagne", sprig: "text-champagne/80", stroke: "var(--champagne)" },
};

export function ScriptEyebrow({
  children,
  className,
  align = "left",
  withSprig = true,
  tone = "gold",
  sizeClassName = "text-[1.6rem] leading-none md:text-[2rem]",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  withSprig?: boolean;
  tone?: Tone;
  /* Default is the section-label scale; the hero overrides this to a restrained
     fluid clamp (§3.6 rule of restraint). Other sections keep the default. */
  sizeClassName?: string;
}) {
  const t = TONE[tone];
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-script",
        t.text,
        sizeClassName,
        align === "center" && "justify-center",
        className,
      )}
    >
      {withSprig && <Sprig className={cn("h-5 w-12 shrink-0", t.sprig)} stroke={t.stroke} />}
      <span>{children}</span>
    </p>
  );
}
