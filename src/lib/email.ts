// src/lib/email.ts

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  // Implement your email sending logic here, e.g., using nodemailer or an API
  console.log(`Sending email to ${options.to} with subject "${options.subject}"`);
  // For now, just simulate async operation
  return Promise.resolve();
}