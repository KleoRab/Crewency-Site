'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import EnhancedAIAgent from '@/components/ai/EnhancedAIAgent';
import { User } from '@/types';
import {
  CpuChipIcon,
  SparklesIcon,
  LightBulbIcon,
  ChartBarIcon,
  CalendarIcon,
  GlobeAltIcon,
  UserGroupIcon,
  CommandLineIcon,
  BoltIcon,
  FireIcon,
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

const aiCapabilities = [
  {
    title: 'Content Creation',
    description: 'Generate engaging posts, stories, and videos tailored to your brand',
    icon: SparklesIcon,
    color: 'purple',
    features: ['AI-powered captions', 'Hashtag optimization', 'Multi-platform adaptation', 'Brand voice consistency']
  },
  {
    title: 'Smart Scheduling',
    description: 'AI determines optimal posting times for maximum engagement',
    icon: CalendarIcon,
    color: 'blue',
    features: ['Optimal timing analysis', 'Cross-platform coordination', 'Content calendar automation', 'Trend-based scheduling']
  },
  {
    title: 'Analytics Intelligence',
    description: 'Get actionable insights and performance predictions',
    icon: ChartBarIcon,
    color: 'green',
    features: ['Performance predictions', 'Audience insights', 'Content optimization', 'ROI tracking']
  },
  {
    title: 'Community Management',
    description: 'AI-powered responses and community building',
    icon: UserGroupIcon,
    color: 'orange',
    features: ['Auto-responses', 'Sentiment analysis', 'Community insights', 'Engagement optimization']
  },
  {
    title: 'Trend Analysis',
    description: 'Stay ahead with real-time trend detection and adaptation',
    icon: FireIcon,
    color: 'red',
    features: ['Trend detection', 'Viral content prediction', 'Competitor analysis', 'Market insights']
  },
  {
    title: 'Brand Optimization',
    description: 'Continuously improve your brand presence and messaging',
    icon: BoltIcon,
    color: 'yellow',
    features: ['Brand voice refinement', 'Message optimization', 'A/B testing', 'Performance tuning']
  }
];

const quickActions = [
  {
    title: 'Create Viral Content',
    description: 'Generate trending content that gets maximum engagement',
    icon: FireIcon,
    action: 'viral_content'
  },
  {
    title: 'Plan This Week',
    description: 'AI creates a complete content calendar for the week',
    icon: CalendarIcon,
    action: 'weekly_plan'
  },
  {
    title: 'Analyze Competitors',
    description: 'Get insights on what your competitors are doing right',
    icon: ChartBarIcon,
    action: 'competitor_analysis'
  },
  {
    title: 'Optimize Performance',
    description: 'Improve your existing content for better results',
    icon: BoltIcon,
    action: 'optimize_content'
  }
];

export default function AIAgentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
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

  const handleAIContentGenerated = (content: string, type: string, context?: any) => {
    console.log('AI generated content:', { content, type, context });
    setShowAIAgent(false);
    setSelectedAction(null);
  };

  const handleQuickAction = (action: string) => {
    setSelectedAction(action);
    setShowAIAgent(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Agent...</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                AI Social Media Manager
              </h1>
              <p className="text-xl text-gray-600">
                Your intelligent assistant for creating, scheduling, and optimizing social media content
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAIAgent(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
            >
              <CpuChipIcon className="h-6 w-6" />
              <span className="text-lg font-semibold">Start AI Conversation</span>
            </motion.button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAction(action.action)}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 text-left group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg group-hover:from-purple-200 group-hover:to-blue-200 transition-colors">
                    <action.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                </div>
                <p className="text-gray-600">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 bg-${capability.color}-100 rounded-lg`}>
                    <capability.icon className={`h-6 w-6 text-${capability.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{capability.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 bg-${capability.color}-400 rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Your AI Assistant Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-purple-200">Posts Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">89%</div>
              <div className="text-purple-200">Engagement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15.2K</div>
              <div className="text-purple-200">Hours Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-purple-200">AI Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced AI Agent Modal */}
        {showAIAgent && (
          <EnhancedAIAgent
            onContentGenerated={handleAIContentGenerated}
            onClose={() => {
              setShowAIAgent(false);
              setSelectedAction(null);
            }}
            userProfile={{
              industry: 'saas',
              niche: 'social media management',
              targetAudience: 'small business owners',
              brandVoice: 'professional',
              contentGoals: ['increase brand awareness', 'generate leads'],
              businessSize: 'small-medium'
            }}
          />
        )}
      </div>
    </Layout>
  );
}
