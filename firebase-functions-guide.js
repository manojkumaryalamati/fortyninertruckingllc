
/**
 * FIREBASE CLOUD FUNCTION FOR RESEND
 * 
 * Since this is a frontend-only application, we cannot run server-side code directly.
 * However, you can deploy this function to your Firebase project to handle emails securely.
 * 
 * INSTRUCTIONS:
 * 1. Initialize Firebase Functions in a separate folder: `firebase init functions`
 * 2. Install Resend in that folder: `npm install resend`
 * 3. Replace the contents of `functions/index.js` with the code below.
 * 4. Set your Resend API key: `firebase functions:secrets:set RESEND_API_KEY`
 * 5. Deploy: `firebase deploy --only functions`
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { Resend } = require("resend");
const { defineSecret } = require("firebase-functions/params");

const resendApiKey = defineSecret("RESEND_API_KEY");

exports.sendContactEmail = onDocumentCreated(
  {
    document: "contact_submissions/{docId}",
    secrets: [resendApiKey],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      return;
    }

    const data = snapshot.data();
    const resend = new Resend(resendApiKey.value());

    try {
      await resend.emails.send({
        from: "FortyNiner Website <onboarding@resend.dev>", // Update this after verifying domain
        to: ["fortyninertrucking@gmail.com"],
        subject: `New Contact Request: ${data.interestedIn}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Interest:</strong> ${data.interestedIn}</p>
          <hr />
          <h3>Message:</h3>
          <p>${data.message}</p>
        `,
      });
      
      console.log(`Email sent successfully for document ${event.params.docId}`);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
);
