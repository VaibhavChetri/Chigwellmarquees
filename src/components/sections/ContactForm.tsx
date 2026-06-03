"use client";

import Script from "next/script";
import { useRef, useState } from "react";

import { FlourishDivider } from "@/components/ornaments/FlourishDivider";
import { Button } from "@/components/primitives/Button";
import { Field, Select, Textarea } from "@/components/primitives/Field";
import { enquirySchema } from "@/lib/validators";
import type { EnquirySource } from "@/types";

type Errors = Record<string, string>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/* CONTACT / ENQUIRY FORM (§Page 18 / §Page 20) — the full enquiry form, inline.
   Validated with the shared Zod schema (client + server), fully labelled, with
   an error summary that focuses and links to fields (a11y). The `source` prop
   lets the contact page and the /enquire page reuse one form. Honeypot +
   Cloudflare Turnstile (when a site key is configured) + the server's
   rate-limit guard the endpoint; success is announced via a live region. */
export function ContactForm({ source = "contact-page" }: { source?: EnquirySource }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      company: form.get("company") || undefined,
      turnstileToken: (form.get("cf-turnstile-response") as string) || undefined,
      source,
    };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setState("submitting");
    setFormError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }
      setState("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setState("error");
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col items-center gap-4 text-center outline-none"
      >
        <FlourishDivider />
        <h2 className="font-display text-step-2 text-ink">Thank you.</h2>
        <p className="max-w-md text-ink-soft">
          Your enquiry is with us — we&rsquo;ll be in touch very soon to arrange your visit.
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-card)] border border-rose-deep/40 bg-blush/30 p-4 outline-none"
        >
          <p className="font-sans text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-rose-deep">
            Please check the following:
          </p>
          <ul className="mt-2 list-disc pl-5 text-[0.85rem] text-rose-deep">
            {errorEntries.map(([key, message]) => (
              <li key={key}>
                <a href={`#field-${key}`} className="underline-offset-2 hover:underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-name" label="Your name" name="name" autoComplete="name" required error={errors.name} />
        <Field id="field-email" label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-phone" label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
        <Select id="field-eventType" label="Type of event" name="eventType" defaultValue="wedding" required error={errors.eventType}>
          <option value="wedding">Wedding</option>
          <option value="cultural-wedding">Multicultural wedding</option>
          <option value="corporate">Corporate event</option>
          <option value="party">Party</option>
          <option value="ceremony">Civil ceremony</option>
          <option value="unsure">Not sure yet</option>
        </Select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="field-eventDate" label="Preferred date" name="eventDate" type="date" error={errors.eventDate} />
        <Field id="field-guestCount" label="Guests" name="guestCount" type="number" min={2} max={2000} inputMode="numeric" error={errors.guestCount} />
      </div>
      <Select id="field-venuePreference" label="Space" name="venuePreference" defaultValue="unsure" error={errors.venuePreference}>
        <option value="mega-marquee">Mega Marquee</option>
        <option value="mini-marquee">Mini Marquee</option>
        <option value="secret-garden">Secret Garden</option>
        <option value="unsure">Help me choose</option>
      </Select>
      <Textarea id="field-message" label="Tell us about your day" name="message" rows={5} error={errors.message} />

      <label className="flex items-start gap-3 text-[0.85rem] text-ink-soft" id="field-consent">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--gold-deep)]" />
        <span>I agree to be contacted about my enquiry and accept the privacy policy.</span>
      </label>
      {errors.consent && (
        <p role="alert" className="text-[0.8rem] text-rose-deep">
          {errors.consent}
        </p>
      )}

      {/* Cloudflare Turnstile — only when a site key is configured (§4 spam). */}
      {TURNSTILE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" />
        </>
      )}

      {state === "error" && formError && (
        <p role="alert" className="text-[0.85rem] text-rose-deep">
          {formError}
        </p>
      )}

      <Button type="submit" variant="primary" magnetic className="mt-1 w-fit">
        {state === "submitting" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
