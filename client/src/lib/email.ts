
// This is a frontend-only mock of an email service.
// In a full-stack app, this would be a server-side function using the Resend SDK.

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  console.log("----------------------------------------");
  console.log("📧 MOCK EMAIL SENDING (Frontend Only)");
  console.log("To:", data.to);
  console.log("Subject:", data.subject);
  console.log("Content:", data.html);
  console.log("----------------------------------------");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return true;
};
