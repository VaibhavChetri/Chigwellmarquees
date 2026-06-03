import { EnquireButton, type EnquiryPrefill } from "@/components/layout/EnquiryDrawer";
import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { HostSignature } from "@/components/ornaments/HostSignature";
import { Button } from "@/components/primitives/Button";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { EnquirySource, SiteSettings } from "@/types";

/* WARM CLOSING ENQUIRY BAND (§8) — "Tell us about your day." Opens the global
   drawer; reassurance line; optional closing host signature. Server component;
   the EnquireButton leaf is the only client island. An optional prefill lets a
   venue/occasion page pre-attribute the lead (§11 §12 / Page 02). */
export function EnquiryBand({
  settings,
  withSignature = true,
  source = "global-drawer",
  prefill,
}: {
  settings: SiteSettings;
  withSignature?: boolean;
  source?: EnquirySource;
  prefill?: EnquiryPrefill;
}) {
  return (
    <SectionShell tone="ink" innerClassName="flex flex-col items-center text-center">
      <FlourishDivider stroke="var(--champagne)" />
      <p className="font-script text-[2rem] leading-none text-champagne">Happily ever after</p>
      <h2 className="mt-4 max-w-2xl font-display text-step-3 text-ivory">
        Tell us about your day.
      </h2>
      <p className="mt-5 max-w-md text-ivory/70">
        Book a free, no-obligation show-round and let us walk you through the grounds.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <EnquireButton source={source} prefill={prefill} magnetic className="bg-gold text-ink border-gold hover:bg-champagne">
          Enquire
        </EnquireButton>
        <Button href="/contact" variant="ghost" className="border-ivory/40 text-ivory hover:text-champagne hover:border-champagne">
          Book a viewing
        </Button>
      </div>
      {withSignature && settings.hostSignature && (
        <div className="mt-12 flex justify-center">
          <HostSignature
            name={settings.hostSignature.name}
            role={settings.hostSignature.role}
            signatureMedia={settings.hostSignature.signatureMedia}
          />
        </div>
      )}
    </SectionShell>
  );
}
