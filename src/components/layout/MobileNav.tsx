"use client";

import Link from "next/link";
import { useEffect } from "react";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { Flourish } from "@/components/ornaments/svgs";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/* Full-screen elegant mobile overlay (§8) with a botanical flourish. */
export function MobileNav({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[var(--z-drawer)] flex flex-col bg-ivory lg:hidden",
        "transition-[opacity,transform] duration-400 ease-[var(--ease-cinematic)]",
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
      )}
    >
      <div className="flex items-center justify-end px-[var(--gutter)] py-5">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink"
        >
          <span aria-hidden="true" className="text-xl">
            &times;
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-[var(--gutter)] pb-8">
        {items.map((item) => (
          <div key={item.label} className="border-b border-champagne/60 py-3">
            <Link
              href={item.href}
              onClick={onClose}
              className="font-display text-step-2 text-ink"
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={onClose}
                    className="font-sans text-[0.8rem] uppercase tracking-[0.12em] text-taupe"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-5 border-t border-champagne px-[var(--gutter)] py-7">
        <Flourish className="text-gold/80" stroke="var(--gold)" />
        <EnquireButton source="global-drawer" magnetic className="w-full max-w-xs">
          Enquire
        </EnquireButton>
      </div>
    </div>
  );
}
