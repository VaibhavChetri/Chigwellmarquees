"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

import { Flourish } from "./svgs";

/* A centred botanical flourish between major sections (§3.6). Blooms on
   scroll-in; renders static under reduced-motion. Decorative → aria-hidden. */
export function FlourishDivider({
  className,
  stroke,
}: {
  className?: string;
  stroke?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("flex w-full items-center justify-center py-10", "bloom", inView && "is-visible", className)}
    >
      <Flourish className="text-gold opacity-90" stroke={stroke} />
    </div>
  );
}
