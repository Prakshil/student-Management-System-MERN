import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderTwo } from '@/components/ui/loader';
import { ArrowLeft } from 'lucide-react';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    age: user?.age || '',
    gender: user?.gender || '',
    address: user?.address || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : '',
    profileimage: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.profileimage || '');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, gender: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

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

      const response = await userAPI.updateUser(user._id, submitData);

      if (response.success && response.data) {
        updateUser(response.data);
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(response.message || 'Update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0] || 'Update failed. Please try again.');
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

      <div className="relative z-10 max-w-4xl mx-4 lg:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="text-neutral-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card className="bg-neutral-900/50 backdrop-blur-xl border-purple-500/20 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Edit Profile
              </h1>
              <p className="text-neutral-400">Update your personal information</p>
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

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Profile Image Preview */}
              {previewImage && (
                <div className="flex justify-center mb-6">
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/40"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-neutral-200">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-200">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-neutral-800/30 border-purple-500/20 text-neutral-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-neutral-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-neutral-200">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-neutral-200">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-neutral-200">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-neutral-800/50 border-purple-500/20 text-white placeholder:text-neutral-500 focus:border-purple-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-neutral-200">Gender</Label>
                  <Select value={formData.gender} onValueChange={handleSelectChange}>
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

                <div className="space-y-2 md:col-span-2">
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

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="flex-1 border-purple-500/20 text-neutral-300 hover:text-white hover:bg-purple-500/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-white font-semibold py-6"
                >
                  {loading ? <LoaderTwo /> : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
