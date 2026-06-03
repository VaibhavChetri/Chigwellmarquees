import type { Metadata } from "next";
import Link from "next/link";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { HostSignature } from "@/components/ornaments/HostSignature";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { LinkGilded } from "@/components/primitives/LinkGilded";
import { SectionShell } from "@/components/primitives/SectionShell";
import { AwardsStrip } from "@/components/sections/AwardsStrip";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { HeritageTimeline } from "@/components/sections/HeritageTimeline";
import { getAwards, getHistoryMilestones, getSiteSettings } from "@/lib/cms";
import { aboutPageJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/* ============================================================================
   PAGE 19 — ABOUT (/about). The story of Chigwell Hall, signed by a human,
   with the heritage timeline. AboutPage JSON-LD.
   ============================================================================ */

const seo = {
  title: "About — The Story of Chigwell Hall | The Chigwell Marquees",
  description:
    "The story of The Chigwell Marquees — a Grade II listed manor in 42 acres of Essex countryside, a dry-hire marquee venue for 30 to 1,000 guests, 40 minutes from London.",
  keywords: ["wedding venue Essex history", "Chigwell Hall", "about Chigwell Marquees"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/about");
}

export default async function AboutPage() {
  const [settings, milestones, awards] = await Promise.all([
    getSiteSettings(),
    getHistoryMilestones(),
    getAwards(),
  ]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [aboutPageJsonLd(seo.title, seo.description, "/about"), breadcrumbJsonLd(breadcrumbs)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Hero / lede */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Our story</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          A manor, 42 acres, and a feeling you can&rsquo;t fake
        </h1>
      </SectionShell>

      {/* 2 · Story (+ host signature when supplied) */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center text-center">
        <div className="max-w-2xl space-y-5">
          <p className="font-display text-step-2 italic leading-snug text-ink">
            The moment you arrive, down a tree-lined drive, Chigwell Hall reveals itself — Grade II
            listed, wrapped in 42 acres of Essex countryside, 40 minutes from Central London.
          </p>
          <p className="text-step-0 leading-relaxed text-ink-soft">
            We are a dry-hire marquee venue, which is the quiet secret to our flexibility: the Mega
            and Mini Marquees and the Secret Garden become a blank canvas you dress, cater and fill
            entirely your own way — for 30 guests or 1,000.
          </p>
          <p className="text-step-0 leading-relaxed text-ink-soft">
            A large part of our family are Bangladeshi, Turkish and South-Asian families, and we have
            learned their celebrations from the inside — the multi-day rhythm, the caterers, the
            traditions. Whoever you are, however you celebrate, the day is unmistakably yours.
          </p>
        </div>
        {settings.hostSignature && (
          <div className="mt-10">
            <HostSignature
              name={settings.hostSignature.name}
              role={settings.hostSignature.role}
              signatureMedia={settings.hostSignature.signatureMedia}
            />
          </div>
        )}
        <FlourishDivider />
        <div className="flex flex-wrap items-center justify-center gap-6">
          <LinkGilded href="/history">Our heritage</LinkGilded>
          <LinkGilded href="/faqs">Frequently asked questions</LinkGilded>
        </div>
      </SectionShell>

      {/* 3 · Heritage timeline */}
      <SectionShell tone="parchment" innerClassName="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center">
          <ScriptEyebrow align="center">Heritage</ScriptEyebrow>
          <h2 className="mt-3 font-display text-step-3 text-ink">The estate, in chapters</h2>
        </div>
        <HeritageTimeline milestones={milestones} />
        <div className="flex justify-center">
          <Link
            href="/history"
            className="font-sans text-[0.8rem] uppercase tracking-[0.16em] text-gold-deep hover:underline"
          >
            Read the heritage of Chigwell Hall &rarr;
          </Link>
        </div>
      </SectionShell>

      {/* 4 · Awards (only when real ones exist) */}
      {awards.length > 0 && (
        <SectionShell tone="ivory">
          <AwardsStrip awards={awards} />
        </SectionShell>
      )}

      {/* 5 · Enquiry band */}
      <EnquiryBand settings={settings} />
    </>
  );
}
