import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Users,
  BookOpen,
  Award,
  Calendar as CalendarIcon,
  LogOut,
  Settings,
  Bell,
  TrendingUp,
  Clock,
  Plus,
  X,
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [date, setDate] = useState(new Date());
  
  // Load events from localStorage or use default events
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return [
      {
        id: 1,
        title: 'Parent-Teacher Meeting',
        date: '2025-11-25',
        time: '10:00 AM',
        type: 'meeting'
      },
      {
        id: 2,
        title: 'Annual Sports Day',
        date: '2025-12-02',
        time: 'All Day',
        type: 'event'
      }
    ];
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'event'
  });
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeClasses: 0,
    upcomingEvents: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated stats - replace with actual API calls
    setStats({
      totalStudents: 245,
      activeClasses: 12,
      upcomingEvents: events.length,
    });
  }, [events]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', type: 'event' });
    setShowEventForm(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
    }
  };

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'U';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative">
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

      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="bg-neutral-900/50 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  StudentMS
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-purple-500/20 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-purple-500/40">
                    <AvatarImage src={user?.profileimage} alt={user?.username} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                      {getInitials(user?.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Welcome back, {user?.username}!
                    </h2>
                    <p className="text-neutral-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Member since</p>
                  <p className="text-white font-semibold">
                    {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Total Students</p>
                    <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm">+12% from last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Active Classes</p>
                    <p className="text-3xl font-bold text-white">{stats.activeClasses}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span className="text-purple-400 text-sm">4 ongoing now</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <BookOpen className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Upcoming Events</p>
                    <p className="text-3xl font-bold text-white">{stats.upcomingEvents}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <CalendarIcon className="h-4 w-4 text-pink-400" />
                      <span className="text-pink-400 text-sm">Next in 2 days</span>
                    </div>
                  </div>
                  <div className="p-3 bg-pink-500/10 rounded-lg">
                    <Award className="h-8 w-8 text-pink-400" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6">
                <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Username</p>
                      <p className="text-white font-medium">{user?.username || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Email</p>
                      <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                    </div>
                  </div>

                  <Separator className="bg-neutral-800" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Phone</p>
                      <p className="text-white font-medium">{user?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Gender</p>
                      <p className="text-white font-medium capitalize">{user?.gender || 'Not specified'}</p>
                    </div>
                  </div>

                  <Separator className="bg-neutral-800" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Date of Birth</p>
                      <p className="text-white font-medium">
                        {user?.dob ? formatDate(user.dob) : 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-sm mb-1">Age</p>
                      <p className="text-white font-medium">{user?.age || 'N/A'}</p>
                    </div>
                  </div>

                  <Separator className="bg-neutral-800" />

                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Address</p>
                    <p className="text-white font-medium">{user?.address || 'Not provided'}</p>
                  </div>

                  <Separator className="bg-neutral-800" />

                  <div>
                    <p className="text-neutral-400 text-sm mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user?.skills && Array.isArray(user.skills) && user.skills.length > 0 ? (
                        user.skills.map((skill, index) => (
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
                </div>

                <Button
                  onClick={() => navigate('/profile/edit')}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                >
                  Edit Profile
                </Button>
              </Card>
            </motion.div>

            {/* Calendar & Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-neutral-900/50 backdrop-blur-sm border-purple-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Calendar</h3>
                  <Button
                    onClick={() => setShowEventForm(!showEventForm)}
                    size="sm"
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>

                {showEventForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6 p-4 bg-neutral-800/50 rounded-lg border border-purple-500/20"
                  >
                    <div className="space-y-3">
                      <div>
                        <Label className="text-neutral-200 text-sm">Event Title</Label>
                        <Input
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          placeholder="Enter event name"
                          className="bg-neutral-800 border-purple-500/20 text-white mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-neutral-200 text-sm">Date</Label>
                          <Input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            className="bg-neutral-800 border-purple-500/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-neutral-200 text-sm">Time</Label>
                          <Input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            className="bg-neutral-800 border-purple-500/20 text-white mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddEvent}
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
                        >
                          Add
                        </Button>
                        <Button
                          onClick={() => setShowEventForm(false)}
                          size="sm"
                          variant="outline"
                          className="border-purple-500/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="calendar-container">
                  <Calendar
                    onChange={setDate}
                    value={date}
                    className="custom-calendar bg-transparent border-none text-white"
                  />
                </div>

                <Separator className="bg-neutral-800 my-6" />

                <div>
                  <h4 className="text-white font-semibold mb-3">Upcoming Events</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {events.length > 0 ? (
                      events.map((event) => (
                        <div 
                          key={event.id}
                          className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 group"
                        >
                          <div className="p-2 bg-blue-500/20 rounded">
                            {event.type === 'meeting' ? (
                              <CalendarIcon className="h-4 w-4 text-blue-400" />
                            ) : (
                              <Award className="h-4 w-4 text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{event.title}</p>
                            <p className="text-neutral-400 text-xs">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })} • {event.time}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                          >
                            <X className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-500 text-sm text-center py-4">No events scheduled</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-calendar {
          width: 100%;
          border: none !important;
          background: transparent !important;
        }
        .custom-calendar .react-calendar__tile {
          color: #a3a3a3;
          background: transparent;
          border-radius: 8px;
          padding: 10px;
        }
        .custom-calendar .react-calendar__tile:hover {
          background: rgba(168, 85, 247, 0.1);
          color: #ffffff;
        }
        .custom-calendar .react-calendar__tile--active {
          background: linear-gradient(to right, rgb(59, 130, 246), rgb(168, 85, 247));
          color: #ffffff;
        }
        .custom-calendar .react-calendar__tile--now {
          background: rgba(168, 85, 247, 0.2);
          color: #ffffff;
        }
        .custom-calendar .react-calendar__month-view__weekdays {
          color: #737373;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        .custom-calendar .react-calendar__navigation button {
          color: #ffffff;
          background: transparent;
          font-size: 1rem;
        }
        .custom-calendar .react-calendar__navigation button:hover {
          background: rgba(168, 85, 247, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
