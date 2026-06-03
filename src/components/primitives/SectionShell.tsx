import { cn } from "@/lib/utils";

type Tone = "ivory" | "parchment" | "sand" | "ink";

const TONES: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  parchment: "bg-parchment text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-ivory",
};

/* Consistent vertical rhythm + max-width gutter for every page section (§3.3).
   "Luxury = air": section padding is the generous clamp from tokens. */
export function SectionShell({
  children,
  tone = "ivory",
  className,
  innerClassName,
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  id?: string;
  as?: "section" | "div" | "footer" | "header";
}) {
  return (
    <Tag id={id} className={cn("relative w-full", TONES[tone], className)}>
      <div
        className={cn(
          "container-edge",
          "py-[var(--section-y)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
