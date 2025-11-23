import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import Otp from '../Models/otp.model.js';

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpEmail = async (email, otp) => {
  console.log('Creating email transporter...');
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service directly
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    },
    debug: true, // Enable debug output
    logger: true // Log to console
  });

  console.log('Verifying transporter connection...');
  try {
    await transporter.verify();
    console.log('Transporter verified successfully');
  } catch (verifyError) {
    console.error('Transporter verification failed:', verifyError);
    throw verifyError;
  }

  const mailOptions = {
    from: `"StudentMS" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your OTP Code - StudentMS',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <h2 style="color: white;">Your Verification Code</h2>
        <p>Use this code to verify your email:</p>
        <div style="background: white; color: #667eea; font-size: 32px; font-weight: bold; padding: 20px; text-align: center; border-radius: 10px; letter-spacing: 8px;">
          ${otp}
        </div>
        <p style="margin-top: 20px; font-size: 14px;">This code expires in 10 minutes.</p>
        <p style="font-size: 12px; opacity: 0.8;">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
    text: `Your OTP code is ${otp}. This code expires in 10 minutes.`,
  };

  console.log(`Sending email to ${email}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', info.messageId);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  
  return info;
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