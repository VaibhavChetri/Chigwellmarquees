import { cn } from "@/lib/utils";

type Tone = "gold" | "sage" | "blush";

// Tone is carried by the border; the label is --ink-soft so the small pill text
// always clears 4.5:1 (the coloured variants fail at this size — §3.1).
const TONES: Record<Tone, string> = {
  gold: "border-gold/50 text-ink-soft",
  sage: "border-sage/60 text-ink-soft",
  blush: "border-rose/60 text-ink-soft",
};

/* Small pill label — culture tags, offer badges, capacity chips. */
export function Tag({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-ivory/40 px-3 py-1",
        "font-sans text-[0.66rem] uppercase tracking-[0.16em]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
