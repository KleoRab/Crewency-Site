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
import { DashboardStats, ActivityItem as ActivityItemType } from '@/types';

// Enhanced mock data for demonstration
const mockStats: DashboardStats = {
  totalPosts: 1247,
  scheduledPosts: 23,
  publishedPosts: 1224,
  totalEngagement: 45678,
  followerGrowth: 12543,
  topPerformingPost: {
    id: '1',
    content: 'Introducing our revolutionary AI-powered social media management tool! 🚀 #innovation #tech #AI',
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
      message: 'Post published on LinkedIn - 234 likes, 45 comments',
      timestamp: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      type: 'post_scheduled',
      message: '5 posts scheduled for tomorrow across all platforms',
      timestamp: '2024-01-15T09:30:00Z',
    },
    {
      id: '3',
      type: 'account_connected',
      message: 'Instagram account connected successfully',
      timestamp: '2024-01-15T08:15:00Z',
    },
    {
      id: '4',
      type: 'analytics_updated',
      message: 'Weekly analytics report generated',
      timestamp: '2024-01-15T07:00:00Z',
    },
    {
      id: '5',
      type: 'post_published',
      message: 'Twitter post went viral - 1.2K retweets!',
      timestamp: '2024-01-14T16:30:00Z',
    },
  ],
};

// Additional mock data for enhanced dashboard
const platformStats = [
  { name: 'LinkedIn', posts: 456, engagement: 8.7, followers: 12500, color: 'blue' },
  { name: 'Twitter', posts: 389, engagement: 6.2, followers: 8900, color: 'sky' },
  { name: 'Facebook', posts: 234, engagement: 5.8, followers: 15600, color: 'indigo' },
  { name: 'Instagram', posts: 168, engagement: 9.1, followers: 23400, color: 'pink' },
];

const recentPosts = [
  {
    id: 1,
    platform: 'LinkedIn',
    content: 'Excited to share our latest product update! 🚀',
    scheduledTime: '2 hours ago',
    status: 'published',
    engagement: { likes: 45, comments: 12, shares: 8 },
  },
  {
    id: 2,
    platform: 'Twitter',
    content: 'Just launched our new feature. Check it out! #innovation',
    scheduledTime: '4 hours ago',
    status: 'scheduled',
    engagement: { likes: 23, comments: 5, shares: 3 },
  },
  {
    id: 3,
    platform: 'Facebook',
    content: 'Behind the scenes: Our team working on the next big thing!',
    scheduledTime: '6 hours ago',
    status: 'published',
    engagement: { likes: 67, comments: 15, shares: 12 },
  },
];

const topPerformingPosts = [
  {
    id: 1,
    content: 'Introducing our revolutionary AI-powered social media management tool!',
    platform: 'LinkedIn',
    engagement: 8.7,
    reach: 12500,
    likes: 234,
    comments: 45,
    shares: 67,
  },
  {
    id: 2,
    content: '5 tips for better social media engagement in 2024',
    platform: 'Twitter',
    engagement: 7.2,
    reach: 8900,
    likes: 156,
    comments: 23,
    shares: 34,
  },
  {
    id: 3,
    content: 'Customer success story: How Company X increased engagement by 300%',
    platform: 'Facebook',
    engagement: 6.8,
    reach: 15600,
    likes: 189,
    comments: 34,
    shares: 28,
  },
];

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

const ActivityItem = ({ activity }: { activity: ActivityItemType }) => (
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
  const [stats] = useState<DashboardStats>(mockStats);
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your social media performance overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Post
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={formatNumber(stats.totalPosts)}
          change={{ value: 12.5, isPositive: true }}
          icon={CalendarIcon}
          color="blue"
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduledPosts}
          change={{ value: 8.2, isPositive: true }}
          icon={CalendarIcon}
          color="yellow"
        />
        <StatCard
          title="Published"
          value={formatNumber(stats.publishedPosts)}
          change={{ value: 15.3, isPositive: true }}
          icon={EyeIcon}
          color="green"
        />
        <StatCard
          title="Total Engagement"
          value={formatNumber(stats.totalEngagement)}
          change={{ value: 22.1, isPositive: true }}
          icon={HeartIcon}
          color="red"
        />
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((platform) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{platform.name}</h4>
                <div className={`w-3 h-3 bg-${platform.color}-500 rounded-full`}></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-medium">{platform.posts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Engagement</span>
                  <span className="font-medium">{platform.engagement}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-medium">{formatNumber(platform.followers)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Post
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule Post
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                View Analytics
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <EyeIcon className="h-5 w-5 mr-2" />
                Monitor Mentions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts and Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{post.content}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs text-gray-500">{post.platform}</span>
                      <span className="text-xs text-gray-500">{post.scheduledTime}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <HeartIcon className="h-3 w-3 mr-1" />
                          {post.engagement.likes}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <ChatBubbleLeftIcon className="h-3 w-3 mr-1" />
                          {post.engagement.comments}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <ShareIcon className="h-3 w-3 mr-1" />
                          {post.engagement.shares}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Posts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformingPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-900 mb-2 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.platform}</span>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{post.engagement}%</p>
                        <p className="text-xs text-gray-500">Engagement</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatNumber(post.reach)}</p>
                        <p className="text-xs text-gray-500">Reach</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Post */}
      {stats.topPerformingPost && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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