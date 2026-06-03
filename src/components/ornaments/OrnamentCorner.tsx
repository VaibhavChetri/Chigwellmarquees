"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

import { CornerVine } from "./svgs";

type Corner = "tl" | "tr" | "bl" | "br";

const ROTATE: Record<Corner, string> = {
  tl: "rotate-0",
  tr: "rotate-90",
  br: "rotate-180",
  bl: "-rotate-90",
};

/* A delicate vine in a hero / card corner (§3.6). Absolutely positioned by the
   parent (which must be `relative`). Blooms on scroll-in; decorative. */
export function OrnamentCorner({
  corner = "tl",
  className,
  stroke,
}: {
  corner?: Corner;
  className?: string;
  stroke?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-10 h-20 w-20 md:h-28 md:w-28",
        corner === "tl" && "left-0 top-0",
        corner === "tr" && "right-0 top-0",
        corner === "bl" && "bottom-0 left-0",
        corner === "br" && "bottom-0 right-0",
        "bloom",
        inView && "is-visible",
        className,
      )}
    >
      <CornerVine className={cn("h-full w-full text-champagne", ROTATE[corner])} stroke={stroke} />
    </div>
  );
}
