/* ============================================================================
   EMAIL — Resend stub (§4). Until RESEND_API_KEY is set, these no-op and log so
   the enquiry flow round-trips end-to-end in development. Swap the body for the
   real Resend + React Email calls without changing callers.
   ============================================================================ */

import type { EnquiryInput } from "@/lib/validators";

const enabled = Boolean(process.env.RESEND_API_KEY);

export async function sendEnquiryNotification(
  enquiry: EnquiryInput,
  recipients: string[],
): Promise<void> {
  if (!enabled) {
    console.info("[email:stub] enquiry notification →", recipients.join(", "), {
      name: enquiry.name,
      email: enquiry.email,
      source: enquiry.source,
    });
    return;
  }
  // TODO: const resend = new Resend(process.env.RESEND_API_KEY); await resend.emails.send({...});
}

export async function sendEnquiryAutoReply(enquiry: EnquiryInput): Promise<void> {
  if (!enabled) {
    console.info("[email:stub] auto-reply →", enquiry.email);
    return;
  }
  // TODO: Resend auto-reply (React Email template).
}

/** Lead-gated brochure delivery (§7.6 / §11 §10). */
export async function deliverBrochure(enquiry: EnquiryInput): Promise<void> {
  if (!enabled) {
    console.info("[email:stub] brochure PDF →", enquiry.email);
    return;
  }
  // TODO: Resend email with the brochure PDF attachment.
}
