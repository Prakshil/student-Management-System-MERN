import "dotenv/config";
import nodemailer from "nodemailer";

const main = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection OK");

  const to = process.env.TEST_EMAIL || process.env.SMTP_USER;
  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject: "SMTP test from StudentMS",
    text: "This is a test email to verify SMTP settings.",
    html: "<b>This is a test email to verify SMTP settings.</b>",
  });

  console.log("Message sent:", info.messageId);
  const url = nodemailer.getTestMessageUrl(info);
  if (url) console.log("Preview URL (Ethereal):", url);
};

main().catch((e) => {
  console.error("SMTP test failed:", e.message);
  process.exit(1);
});