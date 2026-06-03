"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types";

/* A square social-wall tile for an Instagram reel (§8). Renders the poster only
   on the server and under prefers-reduced-motion; when motion is allowed it
   swaps in a muted, looping, autoplaying clip post-mount (never blocks paint,
   no autoplay under reduced-motion — §3.4). */
export function SocialReel({
  media,
  imgClassName,
  sizes = "(min-width: 768px) 25vw, 50vw",
}: {
  media: MediaAsset;
  imgClassName?: string;
  sizes?: string;
}) {
  const [motion, setMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = media.type === "video" ? media.posterUrl : media.url;

  useEffect(() => {
    setMotion(!prefersReducedMotion());
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-sand">
      {motion ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        poster && (
          <Image
            src={poster}
            alt={media.alt}
            fill
            sizes={sizes}
            className={cn("object-cover", imgClassName)}
          />
        )
      )}
      {/* Reel affordance */}
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-[var(--overlay)] text-[0.6rem] text-ivory"
      >
        ▶
      </span>
    </div>
  );
}
