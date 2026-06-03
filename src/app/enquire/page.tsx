import type { Metadata } from "next";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { HostSignature } from "@/components/ornaments/HostSignature";
import { ScriptEyebrow } from "@/components/ornaments/ScriptEyebrow";
import { SectionShell } from "@/components/primitives/SectionShell";
import { ContactForm } from "@/components/sections/ContactForm";
import { getSiteSettings } from "@/lib/cms";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/* ============================================================================
   PAGE 20 — ENQUIRE (/enquire). A calm, full-page enquiry reusing the shared
   ContactForm (same Zod schema as the drawer), posting source:'enquiry-page'.
   ============================================================================ */

const seo = {
  title: "Enquire & Book a Viewing | The Chigwell Marquees",
  description:
    "Enquire about your wedding or event at The Chigwell Marquees, Essex — and book a free, no-obligation show-round of Chigwell Hall and its 42-acre grounds.",
  keywords: ["enquire wedding venue Essex", "book a viewing wedding venue Essex", "Chigwell Marquees enquiry"],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(seo, "/enquire");
}

export default async function EnquirePage() {
  const settings = await getSiteSettings();
  const phoneHref = `tel:${settings.contact.phone.replace(/\s+/g, "")}`;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Enquire", path: "/enquire" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />

      {/* 1 · Warm hero */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center pt-40 text-center">
        <ScriptEyebrow align="center">Begin here</ScriptEyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-step-4 leading-[0.98] text-ink">
          Tell us about your day
        </h1>
        <p className="mt-6 max-w-xl text-step-1 text-ink-soft">
          Share a few details and we&rsquo;ll be in touch to arrange a free, no-obligation
          show-round. There&rsquo;s no rush, and no pressure — just a conversation.
        </p>
      </SectionShell>

      {/* 2 · Form */}
      <SectionShell tone="parchment" innerClassName="mx-auto w-full max-w-2xl">
        <ContactForm source="enquiry-page" />
      </SectionShell>

      {/* 3 · Reassurance + contact alternatives */}
      <SectionShell tone="ivory" innerClassName="flex flex-col items-center gap-6 text-center">
        <p className="max-w-xl font-display text-step-2 italic text-ink">
          Every enquiry is read by a real person — and every couple gets a free show-round.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ink-soft">
          <span>
            Prefer to talk?{" "}
            <a href={phoneHref} className="text-gold-deep hover:underline">
              {settings.contact.phone}
            </a>
          </span>
          <span>
            Or email{" "}
            <a href={`mailto:${settings.contact.email}`} className="text-gold-deep hover:underline">
              {settings.contact.email}
            </a>
          </span>
        </div>

        {/* 4 · Flourish + optional host signature */}
        <FlourishDivider />
        {settings.hostSignature && (
          <HostSignature
            name={settings.hostSignature.name}
            role={settings.hostSignature.role}
            signatureMedia={settings.hostSignature.signatureMedia}
          />
        )}
      </SectionShell>
    </>
  );
}
