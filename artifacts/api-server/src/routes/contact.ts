import { Router, type Request, type Response } from "express";
import { db, contactSubmissions } from "@workspace/db";
import { CreateContactSubmissionBody } from "@workspace/api-zod";
// Resend integration (Replit connector). The SDK handles auth/token refresh
// and proxies requests to the Resend API (https://api.resend.com).
import { ReplitConnectors } from "@replit/connectors-sdk";

const router = Router();

const connectors = new ReplitConnectors();

// Where contact form messages are delivered.
const CONTACT_RECIPIENT = "fortyninertrucking@gmail.com";
// Until a custom domain is verified in Resend, send from Resend's shared
// onboarding sender. Delivery to the account owner's inbox works out of the box.
const CONTACT_SENDER = "Forty Niner Trucking <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

router.post("/contact-submissions", async (req: Request, res: Response) => {
  const parsed = CreateContactSubmissionBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid contact submission");
    return res.status(400).json({
      title: "Invalid submission",
      detail: "Please check the form fields and try again.",
    });
  }

  const data = parsed.data;

  // Keep a stored record of every submission as a backup/audit trail.
  const [row] = await db
    .insert(contactSubmissions)
    .values(data)
    .returning({ id: contactSubmissions.id, status: contactSubmissions.status });

  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const subject = `New website inquiry${data.interestedIn ? ` — ${data.interestedIn}` : ""} from ${fullName}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.interestedIn ? `<p><strong>Interested in:</strong> ${escapeHtml(data.interestedIn)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  try {
    const emailRes = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        from: CONTACT_SENDER,
        to: [CONTACT_RECIPIENT],
        reply_to: data.email,
        subject,
        html,
      },
    });

    if (!emailRes.ok) {
      const detail = await emailRes.text().catch(() => "");
      req.log.error(
        { status: emailRes.status, detail, id: row.id },
        "Resend email failed",
      );
      return res.status(502).json({
        title: "Email delivery failed",
        detail: "We couldn't send your message right now. Please try again.",
      });
    }
  } catch (err) {
    req.log.error({ err, id: row.id }, "Error sending contact email");
    return res.status(502).json({
      title: "Email delivery failed",
      detail: "We couldn't send your message right now. Please try again.",
    });
  }

  req.log.info({ id: row.id }, "Stored and emailed contact submission");

  return res.status(201).json({ id: row.id, status: row.status });
});

export default router;
