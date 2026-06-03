import Link from "next/link";

import { cn } from "@/lib/utils";

/* Gilded Underline (§3.4): a gold underline draws on from left on hover/focus.
   Implemented with a scaling pseudo-underline so there's no layout shift. */
export function LinkGilded({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex w-fit items-center font-sans text-[0.82rem] uppercase tracking-[0.16em] text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="ml-2 transition-transform duration-[var(--dur-micro)] ease-[var(--ease-cinematic)] group-hover:translate-x-1"
      >
        &rarr;
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[var(--dur-micro)] ease-[var(--ease-cinematic)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
