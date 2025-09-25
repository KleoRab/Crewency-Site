'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { DashboardStats, ActivityItem } from '@/types';

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalPosts: 156,
  scheduledPosts: 23,
  publishedPosts: 133,
  totalEngagement: 12450,
  followerGrowth: 1250,
  topPerformingPost: {
    id: '1',
    content: 'Excited to share our latest product launch! 🚀 #innovation #tech',
    scheduledFor: '2024-01-15T10:00:00Z',
    status: 'published',
    userId: 'user1',
    organizationId: 'org1',
    socialAccountId: 'account1',
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  recentActivity: [
    {
      id: '1',
      type: 'post_published',
      message: 'Post published on LinkedIn',
      timestamp: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      type: 'post_scheduled',
      message: '3 posts scheduled for tomorrow',
      timestamp: '2024-01-15T09:30:00Z',
    },
    {
      id: '3',
      type: 'account_connected',
      message: 'Twitter account connected',
      timestamp: '2024-01-15T08:15:00Z',
    },
  ],
};

const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }: {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`flex items-center mt-1 text-sm ${
            change.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change.isPositive ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            {Math.abs(change.value)}%
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ activity }: { activity: ActivityItem }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-900">{activity.message}</p>
      <p className="text-xs text-gray-500">
        {new Date(activity.timestamp).toLocaleString()}
      </p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your social media.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          change={{ value: 12, isPositive: true }}
          icon={CalendarIcon}
          color="blue"
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduledPosts}
          icon={CalendarIcon}
          color="yellow"
        />
        <StatCard
          title="Published"
          value={stats.publishedPosts}
          change={{ value: 8, isPositive: true }}
          icon={EyeIcon}
          color="green"
        />
        <StatCard
          title="Total Engagement"
          value={stats.totalEngagement.toLocaleString()}
          change={{ value: 15, isPositive: true }}
          icon={HeartIcon}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-1">
                {stats.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Post
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule Post
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Post */}
      {stats.topPerformingPost && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Post</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-gray-900 mb-2">{stats.topPerformingPost.content}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <HeartIcon className="h-4 w-4 mr-1" />
                    1.2k likes
                  </div>
                  <div className="flex items-center">
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                    89 comments
                  </div>
                  <div className="flex items-center">
                    <ShareIcon className="h-4 w-4 mr-1" />
                    45 shares
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(stats.topPerformingPost.scheduledFor).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}