import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateOtp, sendOtpEmail, createOrUpdateOtp, verifyOtp } from "../utils/sendOtpservice.js";

export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json(new ApiError(400, "Email is required"));
    const otp = generateOtp();
    await createOrUpdateOtp(email, otp);
    await sendOtpEmail(email, otp);
    return res.status(200).json(new ApiResponse(200, { email }, "OTP sent successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Failed to send OTP", error.message));
  }
};

export const validateOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json(new ApiError(400, "Email and OTP are required"));
    const ok = await verifyOtp(email, otp);
    if (!ok) return res.status(400).json(new ApiError(400, "Invalid or expired OTP"));
    return res.status(200).json(new ApiResponse(200, { email, verified: true }, "OTP verified"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Failed to verify OTP", error.message));
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, 'Failed to logout', error.message));
  }
};
