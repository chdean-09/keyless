import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

interface EmailType {
  name: string;
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ name, to, subject, text }: EmailType) {
  try {
    await transporter.sendMail({
      from: `"Keyless" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello, ${name}! Verify your email to use keyless</h2>
          <p>${text}</p>
          <p>Thank you for choosing!</p>
        </div>
      `
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}