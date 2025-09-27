'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { User } from '@/types';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  LinkIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  ArrowPathIcon,
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

const socialPlatforms = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    color: 'blue',
    description: 'Professional networking and B2B content',
    connected: true,
    username: '@john_doe_company',
    followers: 12500,
    lastSync: '2024-01-15T10:30:00Z',
    status: 'active',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '🐦',
    color: 'sky',
    description: 'Real-time updates and conversations',
    connected: true,
    username: '@johndoe_company',
    followers: 8900,
    lastSync: '2024-01-15T09:15:00Z',
    status: 'active',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '📘',
    color: 'indigo',
    description: 'Community building and brand awareness',
    connected: false,
    username: null,
    followers: 0,
    lastSync: null,
    status: 'disconnected',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '📷',
    color: 'pink',
    description: 'Visual storytelling and engagement',
    connected: false,
    username: null,
    followers: 0,
    lastSync: null,
    status: 'disconnected',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '📺',
    color: 'red',
    description: 'Video content and long-form engagement',
    connected: false,
    username: null,
    followers: 0,
    lastSync: null,
    status: 'disconnected',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '🎵',
    color: 'black',
    description: 'Short-form video content',
    connected: false,
    username: null,
    followers: 0,
    lastSync: null,
    status: 'disconnected',
  },
];

const AccountCard = ({ platform, onConnect, onDisconnect, onRefresh }: {
  platform: typeof socialPlatforms[0];
  onConnect: (platform: typeof socialPlatforms[0]) => void;
  onDisconnect: (platform: typeof socialPlatforms[0]) => void;
  onRefresh: (platform: typeof socialPlatforms[0]) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'disconnected': return 'gray';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const formatLastSync = (lastSync: string | null) => {
    if (!lastSync) return 'Never';
    const date = new Date(lastSync);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="text-4xl">{platform.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
            <p className="text-gray-600 text-sm">{platform.description}</p>
            {platform.connected ? (
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{platform.username}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{platform.followers.toLocaleString()} followers</span>
                  <span>•</span>
                  <span>Last sync: {formatLastSync(platform.lastSync)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(platform.status)}-100 text-${getStatusColor(platform.status)}-800`}>
                    {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {platform.connected ? (
            <>
              <button
                onClick={() => onRefresh(platform)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Refresh connection"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDisconnect(platform)}
                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                title="Disconnect account"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onConnect(platform)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Connect
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function AccountsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState(socialPlatforms);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<typeof socialPlatforms[0] | null>(null);
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

  const handleConnect = (platform: typeof socialPlatforms[0]) => {
    setSelectedPlatform(platform);
    setShowConnectModal(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => 
        p.id === platform.id 
          ? { 
              ...p, 
              connected: true, 
              username: `@${platform.name.toLowerCase()}_company`,
              followers: Math.floor(Math.random() * 20000) + 5000,
              lastSync: new Date().toISOString(),
              status: 'active'
            }
          : p
      ));
      setShowConnectModal(false);
      setSelectedPlatform(null);
    }, 2000);
  };

  const handleDisconnect = (platform: typeof socialPlatforms[0]) => {
    if (confirm(`Are you sure you want to disconnect ${platform.name}?`)) {
      setPlatforms(prev => prev.map(p => 
        p.id === platform.id 
          ? { 
              ...p, 
              connected: false, 
              username: null,
              followers: 0,
              lastSync: null,
              status: 'disconnected'
            }
          : p
      ));
    }
  };

  const handleRefresh = (platform: typeof socialPlatforms[0]) => {
    // Simulate refresh
    setPlatforms(prev => prev.map(p => 
      p.id === platform.id 
        ? { 
            ...p, 
            lastSync: new Date().toISOString(),
            followers: p.followers + Math.floor(Math.random() * 100)
          }
        : p
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accounts...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const connectedCount = platforms.filter(p => p.connected).length;
  const totalCount = platforms.length;

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Social Media Accounts</h1>
              <p className="text-gray-600 mt-2">Connect and manage your social media accounts for seamless posting and analytics.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Connected Accounts</p>
              <p className="text-2xl font-bold text-gray-900">{connectedCount}/{totalCount}</p>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Connected</p>
                <p className="text-sm text-gray-500">{connectedCount} accounts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <XCircleIcon className="h-6 w-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Not Connected</p>
                <p className="text-sm text-gray-500">{totalCount - connectedCount} accounts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ArrowPathIcon className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">Last Sync</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Platforms</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <AccountCard
                key={platform.id}
                platform={platform}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onRefresh={handleRefresh}
              />
            ))}
          </div>
        </div>

        {/* Connect Modal */}
        {showConnectModal && selectedPlatform && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connect {selectedPlatform.name}
              </h3>
              <p className="text-gray-600 mb-6">
                You'll be redirected to {selectedPlatform.name} to authorize Crewency to access your account.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowConnectModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConnect(selectedPlatform)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Authorize
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}
