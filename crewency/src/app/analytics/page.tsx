'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { User } from '@/types';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  GlobeAltIcon,
  UsersIcon,
  ClockIcon,
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
  { id: 'linkedin', name: 'LinkedIn', color: 'blue', icon: '💼', followers: 12500, engagement: 8.7 },
  { id: 'twitter', name: 'Twitter', color: 'sky', icon: '🐦', followers: 8900, engagement: 6.2 },
  { id: 'facebook', name: 'Facebook', color: 'indigo', icon: '📘', followers: 15600, engagement: 5.8 },
  { id: 'instagram', name: 'Instagram', color: 'pink', icon: '📷', followers: 23400, engagement: 9.1 },
];

const analyticsData = {
  totalReach: 456789,
  totalImpressions: 2345678,
  totalEngagement: 45678,
  engagementRate: 8.7,
  followerGrowth: 12543,
  postCount: 1247,
  topPerformingPost: {
    content: 'Introducing our revolutionary AI-powered social media management tool!',
    platform: 'LinkedIn',
    reach: 12500,
    engagement: 8.7,
    likes: 234,
    comments: 45,
    shares: 67,
  },
  weeklyData: [
    { day: 'Mon', reach: 12000, engagement: 8.2, posts: 5 },
    { day: 'Tue', reach: 15000, engagement: 9.1, posts: 7 },
    { day: 'Wed', reach: 18000, engagement: 7.8, posts: 6 },
    { day: 'Thu', reach: 22000, engagement: 8.9, posts: 8 },
    { day: 'Fri', reach: 19000, engagement: 8.5, posts: 6 },
    { day: 'Sat', reach: 14000, engagement: 7.2, posts: 4 },
    { day: 'Sun', reach: 11000, engagement: 6.8, posts: 3 },
  ],
  topHashtags: [
    { tag: '#innovation', count: 45, reach: 12500 },
    { tag: '#tech', count: 38, reach: 9800 },
    { tag: '#AI', count: 32, reach: 15600 },
    { tag: '#socialmedia', count: 28, reach: 8900 },
    { tag: '#marketing', count: 25, reach: 11200 },
  ],
  bestPostingTimes: [
    { platform: 'LinkedIn', time: '9:00 AM', engagement: 8.7 },
    { platform: 'Twitter', time: '1:00 PM', engagement: 6.2 },
    { platform: 'Facebook', time: '3:00 PM', engagement: 5.8 },
    { platform: 'Instagram', time: '6:00 PM', engagement: 9.1 },
  ],
};

const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }: {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${
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

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-2">Track your social media performance and optimize your strategy.</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Platforms</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Reach"
            value={formatNumber(analyticsData.totalReach)}
            change={{ value: 15.3, isPositive: true }}
            icon={EyeIcon}
            color="blue"
          />
          <MetricCard
            title="Impressions"
            value={formatNumber(analyticsData.totalImpressions)}
            change={{ value: 22.1, isPositive: true }}
            icon={GlobeAltIcon}
            color="green"
          />
          <MetricCard
            title="Engagement"
            value={formatNumber(analyticsData.totalEngagement)}
            change={{ value: 8.7, isPositive: true }}
            icon={HeartIcon}
            color="red"
          />
          <MetricCard
            title="Engagement Rate"
            value={`${analyticsData.engagementRate}%`}
            change={{ value: 2.1, isPositive: true }}
            icon={TrendingUpIcon}
            color="purple"
          />
        </div>

        {/* Platform Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{platform.name}</h4>
                      <p className="text-sm text-gray-500">{formatNumber(platform.followers)} followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{platform.engagement}%</p>
                    <p className="text-sm text-gray-500">Engagement</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Performance</h3>
            <div className="space-y-3">
              {analyticsData.weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">{day.day}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatNumber(day.reach)} reach</p>
                      <p className="text-xs text-gray-500">{day.posts} posts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{day.engagement}%</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Post */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Post</h3>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-gray-900 mb-2">{analyticsData.topPerformingPost.content}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <HeartIcon className="h-4 w-4 mr-1" />
                  {analyticsData.topPerformingPost.likes} likes
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                  {analyticsData.topPerformingPost.comments} comments
                </div>
                <div className="flex items-center">
                  <ShareIcon className="h-4 w-4 mr-1" />
                  {analyticsData.topPerformingPost.shares} shares
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{analyticsData.topPerformingPost.platform}</p>
              <p className="text-lg font-semibold text-gray-900">{analyticsData.topPerformingPost.engagement}%</p>
              <p className="text-sm text-gray-500">Engagement Rate</p>
            </div>
          </div>
        </div>

        {/* Hashtags and Best Times */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Hashtags</h3>
            <div className="space-y-3">
              {analyticsData.topHashtags.map((hashtag, index) => (
                <motion.div
                  key={hashtag.tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{hashtag.tag}</p>
                    <p className="text-sm text-gray-500">{formatNumber(hashtag.reach)} reach</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{hashtag.count}</p>
                    <p className="text-sm text-gray-500">uses</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Posting Times</h3>
            <div className="space-y-3">
              {analyticsData.bestPostingTimes.map((time, index) => (
                <motion.div
                  key={time.platform}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {platforms.find(p => p.name === time.platform)?.icon}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{time.platform}</p>
                      <p className="text-sm text-gray-500">{time.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{time.engagement}%</p>
                    <p className="text-sm text-gray-500">Engagement</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
