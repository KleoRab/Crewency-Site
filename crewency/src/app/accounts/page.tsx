'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { User } from '@/types';
import {
  PlusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Mock user data for demonstration
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
    logo: '/platforms/linkedin.svg',
    color: '#0A66C2',
    connected: true,
    followers: '12.5K',
    engagement: '4.2%',
    lastPost: '2 hours ago',
    status: 'active'
  },
  {
    id: 'x',
    name: 'X',
    logo: '/platforms/x.svg',
    color: '#000000',
    connected: true,
    followers: '8.9K',
    engagement: '6.8%',
    lastPost: '5 hours ago',
    status: 'active'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    logo: '/platforms/facebook.svg',
    color: '#1877F2',
    connected: true,
    followers: '15.6K',
    engagement: '3.1%',
    lastPost: '1 day ago',
    status: 'active'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    logo: '/platforms/instagram.svg',
    color: '#E4405F',
    connected: true,
    followers: '23.4K',
    engagement: '8.9%',
    lastPost: '3 hours ago',
    status: 'active'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    logo: '/platforms/tiktok.svg',
    color: '#000000',
    connected: false,
    followers: '0',
    engagement: '0%',
    lastPost: 'Never',
    status: 'disconnected'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logo: '/platforms/youtube.svg',
    color: '#FF0000',
    connected: false,
    followers: '0',
    engagement: '0%',
    lastPost: 'Never',
    status: 'disconnected'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    logo: '/platforms/pinterest.svg',
    color: '#E60023',
    connected: false,
    followers: '0',
    engagement: '0%',
    lastPost: 'Never',
    status: 'disconnected'
  },
  {
    id: 'threads',
    name: 'Threads',
    logo: '/platforms/threads.svg',
    color: '#000000',
    connected: false,
    followers: '0',
    engagement: '0%',
    lastPost: 'Never',
    status: 'disconnected'
  }
];

export default function AccountsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState(socialPlatforms);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual authentication check
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout
    console.log('Logging out...');
    router.push('/auth/login');
  };

  const handleConnect = (platformId: string) => {
    // Simulate OAuth connection
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            connected: true, 
            status: 'active',
            followers: Math.floor(Math.random() * 50000).toLocaleString() + 'K',
            engagement: (Math.random() * 10).toFixed(1) + '%',
            lastPost: 'Just now'
          }
        : platform
    ));
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            connected: false, 
            status: 'disconnected',
            followers: '0',
            engagement: '0%',
            lastPost: 'Never'
          }
        : platform
    ));
  };

  const handleRefresh = (platformId: string) => {
    // Simulate data refresh
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            followers: Math.floor(Math.random() * 50000).toLocaleString() + 'K',
            engagement: (Math.random() * 10).toFixed(1) + '%',
            lastPost: 'Just refreshed'
          }
        : platform
    ));
  };

  const togglePasswordVisibility = (platformId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
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

  const connectedPlatforms = platforms.filter(p => p.connected);
  const disconnectedPlatforms = platforms.filter(p => !p.connected);

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="p-6 bg-gray-50 min-h-screen max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Social Media Accounts</h1>
              <p className="text-gray-600 mt-2">Manage your connected social media accounts and their performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{connectedPlatforms.length}</div>
                <div className="text-sm text-gray-500">Connected</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{platforms.length}</div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        {connectedPlatforms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Connected Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedPlatforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: platform.color + '20' }}
                      >
                        <img 
                          src={platform.logo} 
                          alt={platform.name}
                          className="w-8 h-8"
                          onError={(e) => {
                            // Fallback to colored circle if logo not found
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style="background-color: ${platform.color}">
                                ${platform.name.charAt(0)}
                              </div>
                            `;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">Connected</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRefresh(platform.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh data"
                      >
                        <ArrowPathIcon className="h-4 w-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDisconnect(platform.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Disconnect"
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{platform.followers}</div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{platform.engagement}</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Last post: {platform.lastPost}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Platforms */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disconnectedPlatforms.map((platform) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: platform.color + '20' }}
                  >
                    <img 
                      src={platform.logo} 
                      alt={platform.name}
                      className="w-8 h-8"
                      onError={(e) => {
                        // Fallback to colored circle if logo not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style="background-color: ${platform.color}">
                            ${platform.name.charAt(0)}
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                    <div className="flex items-center space-x-2">
                      <ExclamationCircleIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Not connected</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(platform.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Connect Account</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connection Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Connection Tips</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Connect multiple platforms to maximize your reach and engagement</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Our AI agent will automatically optimize content for each platform</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>All connections are secure and encrypted</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}