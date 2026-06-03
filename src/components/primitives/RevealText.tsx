"use client";

import { Fragment, type ElementType } from "react";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/* Editorial Rise (§3.4): line-by-line mask-up reveal. Splits on the provided
   `lines` (caller controls the break for balance). Under reduced-motion the CSS
   renders the static end-state. Decorative motion only — text is always present. */
export function RevealText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("rise", inView && "is-visible")}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            <span className="rise-line">
              <span
                className={lineClassName}
                style={{ ["--rise-delay" as string]: `${i * 90}ms` }}
              >
                {line}
              </span>
            </span>
          </Fragment>
        ))}
      </Tag>
    </div>
  );
}
