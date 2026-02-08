import emailjs from '@emailjs/browser';

// EmailJS Configuration
// TODO: Replace with your actual EmailJS keys from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  // Additional fields for template params
  from_name?: string;
  from_email?: string;
  phone?: string;
  message?: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  console.log("🚀 Sending email via EmailJS...", data);

  if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    console.warn("⚠️ EmailJS keys not configured. Email will not be sent.");
    console.log("To configure: Get your keys from https://emailjs.com and update client/src/lib/email.ts");
    // Fallback to mock behavior for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true; 
  }

  try {
    const templateParams = {
      to_email: data.to,
      subject: data.subject,
      from_name: data.from_name || "Website Visitor",
      from_email: data.from_email,
      phone: data.phone,
      message: data.message,
      html_content: data.html // In case your template supports raw HTML
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email sent successfully!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};
