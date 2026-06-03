"use client";

import Image from "next/image";

import { resolveMedia } from "@/lib/cms";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/* The host signature (§3.7) — bespoke human warmth signing romantic blocks.
   Prefers an SVG/image signature (draws on via Signed-by-Hand); falls back to
   Pinyon Script when no signatureMedia exists. Name/role are real content;
   the flourish is decorative. */
export function HostSignature({
  name,
  role,
  signatureMedia,
  className,
}: {
  name: string;
  role: string;
  signatureMedia?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const media = resolveMedia(signatureMedia);

  return (
    <div ref={ref} className={cn("flex flex-col items-start gap-1", className)}>
      {media ? (
        <span
          className={cn("block max-w-[16rem] transition-opacity duration-700", inView ? "opacity-100" : "opacity-0")}
        >
          <Image
            src={media.url}
            alt={`${name} signature`}
            width={media.width ?? 256}
            height={media.height ?? 96}
            className="h-auto w-full"
          />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "font-script text-gold-deep transition-all duration-700 ease-[var(--ease-cinematic)]",
            "text-[2.6rem] leading-none",
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {name}
        </span>
      )}
      <span className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-taupe">
        {name} · {role}
      </span>
    </div>
  );
}
