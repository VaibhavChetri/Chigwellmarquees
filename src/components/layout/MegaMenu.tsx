"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/* Desktop mega-menu (§8) — top-level items reveal a panel of children on hover
   / focus with a gilded underline. Keyboard accessible (focus-within). */
export function MegaMenu({ items, solid }: { items: NavItem[]; solid: boolean }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {items.map((item) => (
          <MegaItem key={item.label} item={item} solid={solid} />
        ))}
      </ul>
    </nav>
  );
}

function MegaItem({ item, solid }: { item: NavItem; solid: boolean }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);
  const linkColor = solid ? "text-ink" : "text-ivory";

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        className={cn(
          "group relative inline-flex items-center py-2 font-sans text-[0.78rem] uppercase tracking-[0.14em] transition-colors",
          linkColor,
          "hover:text-gold",
        )}
        aria-expanded={hasChildren ? open : undefined}
      >
        {item.label}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-[var(--dur-micro)] ease-[var(--ease-cinematic)] group-hover:scale-x-100"
        />
      </Link>

      {hasChildren && (
        <div
          className={cn(
            "absolute left-1/2 top-full z-[var(--z-header)] min-w-[15rem] -translate-x-1/2 pt-3",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            "transition-opacity duration-200",
          )}
        >
          <ul className="overflow-hidden rounded-[var(--radius-card)] border border-champagne bg-ivory py-2 shadow-[var(--shadow-soft)]">
            {item.children?.map((child) => (
              <li key={child.label}>
                <Link
                  href={child.href}
                  className="block px-5 py-2.5 font-sans text-[0.8rem] text-ink-soft transition-colors hover:bg-parchment hover:text-gold-deep"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
