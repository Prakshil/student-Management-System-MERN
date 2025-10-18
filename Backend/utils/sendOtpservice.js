import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import Otp from '../Models/otp.model.js';

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: String(process.env.SMTP_SECURE || 'true').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });
};

export const createOrUpdateOtp = async (email, otp) => {
  // upsert OTP document for this email
  await Otp.findOneAndUpdate(
    { email },
    { email, otp, subject: 'OTP Verification', to: email, createdAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

export const verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  if (!record) return false;
  // If the record exists, it hasn't expired yet due to TTL index
  // Consume OTP (delete it)
  await Otp.deleteOne({ _id: record._id });
  return true;
};