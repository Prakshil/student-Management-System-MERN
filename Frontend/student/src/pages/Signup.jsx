import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderTwo } from '@/components/ui/loader';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    age: '',
    gender: '',
    address: '',
    skills: '',
    profileimage: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError('');
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.dob || !formData.gender) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 120)) {
      setError('Age must be between 18 and 120');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        phone: formData.phone ? parseInt(formData.phone) : undefined,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      };

      const response = await authAPI.signup(submitData);
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-hidden py-12">
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
        className="relative z-10 w-full max-w-2xl mx-4 lg:mx-auto"
      >
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-neutral-400">Join us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-neutral-200">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-200">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-200">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-neutral-200">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-neutral-200">Date of Birth *</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-neutral-200">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="18-120"
                  min="18"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-neutral-200">Gender *</Label>
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger className="bg-neutral-800/50 border-purple-500/20 text-white focus:border-purple-500/40">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-purple-500/20 text-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileimage" className="text-neutral-200">Profile Image</Label>
                <Input
                  id="profileimage"
                  name="profileimage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-neutral-800/50 border-purple-500/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-400 hover:file:bg-purple-500/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-neutral-200">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-neutral-200">Skills (comma-separated)</Label>
              <Input
                id="skills"
                name="skills"
                type="text"
                placeholder="e.g., JavaScript, Python, React"
                value={formData.skills}
                onChange={handleChange}
                className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-semibold py-6"
            >
              {loading ? <LoaderTwo /> : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-neutral-400 text-sm">
              Already have an account?{' '}
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

export default Signup;
