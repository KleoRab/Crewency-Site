'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  PlusIcon,
  ClockIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { ScheduledPost, SocialAccount } from '@/types';

// Mock data
const mockSocialAccounts: SocialAccount[] = [
  {
    id: '1',
    userId: 'user1',
    oauthAccountId: 'oauth1',
    platform: 'linkedin',
    platformUsername: 'company',
    platformDisplayName: 'Our Company',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    oauthAccountId: 'oauth2',
    platform: 'twitter',
    platformUsername: 'company_twitter',
    platformDisplayName: 'Our Company',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    userId: 'user1',
    organizationId: 'org1',
    socialAccountId: '1',
    content: 'Excited to share our latest product launch! 🚀 #innovation #tech',
    scheduledFor: '2024-01-20T10:00:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    organizationId: 'org1',
    socialAccountId: '2',
    content: 'Check out our new features! #product #update',
    scheduledFor: '2024-01-20T14:00:00Z',
    status: 'scheduled',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

const PostCard = ({ post, socialAccount }: { post: ScheduledPost; socialAccount: SocialAccount }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          post.status === 'scheduled' ? 'bg-yellow-400' :
          post.status === 'published' ? 'bg-green-400' :
          post.status === 'failed' ? 'bg-red-400' : 'bg-gray-400'
        }`}></div>
        <span className="text-sm font-medium text-gray-900 capitalize">
          {socialAccount.platform}
        </span>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(post.scheduledFor).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </span>
    </div>
    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.content}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <ClockIcon className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-500">
          {new Date(post.scheduledFor).toLocaleDateString()}
        </span>
      </div>
      <div className="flex space-x-1">
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <DocumentTextIcon className="h-4 w-4" />
        </button>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <PhotoIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getPostsForDate = (date: Date) => {
    return mockScheduledPosts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-24"></div>;
            }
            
            const posts = getPostsForDate(day);
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`h-24 p-1 text-left border border-gray-100 hover:bg-gray-50 rounded-lg transition-colors ${
                  isSelected ? 'bg-blue-50 border-blue-200' : ''
                } ${isToday ? 'bg-blue-100' : ''}`}
              >
                <div className={`text-sm font-medium ${
                  isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {day.getDate()}
                </div>
                <div className="mt-1 space-y-1">
                  {posts.slice(0, 2).map((post, postIndex) => (
                    <div
                      key={postIndex}
                      className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate"
                    >
                      {post.content.substring(0, 20)}...
                    </div>
                  ))}
                  {posts.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{posts.length - 2} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Schedule() {
  const [socialAccounts] = useState<SocialAccount[]>(mockSocialAccounts);
  const [scheduledPosts] = useState<ScheduledPost[]>(mockScheduledPosts);
  const [selectedDate] = useState(new Date());

  const getPostsForSelectedDate = () => {
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return postDate.toDateString() === selectedDate.toDateString();
    });
  };

  const getSocialAccount = (accountId: string) => {
    return socialAccounts.find(account => account.id === accountId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Plan and schedule your social media content</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Post
        </button>
      </div>

      {/* Calendar and Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <CalendarView />
        </div>

        {/* Selected Date Posts */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>
            <div className="p-6">
              {getPostsForSelectedDate().length > 0 ? (
                <div className="space-y-4">
                  {getPostsForSelectedDate().map(post => {
                    const socialAccount = getSocialAccount(post.socialAccountId);
                    return socialAccount ? (
                      <PostCard key={post.id} post={post} socialAccount={socialAccount} />
                    ) : null;
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No posts scheduled for this date</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Schedule a post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Text Posts</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Create engaging text-based posts with hashtags and mentions.
          </p>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Create Text Post
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Image Posts</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Share photos and graphics with captions across platforms.
          </p>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Create Image Post
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <VideoCameraIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Video Posts</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Upload and schedule video content for maximum engagement.
          </p>
          <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Create Video Post
          </button>
        </div>
      </div>
    </div>
  );
}