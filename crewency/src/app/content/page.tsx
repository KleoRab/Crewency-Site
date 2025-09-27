'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import AIAgent from '@/components/ai/AIAgent';
import { User } from '@/types';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  SparklesIcon,
  CalendarIcon,
  GlobeAltIcon,
  HashtagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  CpuChipIcon,
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

const contentTemplates = [
  {
    id: 1,
    name: 'Product Launch',
    description: 'Announce a new product or feature',
    template: '🚀 Excited to announce our latest {product_name}! {key_features} #innovation #launch',
    category: 'announcement',
  },
  {
    id: 2,
    name: 'Industry Insight',
    description: 'Share industry knowledge and insights',
    template: '💡 {insight_title}: {key_point} This is why it matters for {target_audience} #industry #insights',
    category: 'educational',
  },
  {
    id: 3,
    name: 'Behind the Scenes',
    description: 'Show your team and company culture',
    template: '👥 Behind the scenes: {team_activity} Our team is {team_emotion} about {project_goal} #culture #team',
    category: 'culture',
  },
  {
    id: 4,
    name: 'Customer Success',
    description: 'Highlight customer achievements',
    template: '🎉 Success story: {customer_name} achieved {result} using {solution} Read more: {link} #success #customer',
    category: 'testimonial',
  },
];

export default function ContentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAIAgent, setShowAIAgent] = useState(false);
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

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleTemplateSelect = (template: typeof contentTemplates[0]) => {
    setSelectedTemplate(template.id);
    setContent(template.template);
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation with different templates
    const templates = [
      'Excited to share our latest breakthrough in AI-powered social media management! Our new features will revolutionize how you engage with your audience. #innovation #AI #socialmedia #tech',
      'Pro tip: The best time to post on LinkedIn is Tuesday-Thursday between 8-10 AM. What is your go-to posting strategy? #socialmediamarketing #tips #engagement',
      'Behind the scenes: Our team is working on something amazing! Can not wait to show you what we have been building. #teamwork #innovation #comingsoon',
      'Did you know? Posts with images get 2.3x more engagement than text-only posts. Visual content is key! #contentmarketing #socialmedia #stats',
      'Customer spotlight: Crewency helped us increase our social media engagement by 300%! - Sarah from TechCorp. #customersuccess #testimonial #results'
    ];
    
    setTimeout(() => {
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setContent(randomTemplate);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSchedule = () => {
    if (!content.trim()) {
      alert('Please enter some content before scheduling.');
      return;
    }
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform.');
      return;
    }
    
    // Simulate scheduling
    const scheduledTime = new Date();
    scheduledTime.setHours(scheduledTime.getHours() + 1);
    
    alert(`Post scheduled for ${scheduledTime.toLocaleString()} on ${selectedPlatforms.join(', ')}`);
    console.log('Scheduling content:', { content, platforms: selectedPlatforms, scheduledTime });
  };

  const handlePublishNow = () => {
    if (!content.trim()) {
      alert('Please enter some content before publishing.');
      return;
    }
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform.');
      return;
    }
    
    // Simulate publishing
    alert(`Post published now on ${selectedPlatforms.join(', ')}`);
    console.log('Publishing content:', { content, platforms: selectedPlatforms });
  };

  const handleAIContentGenerated = (generatedContent: string, contentType: string) => {
    setContent(generatedContent);
    setShowAIAgent(false);
    // Auto-select appropriate platforms based on content type
    if (contentType === 'story') {
      setSelectedPlatforms(['instagram', 'tiktok']);
    } else if (contentType === 'video') {
      setSelectedPlatforms(['youtube', 'tiktok', 'instagram']);
    } else {
      setSelectedPlatforms(['linkedin', 'twitter', 'facebook']);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content creator...</p>
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
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Creator</h1>
          <p className="text-gray-600 mt-2">Create, schedule, and manage your social media content with AI assistance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Platforms</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? `border-${platform.color}-500 bg-${platform.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{platform.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto mt-2" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content Creation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Create Content</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAIAgent(true)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                  >
                    <CpuChipIcon className="h-5 w-5 mr-2" />
                    AI Agent
                  </button>
                  <button
                    onClick={handleAIGenerate}
                    disabled={isGenerating}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Quick AI'}
                  </button>
                </div>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here... Use AI generation for better results!"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {content.length} characters
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <HashtagIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <PhotoIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="space-y-4">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find(p => p.id === platformId);
                    return (
                      <div key={platformId} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-lg mr-2">{platform?.icon}</span>
                          <span className="font-medium text-gray-900">{platform?.name}</span>
                        </div>
                        <p className="text-gray-700">{content}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Templates</h3>
              <div className="space-y-3">
                {contentTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleTemplateSelect(template)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
                <button
                  onClick={handleSchedule}
                  disabled={!content || selectedPlatforms.length === 0}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Schedule Post
                </button>
                <button 
                  onClick={handlePublishNow}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  Publish Now
                </button>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <SparklesIcon className="h-5 w-5 mr-2 text-purple-600" />
                AI Suggestions
              </h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  💡 Try adding trending hashtags
                </div>
                <div className="text-sm text-gray-600">
                  📊 Include a call-to-action
                </div>
                <div className="text-sm text-gray-600">
                  🎯 Optimize for your audience
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* AI Agent Modal */}
      {showAIAgent && (
        <AIAgent
          onContentGenerated={handleAIContentGenerated}
          onClose={() => setShowAIAgent(false)}
        />
      )}
    </Layout>
  );
}
