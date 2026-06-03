"use client";

import Link from "next/link";
import { useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-ivory hover:bg-gold-deep border border-ink hover:border-gold-deep",
  ghost:
    "bg-transparent text-ink border border-ink/30 hover:border-gold hover:text-gold-deep",
};

const baseClass = cn(
  "inline-flex items-center justify-center gap-2 select-none",
  "min-h-11 px-7 py-3 rounded-[var(--radius-input)]",
  "font-sans text-[0.82rem] uppercase tracking-[0.16em]",
  "transition-colors duration-[var(--dur-micro)] ease-[var(--ease-cinematic)]",
  "will-change-transform",
);

type CommonProps = {
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Magnetic Enquire (§3.4): primary CTA tracks the cursor ≤6px on desktop. */
function useMagnetic(magnetic: boolean) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: MouseEvent) => {
    if (!magnetic || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return { ref, onMove, reset };
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", magnetic = false, className, children } = props;
  const magneticEnabled = magnetic && variant === "primary";
  const { ref, onMove, reset } = useMagnetic(magneticEnabled);
  const classes = cn(baseClass, VARIANTS[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, magnetic: _m, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </button>
  );
}
