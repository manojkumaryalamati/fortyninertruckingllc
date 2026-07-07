import { Router, type Request, type Response } from "express";
import { CreateContactSubmissionBody } from "@workspace/api-zod";
// Resend integration (Replit connector). The SDK handles auth/token refresh
// and proxies requests to the Resend API (https://api.resend.com).
import { ReplitConnectors } from "@replit/connectors-sdk";

const router = Router();

const connectors = new ReplitConnectors();

// Where contact form messages are delivered.
const CONTACT_RECIPIENT = "fortyninertrucking@gmail.com";
// Sends from the verified fortyninertrucking.llc domain in Resend.
const CONTACT_SENDER = "Forty Niner Trucking <noreply@fortyninertrucking.llc>";

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
      req.log.error({ status: emailRes.status, detail }, "Resend email failed");
      return res.status(502).json({
        title: "Email delivery failed",
        detail: "We couldn't send your message right now. Please try again.",
      });
    }
  } catch (err) {
    req.log.error({ err }, "Error sending contact email");
    return res.status(502).json({
      title: "Email delivery failed",
      detail: "We couldn't send your message right now. Please try again.",
    });
  }

  req.log.info("Emailed contact submission");

  return res.status(201).json({ status: "sent" });
});

export default router;
