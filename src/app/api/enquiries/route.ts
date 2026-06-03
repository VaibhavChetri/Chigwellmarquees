import { NextResponse } from "next/server";

import { siteSettings } from "@/content/seed";
import { deliverBrochure, sendEnquiryAutoReply, sendEnquiryNotification } from "@/lib/email";
import { enquirySchema } from "@/lib/validators";

/* POST /api/enquiries (§7.6) — Zod-validate → honeypot + rate-limit
   → (Turnstile when configured) → persist → Resend notify + auto-reply
   (+ brochure PDF if source:'brochure') → 201. Errors 422 / 429. */

// Naive in-memory rate-limiter (per-IP, per-minute). Replace with Upstash/KV
// in production — sufficient to satisfy the §7.6 contract for the shell.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 422 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const enquiry = parsed.data;

  // Honeypot — silently accept-and-drop so bots get a 201 and don't retry.
  if (enquiry.company && enquiry.company.length > 0) {
    return NextResponse.json({ id: "ignored", status: "new" }, { status: 201 });
  }

  // TODO: verify enquiry.turnstileToken with TURNSTILE_SECRET_KEY when configured.
  // TODO: persist to Payload/Postgres. For the shell we generate an id + log.
  const id = `enq_${ip.replace(/\W/g, "")}_${enquiry.email.length}_${enquiry.source}`;

  await sendEnquiryNotification(enquiry, siteSettings.enquiryRecipients);
  await sendEnquiryAutoReply(enquiry);
  if (enquiry.source === "brochure") {
    await deliverBrochure(enquiry);
  }

  return NextResponse.json({ id, status: "new" }, { status: 201 });
}
