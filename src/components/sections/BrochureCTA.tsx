"use client";

import { useEnquiry } from "@/components/layout/EnquiryDrawer";
import { Sprig } from "@/components/ornaments/svgs";
import { cn } from "@/lib/utils";

/* BROCHURE + INFO & PRICING DUAL CARDS (§8, [NMP]).
   Brochure is lead-gated → opens the drawer with source 'brochure' (the API
   delivers the PDF via Resend when configured). Info & Pricing opens the
   standard enquiry drawer. */
export function BrochureCTA({ className }: { className?: string }) {
  const { open } = useEnquiry();

  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      <Card
        title="Download the brochure"
        body="Our full guide to spaces, capacities and how a day with us unfolds — sent straight to your inbox."
        action="Get the brochure"
        onClick={() => open("brochure")}
      />
      <Card
        title="Info & pricing"
        body="Tell us your date and guest numbers and we&rsquo;ll put together tailored pricing for your celebration."
        action="Request pricing"
        onClick={() => open("global-drawer")}
      />
    </div>
  );
}

function Card({
  title,
  body,
  action,
  onClick,
}: {
  title: string;
  body: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-champagne bg-ivory p-8 text-left",
        "transition-all duration-[var(--dur-micro)] ease-[var(--ease-cinematic)]",
        "hover:border-gold hover:shadow-[var(--shadow-soft)]",
      )}
    >
      <Sprig className="h-6 w-16 text-gold/70" stroke="var(--gold)" />
      <h3 className="font-display text-step-2 text-ink">{title}</h3>
      <p className="text-ink-soft" dangerouslySetInnerHTML={{ __html: body }} />
      <span className="mt-2 inline-flex items-center gap-2 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-gold-deep">
        {action}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </button>
  );
}
