"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types";

/* HEADER (§8) — transparent over the hero, solidifies (ivory + blur) on scroll.
   Logo, mega-menu, phone, standout Enquire CTA. Mobile = full-screen overlay. */
export function Header({ settings }: { settings: SiteSettings }) {
  const [solid, setSolid] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // The header is transparent (light text) ONLY when a full-bleed dark hero sits
  // behind it (it carries `data-dark-hero`); on every other page it stays solid
  // so the ink nav is legible over light sections (e.g. /contact). Re-checked on
  // route change since the header persists across client navigations.
  useEffect(() => {
    const hasDarkHero = Boolean(document.querySelector("[data-dark-hero]"));
    const onScroll = () => setSolid(!hasDarkHero || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const logoColor = solid ? "text-ink" : "text-ivory";

  return (
    <header
      className={cn(
        // Position is owned by the fixed announcement+header stack in the layout.
        "relative z-[var(--z-header)] transition-colors duration-300",
        solid
          ? "border-b border-champagne bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-edge flex h-[var(--header-h,4.75rem)] items-center justify-between gap-6">
        <Link
          href="/"
          className={cn("font-display text-[1.15rem] leading-none tracking-tight transition-colors", logoColor)}
        >
          {settings.brandName}
        </Link>

        <MegaMenu items={settings.primaryNav} solid={solid} />

        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`}
            className={cn(
              "hidden font-sans text-[0.78rem] uppercase tracking-[0.14em] transition-colors xl:inline hover:text-gold",
              solid ? "text-ink-soft" : "text-ivory/80",
            )}
          >
            {settings.contact.phone}
          </a>
          <EnquireButton source="global-drawer" className="hidden sm:inline-flex" />

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className={cn(
              "flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden",
              logoColor,
            )}
          >
            <span className="h-px w-6 bg-current" />
            <span className="h-px w-6 bg-current" />
          </button>
        </div>
      </div>

      <MobileNav items={settings.primaryNav} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
