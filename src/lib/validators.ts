/* ============================================================================
   VALIDATORS — one Zod schema validating client + server + DB (§4 Forms).
   The Enquiry schema is the contract for POST /api/enquiries (§7.6).
   ============================================================================ */

import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Please tell us your name").max(120),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  eventType: z.enum([
    "wedding",
    "cultural-wedding",
    "corporate",
    "party",
    "ceremony",
    "unsure",
  ]),
  eventDate: z.string().optional().or(z.literal("")),
  guestCount: z.coerce.number().int().positive().max(2000).optional(),
  venuePreference: z
    .enum(["mega-marquee", "mini-marquee", "secret-garden", "unsure"])
    .optional(),
  message: z.string().max(2000).optional().or(z.literal("")),
  source: z.enum([
    "enquiry-page",
    "global-drawer",
    "contact-page",
    "occasion-cta",
    "offer",
    "brochure",
  ]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy terms to continue" }),
  }),
  /** Honeypot — must stay empty. Bots fill it; humans never see it. */
  company: z.string().max(0).optional(),
  /** Cloudflare Turnstile token (verified server-side when configured). */
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
