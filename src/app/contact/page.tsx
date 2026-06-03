import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { AvailabilityCalendar } from "@/components/sections/AvailabilityCalendar";
import { ContactForm } from "@/components/sections/ContactForm";
import { VenueMap } from "@/components/sections/VenueMap";
import { getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata, localBusinessJsonLd } from "@/lib/seo";

/* ============================================================================
   PAGE 18 — CONTACT + AVAILABILITY + FIND-US (/contact). Enquiry form +
   availability calendar (reads /api/availability) + map & directions.
   ============================================================================ */

const seo = {
  title: "Contact & Directions — Wedding Venue Essex | The Chigwell Marquees",
  description:
    "Enquire, check availability and find us — Chigwell Hall, 159 High Road, Chigwell, Essex IG7 6BD. 40 minutes from London, 15 minutes off the M25, free parking.",
  keywords: ["contact wedding venue Essex", "wedding venue Essex directions", "Chigwell Marquees contact"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/contact");
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [localBusinessJsonLd(settings), breadcrumbJsonLd(breadcrumbs)],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Hero / lede */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Get in touch</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Let&rsquo;s begin your day
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Tell us a little about your celebration, check your date, and book a free, no-obligation
          show-round of the grounds.
        </p>
      </SectionShell>

      {/* 2 · Enquiry form + 3 · Availability calendar */}
      <SectionShell tone="parchment" innerClassName="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div>
            <ScriptEyebrow>Enquire</ScriptEyebrow>
            <h2 className="mt-2 font-display text-step-2 text-ink">Tell us about your day</h2>
          </div>
          <ContactForm />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <ScriptEyebrow>Check your date</ScriptEyebrow>
            <h2 className="mt-2 font-display text-step-2 text-ink">Availability</h2>
          </div>
          <AvailabilityCalendar />
        </div>
      </SectionShell>

      {/* 4 · Map + find us */}
      <SectionShell tone="ivory" innerClassName="flex flex-col gap-10">
        <div className="text-center">
          <ScriptEyebrow align="center">How to reach us</ScriptEyebrow>
          <h2 className="mt-2 font-display text-step-3 text-ink">Find your way to Chigwell Hall</h2>
        </div>
        <VenueMap settings={settings} />
      </SectionShell>

      {/* 5 · Contact details */}
      <SectionShell tone="parchment" innerClassName="flex flex-col items-center gap-8 text-center">
        <ScriptEyebrow align="center">Speak to us</ScriptEyebrow>
        <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <dt className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-taupe">Phone</dt>
            <dd>
              <a href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`} className="font-display text-step-1 text-ink hover:text-gold-deep">
                {settings.contact.phone}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-taupe">Email</dt>
            <dd>
              <a href={`mailto:${settings.contact.email}`} className="font-display text-step-1 text-ink hover:text-gold-deep">
                {settings.contact.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-taupe">Visit</dt>
            <dd className="font-display text-step-1 text-ink">By appointment, any day</dd>
          </div>
        </dl>
        <FlourishDivider />
      </SectionShell>
    </>
  );
}
