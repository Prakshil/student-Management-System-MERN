import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Calendar,
  Shield,
  Trash2,
  Eye,
  Search,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  GraduationCap,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'students'
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchDashboardData();
  }, [user, navigate, pagination.page, searchTerm, activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const statsRes = await adminAPI.getStats();

      if (statsRes.success) {
        setStats(statsRes.data);
      }

      if (activeTab === 'users') {
        const usersRes = await adminAPI.getAllUsers({ 
          page: pagination.page, 
          limit: pagination.limit,
          search: searchTerm 
        });
        if (usersRes.success) {
          setUsers(usersRes.data.users);
          setPagination(prev => ({ ...prev, ...usersRes.data.pagination }));
        }
      } else {
        const studentsRes = await adminAPI.getAllStudents({ 
          page: pagination.page, 
          limit: pagination.limit,
          search: searchTerm 
        });
        if (studentsRes.success) {
          setStudents(studentsRes.data.students);
          setPagination(prev => ({ ...prev, ...studentsRes.data.pagination }));
        }
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await adminAPI.deleteUser(userId);
      if (response.success) {
        fetchDashboardData();
        setShowUserDetails(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const response = await adminAPI.getUserById(userId);
      if (response.success) {
        setSelectedUser(response.data);
        setShowUserDetails(true);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await adminAPI.deleteStudent(studentId);
      if (response.success) {
        fetchDashboardData();
        setShowStudentDetails(false);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const handleViewStudent = async (studentId) => {
    try {
      const response = await adminAPI.getStudentById(studentId);
      if (response.success) {
        setSelectedStudent(response.data);
        setShowStudentDetails(true);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0" 
        style={{
          background: `
            radial-gradient(at 20% 80%, hsla(270, 100%, 50%, 0.15) 0px, transparent 50%), 
            radial-gradient(at 80% 20%, hsla(200, 100%, 50%, 0.15) 0px, transparent 50%)
          `
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shield className="h-7 w-7 text-purple-500" />
                  Admin Dashboard
                </h1>
                <p className="text-neutral-400 text-sm mt-1">Manage users and view analytics</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right mr-4">
                  <p className="text-white font-medium">{user?.username}</p>
                  <p className="text-neutral-400 text-sm">Administrator</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Total Users</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{stats?.totalUsers || 0}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Total Students</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{stats?.totalStudents || 0}</h3>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-green-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Administrators</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{stats?.totalAdmins || 0}</h3>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Shield className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">New This Month</p>
                    <h3 className="text-3xl font-bold text-white mt-2">
                      {(stats?.newUsersThisMonth || 0) + (stats?.newStudentsThisMonth || 0)}
                    </h3>
                  </div>
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-orange-400" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User/Student List */}
            <div className="lg:col-span-2">
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6">
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-purple-500/20">
                  <button
                    onClick={() => {
                      setActiveTab('users');
                      setPagination({ page: 1, limit: 10 });
                      setSearchTerm('');
                    }}
                    className={`pb-3 px-4 font-medium transition-all ${
                      activeTab === 'users'
                        ? 'text-purple-400 border-b-2 border-purple-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Users ({stats?.totalUsers || 0})
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('students');
                      setPagination({ page: 1, limit: 10 });
                      setSearchTerm('');
                    }}
                    className={`pb-3 px-4 font-medium transition-all ${
                      activeTab === 'students'
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Students ({stats?.totalStudents || 0})
                    </div>
                  </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {activeTab === 'users' ? 'User Management' : 'Student Management'}
                  </h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-neutral-800 border-purple-500/20 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {activeTab === 'users' ? (
                    users.map((userData) => (
                    <div
                      key={userData._id}
                      className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all group"
                    >
                      <Avatar className="h-12 w-12 border-2 border-purple-500/30">
                        <AvatarImage src={userData.profileimage} alt={userData.username} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {getInitials(userData.username)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{userData.username}</p>
                          {userData.role === 'admin' && (
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-neutral-400 text-sm">{userData.email}</p>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => handleViewUser(userData._id)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {userData.role !== 'admin' && (
                          <Button
                            onClick={() => handleDeleteUser(userData._id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                  ) : (
                    students.map((studentData) => (
                      <div
                        key={studentData._id}
                        className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-green-500/10 hover:border-green-500/30 transition-all group"
                      >
                        <Avatar className="h-12 w-12 border-2 border-green-500/30">
                          <AvatarImage src={studentData.profileImage} alt={studentData.firstname} />
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                            {getInitials(`${studentData.firstname} ${studentData.lastname}`)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <p className="text-white font-medium">
                            {studentData.firstname} {studentData.lastname}
                          </p>
                          <p className="text-neutral-400 text-sm">{studentData.email}</p>
                          <p className="text-neutral-500 text-xs mt-1">
                            Age: {studentData.age} • {studentData.gender}
                          </p>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => handleViewStudent(studentData._id)}
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteStudent(studentData._id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <Button
                      onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      disabled={pagination.page === 1}
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30"
                    >
                      Previous
                    </Button>
                    <span className="text-white px-4 py-2">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <Button
                      onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
                      disabled={pagination.page === pagination.pages}
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar - Charts & Recent Items */}
            <div className="space-y-6">
              {/* Gender Distribution */}
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-400" />
                  Gender Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-neutral-400 text-sm mb-2">Users</p>
                    {stats?.userGenderStats?.map((item) => (
                      <div key={`user-${item._id}`} className="flex items-center justify-between mb-2">
                        <span className="text-neutral-300 capitalize text-sm">{item._id}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${(item.count / (stats?.totalUsers || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-6 text-sm">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-neutral-800" />
                  <div>
                    <p className="text-neutral-400 text-sm mb-2">Students</p>
                    {stats?.studentGenderStats?.map((item) => (
                      <div key={`student-${item._id}`} className="flex items-center justify-between mb-2">
                        <span className="text-neutral-300 capitalize text-sm">{item._id}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                              style={{ width: `${(item.count / (stats?.totalStudents || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-medium w-6 text-sm">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-neutral-400 text-sm mb-2">Recent Users</p>
                    {stats?.recentUsers?.slice(0, 3).map((recentUser) => (
                      <div key={recentUser._id} className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8 border border-purple-500/30">
                          <AvatarImage src={recentUser.profileimage} alt={recentUser.username} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {getInitials(recentUser.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{recentUser.username}</p>
                          <p className="text-neutral-400 text-xs">{formatDate(recentUser.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-neutral-800" />
                  <div>
                    <p className="text-neutral-400 text-sm mb-2">Recent Students</p>
                    {stats?.recentStudents?.slice(0, 3).map((recentStudent) => (
                      <div key={recentStudent._id} className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8 border border-green-500/30">
                          <AvatarImage src={recentStudent.profileImage} alt={recentStudent.firstname} />
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xs">
                            {getInitials(`${recentStudent.firstname} ${recentStudent.lastname}`)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {recentStudent.firstname} {recentStudent.lastname}
                          </p>
                          <p className="text-neutral-400 text-xs">{formatDate(recentStudent.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-purple-500/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white">User Details</h3>
              <Button
                onClick={() => setShowUserDetails(false)}
                variant="outline"
                size="sm"
                className="border-purple-500/30"
              >
                Close
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-purple-500/40">
                  <AvatarImage src={selectedUser.profileimage} alt={selectedUser.username} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                    {getInitials(selectedUser.username)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white text-2xl font-bold">{selectedUser.username}</h4>
                  <p className="text-neutral-400">{selectedUser.email}</p>
                  {selectedUser.role === 'admin' && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mt-2">
                      Administrator
                    </Badge>
                  )}
                </div>
              </div>

              <Separator className="bg-neutral-800" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-400 text-sm">Phone</p>
                  <p className="text-white font-medium">{selectedUser.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Date of Birth</p>
                  <p className="text-white font-medium">{selectedUser.dob ? formatDate(selectedUser.dob) : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Age</p>
                  <p className="text-white font-medium">{selectedUser.age || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Gender</p>
                  <p className="text-white font-medium capitalize">{selectedUser.gender || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-neutral-400 text-sm">Address</p>
                  <p className="text-white font-medium">{selectedUser.address || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-neutral-400 text-sm mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills && selectedUser.skills.length > 0 ? (
                      selectedUser.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-300"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-neutral-500">No skills added</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Joined</p>
                  <p className="text-white font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Last Updated</p>
                  <p className="text-white font-medium">{formatDate(selectedUser.updatedAt)}</p>
                </div>
              </div>

              {selectedUser.role !== 'admin' && (
                <Button
                  onClick={() => handleDeleteUser(selectedUser._id)}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentDetails && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-green-500/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-white">Student Details</h3>
              <Button
                onClick={() => setShowStudentDetails(false)}
                variant="outline"
                size="sm"
                className="border-green-500/30"
              >
                Close
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-green-500/40">
                  <AvatarImage src={selectedStudent.profileImage} alt={selectedStudent.firstname} />
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-2xl">
                    {getInitials(`${selectedStudent.firstname} ${selectedStudent.lastname}`)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white text-2xl font-bold">
                    {selectedStudent.firstname} {selectedStudent.lastname}
                  </h4>
                  <p className="text-neutral-400">{selectedStudent.email}</p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mt-2">
                    Student
                  </Badge>
                </div>
              </div>

              <Separator className="bg-neutral-800" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-400 text-sm">Phone</p>
                  <p className="text-white font-medium">{selectedStudent.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Age</p>
                  <p className="text-white font-medium">{selectedStudent.age || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Gender</p>
                  <p className="text-white font-medium capitalize">{selectedStudent.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Enrolled</p>
                  <p className="text-white font-medium">{formatDate(selectedStudent.createdAt)}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Last Updated</p>
                  <p className="text-white font-medium">{formatDate(selectedStudent.updatedAt)}</p>
                </div>
              </div>

              <Button
                onClick={() => handleDeleteStudent(selectedStudent._id)}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Student
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
