import "dotenv/config";
import nodemailer from "nodemailer";

const main = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true", // true only for 465
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 20000,
    greetingTimeout: 10000,
    socketTimeout: 30000,
  });

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection OK");

  const to = process.env.TEST_EMAIL || process.env.SMTP_USER;
  if (!to) throw new Error("Set TEST_EMAIL in .env to a real recipient address");

  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject: "SMTP test from StudentMS",
    text: "This is a test email to verify Gmail SMTP settings.",
  });

  console.log("Message sent:", info.messageId);
};

main().catch((e) => {
  console.error("SMTP test failed:", e.message);
  process.exit(1);
});
