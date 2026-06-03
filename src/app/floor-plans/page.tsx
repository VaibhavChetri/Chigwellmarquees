import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { EnquiryBand } from "@/components/sections/EnquiryBand";
import { FloorPlanViewer } from "@/components/sections/FloorPlanViewer";
import { getSiteSettings, getVenues, resolveMedia } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/* ============================================================================
   PAGE 21 — FLOOR PLANS (/floor-plans). Aggregates every venue's plan +
   capacities for planners, reusing FloorPlanViewer. A real downloadable plan
   (Venue.floorPlan file) is offered when present; otherwise a tailored plan is
   provided on request (we don't ship placeholder PDFs).
   ============================================================================ */

const seo = {
  title: "Floor Plans & Capacities — Marquee Venue Essex | The Chigwell Marquees",
  description:
    "Floor plans and seated/standing capacities for the Mega Marquee, Mini Marquee and Secret Garden at Chigwell Hall, Essex — everything a planner needs in one place.",
  keywords: ["marquee floor plans Essex", "wedding venue capacities Essex", "Chigwell Marquees floor plan"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/floor-plans");
}

export default async function FloorPlansPage() {
  const [venues, settings] = await Promise.all([getVenues(), getSiteSettings()]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Floor Plans", path: "/floor-plans" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      {/* Hero */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">For planners</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Floor plans &amp; capacities
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Layouts and guest numbers for every space — and a tailored floor plan for your day,
          whenever you need it.
        </p>
      </SectionShell>

      {/* Per-venue plan */}
      {venues.map((venue, i) => {
        const floorPlan = resolveMedia(venue.floorPlan);
        const downloadable = floorPlan && floorPlan.type !== "video";
        return (
          <SectionShell
            key={venue.id}
            tone={i % 2 === 0 ? "parchment" : "ivory"}
            innerClassName="flex flex-col gap-8"
          >
            <div className="flex flex-col items-center text-center">
              <ScriptEyebrow align="center">{venue.name}</ScriptEyebrow>
            </div>
            <FloorPlanViewer venue={venue} media={floorPlan} />
            <div className="flex justify-center">
              {downloadable ? (
                <a
                  href={floorPlan.url}
                  download
                  className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-input)] bg-ink px-7 py-3 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-gold-deep"
                >
                  Download {venue.name} plan
                  <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <a
                  href="/enquire"
                  className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-input)] border border-ink/30 px-7 py-3 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
                >
                  Request a {venue.name} floor plan
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </SectionShell>
        );
      })}

      <SectionShell tone="parchment" innerClassName="flex flex-col items-center">
        <FlourishDivider />
      </SectionShell>

      <EnquiryBand settings={settings} />
    </>
  );
}
