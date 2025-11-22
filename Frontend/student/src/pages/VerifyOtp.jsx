import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderTwo } from '@/components/ui/loader';

const VerifyOtp = () => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.requestOtp(email);
      
      if (response.success) {
        setSuccess('OTP sent to your email successfully!');
        setStep('otp');
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.verifyOtp(email, otp);
      
      if (response.success && response.data.verified) {
        setSuccess('Email verified successfully!');
        
        // If user data is returned, auto-login
        if (response.data.user && response.data.token) {
          login(response.data.user, response.data.token);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } else {
          // Otherwise redirect to login
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-hidden flex items-center justify-center">
      {/* Dark Nebula Mesh Background */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: `
            radial-gradient(at 20% 80%, hsla(270, 100%, 50%, 0.1) 0px, transparent 50%), 
            radial-gradient(at 80% 20%, hsla(200, 100%, 50%, 0.1) 0px, transparent 50%), 
            radial-gradient(at 50% 50%, hsla(300, 100%, 50%, 0.1) 0px, transparent 50%)
          `
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Verify Email
            </h1>
            <p className="text-neutral-400">
              {step === 'email' ? 'Enter your email to receive OTP' : 'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          {step === 'email' ? (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
                >
                  {success}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-200">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-semibold py-6"
              >
                {loading ? <LoaderTwo /> : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
                >
                  {success}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-neutral-200">Enter OTP</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="6-digit code"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40 text-center text-2xl tracking-widest"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-semibold py-6"
              >
                {loading ? <LoaderTwo /> : 'Verify OTP'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                  setSuccess('');
                }}
                className="w-full text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                Change email address
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <div className="text-neutral-400 text-sm">
              Already verified?{' '}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="text-neutral-400 hover:text-neutral-300 text-sm transition-colors inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
