'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface AdminStats {
  totalUsers: number;
  totalOrganizations: number;
  activeUsers: number;
  totalPosts: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  recentActivity: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
    type: 'success' | 'warning' | 'error';
  }>;
}

// Mock data for demonstration
const mockStats: AdminStats = {
  totalUsers: 156,
  totalOrganizations: 23,
  activeUsers: 89,
  totalPosts: 1247,
  systemHealth: 'healthy',
  recentActivity: [
    {
      id: '1',
      action: 'New user registered',
      user: 'john@company.com',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'success',
    },
    {
      id: '2',
      action: 'Organization created',
      user: 'sarah@agency.com',
      timestamp: '2024-01-15T09:15:00Z',
      type: 'success',
    },
    {
      id: '3',
      action: 'Failed post publication',
      user: 'mike@startup.com',
      timestamp: '2024-01-15T08:45:00Z',
      type: 'error',
    },
    {
      id: '4',
      action: 'API rate limit exceeded',
      user: 'system',
      timestamp: '2024-01-15T08:30:00Z',
      type: 'warning',
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
            {change.isPositive ? '↗' : '↘'} {Math.abs(change.value)}%
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-50`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ activity }: { activity: AdminStats['recentActivity'][0] }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.action}</p>
        <p className="text-xs text-gray-500">
          {activity.user} • {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(mockStats);
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            stats.systemHealth === 'healthy' ? 'bg-green-100 text-green-800' :
            stats.systemHealth === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {stats.systemHealth === 'healthy' && <CheckCircleIcon className="h-4 w-4 mr-1" />}
            {stats.systemHealth === 'warning' && <ExclamationTriangleIcon className="h-4 w-4 mr-1" />}
            {stats.systemHealth === 'critical' && <ExclamationTriangleIcon className="h-4 w-4 mr-1" />}
            {stats.systemHealth.charAt(0).toUpperCase() + stats.systemHealth.slice(1)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2.3s</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1.2k</div>
            <div className="text-sm text-gray-600">API Requests/min</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change={{ value: 12, isPositive: true }}
          icon={UsersIcon}
          color="blue"
        />
        <StatCard
          title="Organizations"
          value={stats.totalOrganizations}
          change={{ value: 5, isPositive: true }}
          icon={BuildingOfficeIcon}
          color="green"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          change={{ value: 8, isPositive: true }}
          icon={ChartBarIcon}
          color="purple"
        />
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          change={{ value: 15, isPositive: true }}
          icon={CogIcon}
          color="yellow"
        />
      </div>

      {/* Recent Activity */}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              View All Users
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Invite New User
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Manage Permissions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              API Configuration
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Email Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Backup & Recovery
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              View Logs
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Performance Metrics
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              Error Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}