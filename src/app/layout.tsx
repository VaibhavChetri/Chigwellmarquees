import type { Metadata, Viewport } from "next";

import { fraunces, geistSans, pinyon } from "@/app/fonts";
import {
  AnnouncementBar,
  CookieConsent,
  Cursor,
  EnquiryProvider,
  Footer,
  Header,
  SmoothScroll,
} from "@/components/layout";
import { siteSettings } from "@/content/seed";
import { getFeaturedOffer, getSiteSettings } from "@/lib/cms";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FBF7F0",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    ...buildMetadata(settings.defaultSeo, "/"),
    title: {
      default: settings.defaultSeo.title,
      template: `%s | ${settings.brandName}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, featuredOffer] = await Promise.all([getSiteSettings(), getFeaturedOffer()]);

  return (
    <html
      lang="en-GB"
      className={cn(fraunces.variable, geistSans.variable, pinyon.variable)}
    >
      <body>
        {/* Sitewide LocalBusiness / EventVenue JSON-LD (§5) */}
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(siteSettings)) }}
        />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <EnquiryProvider>
          <SmoothScroll>
            {/* Announcement + header share one fixed stack at the top so the
                slim offer strip sits ABOVE the transparent nav instead of the
                fixed header painting over it. */}
            <div className="fixed inset-x-0 top-0 z-[var(--z-header)]">
              <AnnouncementBar settings={settings} featuredOffer={featuredOffer} />
              <Header settings={settings} />
            </div>
            <main id="main">{children}</main>
            <Footer settings={settings} />
          </SmoothScroll>
          <Cursor />
          <CookieConsent />
        </EnquiryProvider>
      </body>
    </html>
  );
}
