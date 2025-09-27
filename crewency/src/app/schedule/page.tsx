'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { User } from '@/types';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClockIcon,
  GlobeAltIcon,
  CheckIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'john@company.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'owner',
  organizationId: 'org1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  emailVerified: true,
  status: 'active',
};

const platforms = [
  { id: 'linkedin', name: 'LinkedIn', color: 'blue', icon: '💼' },
  { id: 'twitter', name: 'Twitter', color: 'sky', icon: '🐦' },
  { id: 'facebook', name: 'Facebook', color: 'indigo', icon: '📘' },
  { id: 'instagram', name: 'Instagram', color: 'pink', icon: '📷' },
];

const mockScheduledPosts = [
  {
    id: 1,
    content: 'Excited to share our latest product update! 🚀',
    platforms: ['linkedin', 'twitter'],
    scheduledFor: '2024-01-20T10:00:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: 2,
    content: 'Behind the scenes: Our team working on the next big thing!',
    platforms: ['facebook', 'instagram'],
    scheduledFor: '2024-01-21T14:30:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 3,
    content: '5 tips for better social media engagement in 2024',
    platforms: ['linkedin'],
    scheduledFor: '2024-01-22T09:15:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T11:45:00Z',
  },
  {
    id: 4,
    content: 'Customer success story: How Company X increased engagement by 300%',
    platforms: ['twitter', 'facebook'],
    scheduledFor: '2024-01-23T16:00:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T12:20:00Z',
  },
];

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
};

export default function SchedulePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getPostsForDate = (date: Date) => {
    return mockScheduledPosts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const getPostsForToday = () => {
    const today = new Date();
    return mockScheduledPosts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === today.toDateString();
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const todayPosts = getPostsForToday();

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
              <p className="text-gray-600 mt-2">Schedule and manage your social media posts across all platforms.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border border-gray-300">
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 text-sm font-medium ${
                    view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    view === 'day' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Day
                </button>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Schedule Post
              </button>
            </div>
          </div>
        </div>

        {/* Today's Posts */}
        {todayPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              Today's Scheduled Posts ({todayPosts.length})
            </h3>
            <div className="space-y-2">
              {todayPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {post.platforms.map((platformId) => {
                        const platform = platforms.find(p => p.id === platformId);
                        return (
                          <span key={platformId} className="text-lg">
                            {platform?.icon}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.content}</p>
                      <p className="text-xs text-gray-500">
                        {formatTime(post.scheduledFor)} • {post.platforms.length} platform(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-600">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Calendar Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-24"></div>;
                }

                const isToday = date.toDateString() === today.toDateString();
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                const dayPosts = getPostsForDate(date);

                return (
                  <motion.div
                    key={date.toISOString()}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDate(date)}
                    className={`h-24 p-2 border border-gray-200 rounded-lg cursor-pointer transition-all ${
                      isToday
                        ? 'bg-blue-50 border-blue-300'
                        : isSelected
                        ? 'bg-gray-50 border-gray-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </span>
                      {dayPosts.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {dayPosts.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate"
                        >
                          {formatTime(post.scheduledFor)} {post.content.substring(0, 20)}...
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {formatDate(selectedDate)}
            </h3>
            {getPostsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getPostsForDate(selectedDate).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {post.platforms.map((platformId) => {
                          const platform = platforms.find(p => p.id === platformId);
                          return (
                            <span key={platformId} className="text-lg">
                              {platform?.icon}
                            </span>
                          );
                        })}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{post.content}</p>
                        <p className="text-sm text-gray-500">
                          {formatTime(post.scheduledFor)} • {post.platforms.length} platform(s)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No posts scheduled for this date</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Schedule a post
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}