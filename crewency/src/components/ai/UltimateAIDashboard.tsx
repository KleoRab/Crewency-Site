'use client';

import React, { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon,
  CalendarIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface UltimateAIDashboardProps {
  onClose?: () => void;
}

interface SystemStatus {
  status: 'operational' | 'degraded' | 'offline';
  components: {
    analytics: boolean;
    learning: boolean;
    templates: boolean;
    automation: boolean;
    collaboration: boolean;
    brandPersonality: boolean;
    competitorAnalysis: boolean;
    contentCalendar: boolean;
    revolutionaryAI: boolean;
  };
  performance: {
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
    uptime: number;
  };
  capabilities: string[];
}

export default function UltimateAIDashboard({ onClose }: UltimateAIDashboardProps) {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'analytics' | 'team' | 'settings'>('overview');

  useEffect(() => {
    loadSystemStatus();
  }, []);

  const loadSystemStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ultimate-ai');
      const data = await response.json();
      
      if (data.success) {
        setSystemStatus(data.data);
      } else {
        setError(data.error || 'Failed to load system status');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'degraded': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'offline': return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default: return <ArrowPathIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatUptime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatMemory = (bytes: number) => {
    return `${Math.round(bytes)} MB`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading Ultimate AI System...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-700 mb-2">Error Loading System</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSystemStatus}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <SparklesIcon className="h-10 w-10 text-purple-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">🚀 Ultimate AI System</h1>
                <p className="text-gray-600">Complete AI-powered social media content creation platform</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: ChartBarIcon },
              { id: 'content', name: 'Content', icon: LightBulbIcon },
              { id: 'analytics', name: 'Analytics', icon: ArrowTrendingUpIcon },
              { id: 'team', name: 'Team', icon: UserGroupIcon },
              { id: 'settings', name: 'Settings', icon: CogIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-green-600 mr-2" />
                System Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getStatusIcon(systemStatus?.status || 'offline')}
                  </div>
                  <p className="text-sm font-medium text-gray-600">Overall Status</p>
                  <p className={`text-lg font-semibold ${getStatusColor(systemStatus?.status || 'offline')}`}>
                    {systemStatus?.status?.toUpperCase() || 'UNKNOWN'}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {formatUptime(systemStatus?.performance.uptime || 0)}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {formatMemory(systemStatus?.performance.memoryUsage || 0)}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                </div>
              </div>

              {/* Component Status */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {systemStatus?.components && Object.entries(systemStatus.components).map(([component, isActive]) => (
                  <div key={component} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      {isActive ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-600 capitalize">
                      {component.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemStatus?.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <SparklesIcon className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Generation</h2>
              <p className="text-gray-600 mb-6">
                Generate high-quality, multi-format content using our advanced AI system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Revolutionary AI</h3>
                  <p className="text-sm text-gray-600 mb-4">Advanced content generation with multi-format output</p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Generate Content
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Content Templates</h3>
                  <p className="text-sm text-gray-600 mb-4">Use proven viral templates and frameworks</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Browse Templates
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Brand Personality</h3>
                  <p className="text-sm text-gray-600 mb-4">Apply consistent brand voice and personality</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Configure Brand
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive analytics and insights for your content performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 mb-2">1.2M</p>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600 mb-2">4.8%</p>
                  <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600 mb-2">156</p>
                  <p className="text-sm font-medium text-gray-600">Content Pieces</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600 mb-2">89%</p>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Collaboration</h2>
              <p className="text-gray-600 mb-6">
                Manage your team, workflows, and collaboration features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Team Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage team members and permissions</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Manage Team
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Approval Workflows</h3>
                  <p className="text-sm text-gray-600 mb-4">Set up content approval processes</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Configure Workflows
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Collaboration Sessions</h3>
                  <p className="text-sm text-gray-600 mb-4">Start collaborative content sessions</p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Start Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
              <p className="text-gray-600 mb-6">
                Configure your Ultimate AI System settings and preferences.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
                    <p className="text-sm text-gray-600">Enable comprehensive analytics and insights</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Learning</h3>
                    <p className="text-sm text-gray-600">Enable AI learning and adaptation</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Automation Workflows</h3>
                    <p className="text-sm text-gray-600">Enable automated content workflows</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Competitor Analysis</h3>
                    <p className="text-sm text-gray-600">Enable competitor monitoring and analysis</p>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
