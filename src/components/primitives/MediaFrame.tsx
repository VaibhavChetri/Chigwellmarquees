import Image from "next/image";

import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types";

type Ratio = "portrait" | "landscape" | "square" | "wide";

const RATIOS: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

/* Full-bleed art crops with LQIP blur + correct sizes (§3.5). Explicit ratio
   box prevents CLS. `priority` only on the hero (§5 perf budgets). */
export function MediaFrame({
  media,
  ratio = "landscape",
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  rounded = true,
}: {
  media: MediaAsset | null;
  ratio?: Ratio;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  if (!media || media.type === "file") {
    return (
      <div
        className={cn(RATIOS[ratio], "w-full bg-sand", rounded && "rounded-[var(--radius-card)]", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-sand",
        RATIOS[ratio],
        rounded && "rounded-[var(--radius-card)]",
        className,
      )}
    >
      <Image
        src={media.url}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={media.blurDataURL ? "blur" : "empty"}
        blurDataURL={media.blurDataURL}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
