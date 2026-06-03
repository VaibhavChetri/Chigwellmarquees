import Link from "next/link";

import { EnquireButton } from "@/components/layout/EnquiryDrawer";
import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types";

/* FOOTER (§8) — sitemap nav, contact, socials, brochure download, legal,
   a flourish divider. Server component. */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = 2026; // build-stamped; Date.* avoided per environment constraints
  const socials = Object.entries(settings.social).filter(([, url]) => Boolean(url)) as [
    string,
    string,
  ][];

  return (
    <footer className="bg-ink text-ivory">
      <FlourishDivider stroke="var(--champagne)" />
      <div className="container-edge grid gap-12 pb-16 pt-4 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand + contact */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-step-1">{settings.brandName}</p>
          <p className="max-w-xs text-[0.9rem] leading-relaxed text-ivory/70">
            {settings.contact.address}
          </p>
          <a href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`} className="text-ivory/80 hover:text-champagne">
            {settings.contact.phone}
          </a>
          <a href={`mailto:${settings.contact.email}`} className="text-ivory/80 hover:text-champagne">
            {settings.contact.email}
          </a>
        </div>

        {/* Sitemap */}
        <nav aria-label="Footer">
          <p className="mb-4 font-sans text-[0.7rem] uppercase tracking-[0.18em] text-champagne">
            Explore
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {settings.footerNav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[0.9rem] text-ivory/70 hover:text-champagne">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Brochure + socials */}
        <div className="flex flex-col gap-5">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.18em] text-champagne">
            Start planning
          </p>
          <EnquireButton
            source="brochure"
            variant="ghost"
            className="w-fit border-ivory/40 text-ivory hover:border-champagne hover:text-champagne"
          >
            Download brochure
          </EnquireButton>
          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("font-sans text-[0.72rem] uppercase tracking-[0.14em] text-ivory/70 hover:text-champagne")}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-edge flex flex-col items-center justify-between gap-3 py-5 text-[0.74rem] text-ivory/50 md:flex-row">
          <p>
            &copy; {year} {settings.brandName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-champagne">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-champagne">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
