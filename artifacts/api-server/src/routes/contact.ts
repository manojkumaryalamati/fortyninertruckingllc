import { Router, type Request, type Response } from "express";
import { db, contactSubmissions } from "@workspace/db";
import { CreateContactSubmissionBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact-submissions", async (req: Request, res: Response) => {
  const parsed = CreateContactSubmissionBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid contact submission");
    return res.status(400).json({
      title: "Invalid submission",
      detail: "Please check the form fields and try again.",
    });
  }

  const [row] = await db
    .insert(contactSubmissions)
    .values(parsed.data)
    .returning({ id: contactSubmissions.id, status: contactSubmissions.status });

  req.log.info({ id: row.id }, "Stored contact submission");

  return res.status(201).json({ id: row.id, status: row.status });
});

export default router;
