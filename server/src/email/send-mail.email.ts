import nodemailer from "nodemailer";
import resetPasswordTemplate from "./reset-password.template.js";

// Function responsible for dispatching the password reset link via email
const sendMail = async (email: string, username: string, resetLink: string) => {
  // Checks if email credentials are set in environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    throw new Error("The EMAIL_USER or EMAIL_PASS variable is not defined in the .env file");

  // Configures Gmail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Sends password reset email with link and user context
  await transporter.sendMail({
    to: email,
    subject: "Reset Your Password - Digital Guardians",
    html: resetPasswordTemplate(username, resetLink),
  });
};

export default sendMail;
