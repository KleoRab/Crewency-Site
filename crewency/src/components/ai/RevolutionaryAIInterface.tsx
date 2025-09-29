'use client';

import React, { useState, useEffect, useRef } from 'react';
import RevolutionaryAIApp from '../../lib/ai/RevolutionaryAIApp';

interface RevolutionaryAIInterfaceProps {
  onClose?: () => void;
}

interface GeneratedContent {
  id: string;
  type: 'post' | 'video' | 'story' | 'reel' | 'carousel' | 'live';
  platform: string;
  content: {
    text: string;
    visuals: any[];
    audio: any[];
    interactive: any[];
  };
  metadata: {
    viralScore: number;
    engagementPrediction: number;
    businessValue: number;
    productionTime: number;
    cost: number;
  };
  optimization: {
    bestPostingTime: string;
    hashtags: string[];
    description: string;
    title: string;
    callToAction: string;
    engagementStrategy: string;
  };
  variations: {
    short: string;
    medium: string;
    long: string;
    professional: string;
    casual: string;
    urgent: string;
  };
}

export default function RevolutionaryAIInterface({ onClose }: RevolutionaryAIInterfaceProps) {
  const [userInput, setUserInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedFormat, setSelectedFormat] = useState('post');
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [businessGoals, setBusinessGoals] = useState<string[]>([]);
  const [brandVoice, setBrandVoice] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('generate');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const aiApp = useRef(new RevolutionaryAIApp());

  useEffect(() => {
    // Initialize system status
    const status = aiApp.current.getSystemStatus();
    setSystemStatus(status);
  }, []);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-r from-pink-500 to-purple-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'bg-gradient-to-r from-black to-gray-800' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-gradient-to-r from-blue-600 to-blue-800' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-gradient-to-r from-red-500 to-red-700' },
    { id: 'facebook', name: 'Facebook', icon: '👥', color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-gradient-to-r from-blue-400 to-blue-600' }
  ];

  const formats = [
    { id: 'post', name: 'Post', icon: '📝', description: 'Text and image content' },
    { id: 'video', name: 'Video', icon: '🎬', description: 'Video content with audio' },
    { id: 'story', name: 'Story', icon: '📖', description: 'Temporary story content' },
    { id: 'reel', name: 'Reel', icon: '🎭', description: 'Short-form video content' },
    { id: 'carousel', name: 'Carousel', icon: '🎠', description: 'Multiple image slides' },
    { id: 'live', name: 'Live', icon: '🔴', description: 'Live streaming content' }
  ];

  const styles = [
    { id: 'professional', name: 'Professional', icon: '💼', color: 'bg-blue-500' },
    { id: 'casual', name: 'Casual', icon: '😊', color: 'bg-green-500' },
    { id: 'dramatic', name: 'Dramatic', icon: '🎭', color: 'bg-purple-500' },
    { id: 'fun', name: 'Fun', icon: '🎉', color: 'bg-yellow-500' },
    { id: 'minimalist', name: 'Minimalist', icon: '⚪', color: 'bg-gray-500' },
    { id: 'cinematic', name: 'Cinematic', icon: '🎬', color: 'bg-red-500' }
  ];

  const audienceOptions = [
    'millennials', 'gen_z', 'professionals', 'business_owners', 'students', 'parents', 'entrepreneurs', 'creators'
  ];

  const businessGoalOptions = [
    'brand_awareness', 'lead_generation', 'sales', 'engagement', 'community_building', 'thought_leadership', 'customer_education'
  ];

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('Please enter your content idea');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedContent([]);

    try {
      const request = {
        text: userInput,
        context: {
          industry: 'Technology',
          platform: selectedPlatform,
          targetAudience,
          businessGoals,
          emotionalTone: selectedStyle as any,
          urgency: 'medium' as any,
          budget: 'medium' as any,
          timeline: 'short' as any
        }
      };

      const results = await aiApp.current.processPrompt(request);
      setGeneratedContent(results);
      setSelectedContent(results[0] || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    // Auto-select best format for platform
    const platformFormats = {
      'instagram': 'post',
      'tiktok': 'reel',
      'linkedin': 'post',
      'youtube': 'video',
      'facebook': 'post',
      'twitter': 'post'
    };
    setSelectedFormat(platformFormats[platform as keyof typeof platformFormats] || 'post');
  };

  const handleAudienceToggle = (audience: string) => {
    setTargetAudience(prev => 
      prev.includes(audience) 
        ? prev.filter(a => a !== audience)
        : [...prev, audience]
    );
  };

  const handleBusinessGoalToggle = (goal: string) => {
    setBusinessGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-blue-500';
    if (score >= 60) return 'text-purple-500';
    return 'text-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🚀 Revolutionary AI</h1>
              <p className="text-purple-100">Next-Generation Social Media Content Creation</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-purple-200">System Status</div>
                <div className="text-green-400 font-semibold">● Operational</div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Platform Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Platform</h3>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformChange(platform.id)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedPlatform === platform.id
                          ? `${platform.color} text-white shadow-lg`
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <div className="text-sm font-medium">{platform.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Format</h3>
                <div className="space-y-2">
                  {formats.map(format => (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedFormat === format.id
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{format.icon}</span>
                        <div>
                          <div className="font-medium">{format.name}</div>
                          <div className="text-xs text-gray-500">{format.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Style</h3>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedStyle === style.id
                          ? `${style.color} text-white shadow-lg`
                          : 'bg-white hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="text-xl mb-1">{style.icon}</div>
                      <div className="text-sm font-medium">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full p-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Advanced Options</span>
                    <span>{showAdvanced ? '▼' : '▶'}</span>
                  </div>
                </button>

                {showAdvanced && (
                  <div className="mt-3 space-y-4">
                    {/* Target Audience */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Target Audience</h4>
                      <div className="space-y-1">
                        {audienceOptions.map(audience => (
                          <label key={audience} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={targetAudience.includes(audience)}
                              onChange={() => handleAudienceToggle(audience)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600 capitalize">
                              {audience.replace('_', ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Business Goals */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Business Goals</h4>
                      <div className="space-y-1">
                        {businessGoalOptions.map(goal => (
                          <label key={goal} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={businessGoals.includes(goal)}
                              onChange={() => handleBusinessGoalToggle(goal)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600 capitalize">
                              {goal.replace('_', ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Brand Voice */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Brand Voice</h4>
                      <select
                        value={brandVoice}
                        onChange={(e) => setBrandVoice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="friendly">Friendly</option>
                        <option value="authoritative">Authoritative</option>
                        <option value="playful">Playful</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {[
                  { id: 'generate', name: 'Generate', icon: '🎨' },
                  { id: 'results', name: 'Results', icon: '📊' },
                  { id: 'analytics', name: 'Analytics', icon: '📈' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'generate' && (
                <div className="space-y-6">
                  {/* Input Section */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      What content would you like to create?
                    </label>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Describe your content idea... (e.g., 'Create a post about our new AI product launch')"
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Generate Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !userInput.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        '🚀 Generate Revolutionary Content'
                      )}
                    </button>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <span className="text-red-500 mr-2">⚠️</span>
                        <span className="text-red-700">{error}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-6">
                  {generatedContent.length > 0 ? (
                    <>
                      {/* Content List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {generatedContent.map((content, index) => (
                          <div
                            key={content.id}
                            onClick={() => setSelectedContent(content)}
                            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedContent?.id === content.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl">
                                  {formats.find(f => f.id === content.type)?.icon}
                                </span>
                                <div>
                                  <div className="font-semibold text-gray-900 capitalize">
                                    {content.type}
                                  </div>
                                  <div className="text-sm text-gray-500 capitalize">
                                    {content.platform}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${getViralScoreColor(content.metadata.viralScore)}`}>
                                  {content.metadata.viralScore}%
                                </div>
                                <div className="text-xs text-gray-500">Viral Score</div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="text-sm text-gray-600 line-clamp-3">
                                {content.content.text}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-500">Engagement</div>
                                <div className={`font-semibold ${getEngagementColor(content.metadata.engagementPrediction)}`}>
                                  {content.metadata.engagementPrediction}%
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-500">Business Value</div>
                                <div className="font-semibold text-green-600">
                                  {content.metadata.businessValue}%
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Selected Content Details */}
                      {selectedContent && (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Content Details
                          </h3>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Content Preview */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Content Preview</h4>
                              <div className="bg-white p-4 rounded-lg border">
                                <div className="text-gray-900 whitespace-pre-wrap">
                                  {selectedContent.content.text}
                                </div>
                                {selectedContent.optimization.hashtags.length > 0 && (
                                  <div className="mt-3 text-blue-600">
                                    {selectedContent.optimization.hashtags.join(' ')}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Metrics */}
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">Performance Metrics</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Viral Score</span>
                                  <span className={`font-semibold ${getViralScoreColor(selectedContent.metadata.viralScore)}`}>
                                    {selectedContent.metadata.viralScore}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Engagement Prediction</span>
                                  <span className={`font-semibold ${getEngagementColor(selectedContent.metadata.engagementPrediction)}`}>
                                    {selectedContent.metadata.engagementPrediction}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Business Value</span>
                                  <span className="font-semibold text-green-600">
                                    {selectedContent.metadata.businessValue}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Production Time</span>
                                  <span className="font-semibold text-gray-900">
                                    {selectedContent.metadata.productionTime} min
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Optimization Recommendations */}
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-700 mb-2">Optimization Recommendations</h4>
                            <div className="bg-white p-4 rounded-lg border">
                              <div className="text-sm text-gray-600">
                                <div className="mb-2">
                                  <strong>Best Posting Time:</strong> {selectedContent.optimization.bestPostingTime}
                                </div>
                                <div className="mb-2">
                                  <strong>Engagement Strategy:</strong> {selectedContent.optimization.engagementStrategy}
                                </div>
                                <div>
                                  <strong>Call to Action:</strong> {selectedContent.optimization.callToAction}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🎨</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No content generated yet
                      </h3>
                      <p className="text-gray-600">
                        Enter your content idea and click generate to create amazing content
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📈</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Analytics Dashboard
                    </h3>
                    <p className="text-gray-600">
                      Advanced analytics and performance insights coming soon
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">⚙️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Settings
                    </h3>
                    <p className="text-gray-600">
                      Advanced settings and customization options coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
