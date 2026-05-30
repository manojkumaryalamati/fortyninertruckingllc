---
name: Resend connector sending constraints
description: Why Resend emails 403 unless a domain is verified, and how to choose the from/to addresses.
---

# Resend connector: test mode vs verified domain

The Replit Resend connector (proxy to api.resend.com) sends through whatever
Resend account the connection is bound to. In **test mode** (no verified
domain) Resend will ONLY deliver to the account owner's own email address;
any other recipient returns HTTP 403 `validation_error` ("You can only send
testing emails to your own email address...").

To deliver to an arbitrary inbox (e.g. a business Gmail), the account owner
must verify a domain at resend.com/domains (add SPF + DKIM DNS records) and
the `from` address MUST be on that verified domain. Using
`onboarding@resend.dev` only works for emailing the account owner.

**Why:** This is Resend's anti-spam policy, not something code can bypass.
Debugging the 403 wasted cycles because the request shape was correct — the
blocker was purely account/domain config on the user's side.

**How to apply:** When wiring a public form to email via Resend, confirm
early whether a verified domain exists. If not, the realistic options are:
(a) user verifies a domain then send from `noreply@<domain>` to the target,
(b) send only to the Resend account owner email, or (c) use the Gmail
connector instead (no domain needed). Treat a persistent 403 here as a
user-action blocker, not a code bug.
