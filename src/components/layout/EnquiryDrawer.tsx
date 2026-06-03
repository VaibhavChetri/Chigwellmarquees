"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { Button } from "@/components/primitives/Button";
import { Field, Select, Textarea } from "@/components/primitives/Field";
import { cn } from "@/lib/utils";
import type { Enquiry, EnquirySource } from "@/types";

/** Optional fields a CTA can prefill when opening the drawer (e.g. a venue page
 *  preselects its venuePreference so the lead arrives venue-attributed). */
export type EnquiryPrefill = {
  venuePreference?: Enquiry["venuePreference"];
  eventType?: Enquiry["eventType"];
};

/* ============================================================================
   GLOBAL ENQUIRY DRAWER (§8) — reusable from any CTA via useEnquiry().
   Posts to POST /api/enquiries (§7.6). The "make Enquire inevitable" surface.
   ============================================================================ */

type EnquiryContextValue = {
  open: (source?: EnquirySource, prefill?: EnquiryPrefill) => void;
  close: () => void;
  isOpen: boolean;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within <EnquiryProvider>");
  return ctx;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<EnquirySource>("global-drawer");
  const [prefill, setPrefill] = useState<EnquiryPrefill>({});
  const [formKey, setFormKey] = useState(0); // remounts the form so prefills apply
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const open = useCallback((src: EnquirySource = "global-drawer", pf: EnquiryPrefill = {}) => {
    setSource(src);
    setPrefill(pf);
    setFormKey((k) => k + 1);
    setState("idle");
    setErrorMsg(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // While open: lock scroll, close on Escape, move focus into the drawer and
  // trap Tab within it, then restore focus to the trigger on close (§12 a11y).
  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const focusable = () => {
      const el = dialogRef.current;
      if (!el) return [] as HTMLElement[];
      return Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((n) => n.offsetParent !== null);
    };

    // Focus the first control once the open transition begins.
    const raf = requestAnimationFrame(() => focusable()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastFocusedRef.current?.focus();
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || undefined,
      eventType: form.get("eventType"),
      eventDate: form.get("eventDate") || undefined,
      guestCount: form.get("guestCount") ? Number(form.get("guestCount")) : undefined,
      venuePreference: form.get("venuePreference") || undefined,
      message: form.get("message") || undefined,
      consent: form.get("consent") === "on",
      company: form.get("company") || undefined, // honeypot
      source,
    };
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <EnquiryContext.Provider value={value}>
      {children}

      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={cn(
          "fixed inset-0 z-[var(--z-overlay)] bg-[var(--overlay)] backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer — div, not <aside>: role="dialog" isn't an allowed role on
          <aside> (axe aria-allowed-role). */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Make an enquiry"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-[var(--z-drawer)] flex h-dvh w-full max-w-[34rem] flex-col bg-ivory shadow-[var(--shadow-soft)]",
          "transition-transform duration-500 ease-[var(--ease-cinematic)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Plain div, not <header>: inside role="dialog" a <header> registers as
            a second `banner` landmark (axe landmark-no-duplicate-banner). */}
        <div className="flex items-center justify-between border-b border-champagne px-7 py-5">
          <div>
            <p className="font-script text-[1.7rem] leading-none text-gold-deep">Tell us about your day</p>
            <p className="mt-1 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft">
              Free, no-obligation show-round
            </p>
          </div>
          <button
            onClick={close}
            aria-label="Close enquiry form"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold-deep"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        {/* data-lenis-prevent: let this panel scroll natively — Lenis otherwise
            hijacks wheel/touch globally and the drawer can't scroll on its own. */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-7 py-6">
          {state === "success" ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <FlourishDivider />
              <h2 className="font-display text-step-2 text-ink">Thank you.</h2>
              <p className="mt-3 max-w-sm text-ink-soft">
                Your enquiry is with us. We&rsquo;ll be in touch very soon to arrange your visit.
              </p>
              <Button onClick={close} variant="ghost" className="mt-8">
                Close
              </Button>
            </div>
          ) : (
            <form key={formKey} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Honeypot — visually hidden, off the tab order */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <Field label="Your name" name="name" autoComplete="name" required />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

              <Select
                label="Type of event"
                name="eventType"
                defaultValue={prefill.eventType ?? "wedding"}
                required
              >
                <option value="wedding">Wedding</option>
                <option value="cultural-wedding">Multicultural wedding</option>
                <option value="corporate">Corporate event</option>
                <option value="party">Party</option>
                <option value="ceremony">Civil ceremony</option>
                <option value="unsure">Not sure yet</option>
              </Select>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Preferred date" name="eventDate" type="date" />
                <Field label="Guests" name="guestCount" type="number" min={2} max={2000} inputMode="numeric" />
              </div>

              <Select
                label="Space"
                name="venuePreference"
                defaultValue={prefill.venuePreference ?? "unsure"}
              >
                <option value="mega-marquee">Mega Marquee</option>
                <option value="mini-marquee">Mini Marquee</option>
                <option value="secret-garden">Secret Garden</option>
                <option value="unsure">Help me choose</option>
              </Select>

              <Textarea label="Tell us a little more" name="message" rows={4} />

              <label className="flex items-start gap-3 text-[0.82rem] text-ink-soft">
                <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--gold-deep)]" />
                <span>I agree to be contacted about my enquiry and accept the privacy policy.</span>
              </label>

              {state === "error" && errorMsg && (
                <p role="alert" className="text-[0.82rem] text-rose-deep">
                  {errorMsg}
                </p>
              )}

              <Button type="submit" variant="primary" magnetic className="mt-1 w-full" >
                {state === "submitting" ? "Sending…" : "Send enquiry"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </EnquiryContext.Provider>
  );
}

/** Convenience CTA that opens the drawer with a given source. */
export function EnquireButton({
  source = "global-drawer",
  prefill,
  variant = "primary",
  magnetic,
  className,
  children = "Enquire",
}: {
  source?: EnquirySource;
  prefill?: EnquiryPrefill;
  variant?: "primary" | "ghost";
  magnetic?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <Button
      variant={variant}
      magnetic={magnetic}
      className={className}
      onClick={() => open(source, prefill)}
    >
      {children}
    </Button>
  );
}
