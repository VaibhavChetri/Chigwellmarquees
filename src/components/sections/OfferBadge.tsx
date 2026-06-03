import { cn } from "@/lib/utils";
import type { Offer } from "@/types";

const KIND_LABEL: Record<Offer["kind"], string> = {
  special: "Special offer",
  midweek: "Midweek",
  "late-availability": "Late availability",
  seasonal: "Seasonal",
};

/* OFFER BADGE (§8) — a small gold pill marking an offer's kind. Real text; the
   dot is decorative. Used on offer cards, the detail hero and the home featured
   offer. */
export function OfferBadge({
  offer,
  label,
  className,
}: {
  offer?: Offer;
  label?: string;
  className?: string;
}) {
  const text = label ?? offer?.badgeLabel ?? (offer ? KIND_LABEL[offer.kind] : "Offer");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1",
        "font-sans text-[0.62rem] uppercase tracking-[0.16em] text-ink",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink/60" />
      {text}
    </span>
  );
}
