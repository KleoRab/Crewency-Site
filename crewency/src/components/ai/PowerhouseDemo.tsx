'use client';

import React, { useState, useEffect } from 'react';
import powerhouseIntegration from '../../lib/ai/PowerhouseIntegration';

interface PowerhouseDemoProps {
  onClose?: () => void;
}

export default function PowerhouseDemo({ onClose }: PowerhouseDemoProps) {
  const [userInput, setUserInput] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [platform, setPlatform] = useState('LinkedIn');
  const [mode, setMode] = useState('quick');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  useEffect(() => {
    // Get initial system status
    const analytics = powerhouseIntegration.getSystemAnalytics();
    setSystemStatus(analytics.systemStatus);
  }, []);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      switch (mode) {
        case 'creative':
          response = await powerhouseIntegration.creativeGenerate(userInput, industry, platform);
          break;
        case 'business':
          response = await powerhouseIntegration.businessGenerate(userInput, industry, platform);
          break;
        case 'trend':
          response = await powerhouseIntegration.trendGenerate(userInput, industry, platform);
          break;
        case 'multi':
          response = await powerhouseIntegration.multiPlatformGenerate(userInput, industry, [platform, 'X', 'Instagram']);
          break;
        default:
          response = await powerhouseIntegration.quickGenerate(userInput, industry, platform);
      }

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'Generation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const getModeDescription = (mode: string) => {
    const descriptions = {
      quick: 'Balanced creativity and business focus',
      creative: 'Maximum creativity and viral potential',
      business: 'Maximum business value and ROI',
      trend: 'Trend-driven and real-time content',
      multi: 'Cross-platform optimization'
    };
    return descriptions[mode] || descriptions.quick;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🚀 V0.1 POWERHOUSE Demo</h2>
              <p className="text-purple-100">PC-Powered AI with Maximum Creativity</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* System Status */}
          {systemStatus && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">System Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-green-600">Initialized:</span>
                  <span className={`ml-2 ${systemStatus.initialized ? 'text-green-600' : 'text-red-600'}`}>
                    {systemStatus.initialized ? '✅' : '❌'}
                  </span>
                </div>
                <div>
                  <span className="text-green-600">Creativity:</span>
                  <span className="ml-2 text-green-600">{systemStatus.config?.creativityLevel || 95}%</span>
                </div>
                <div>
                  <span className="text-green-600">Intelligence:</span>
                  <span className="ml-2 text-green-600">{systemStatus.config?.intelligenceLevel || 90}%</span>
                </div>
                <div>
                  <span className="text-green-600">Trendiness:</span>
                  <span className="ml-2 text-green-600">{systemStatus.config?.trendinessLevel || 88}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What content would you like to create?
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., Create a post about our new AI product launch..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="X">X (Twitter)</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="quick">Quick Generate</option>
                  <option value="creative">Creative Mode</option>
                  <option value="business">Business Mode</option>
                  <option value="trend">Trend Mode</option>
                  <option value="multi">Multi-Platform</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <strong>{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode:</strong> {getModeDescription(mode)}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!userInput.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGenerating ? '🚀 Generating...' : '🚀 Generate Content'}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">❌ Error: {error}</p>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="mt-6 space-y-6">
              {/* Content */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">📝 Generated Content</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 whitespace-pre-wrap">{result.content.text}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.content.hashtags.map((hashtag: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">📊 Analytics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Viral Potential:</span>
                      <span className="font-semibold">{result.analytics.viralPotential}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Business Value:</span>
                      <span className="font-semibold">{result.analytics.businessValue}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Reach:</span>
                      <span className="font-semibold">{result.analytics.expectedReach.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Engagement:</span>
                      <span className="font-semibold">{result.analytics.expectedEngagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="font-semibold">{(result.analytics.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">🎯 Strategy</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Approach:</span>
                      <p className="text-gray-700">{result.strategy.approach}</p>
                    </div>
                    <div>
                      <span className="font-medium">Reasoning:</span>
                      <p className="text-gray-700">{result.strategy.reasoning}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {result.strategy.recommendations && result.strategy.recommendations.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-3">💡 Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                    {result.strategy.recommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Opportunities */}
              {result.strategy.opportunities && result.strategy.opportunities.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-3">🚀 Opportunities</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-purple-700">
                    {result.strategy.opportunities.map((opp: string, index: number) => (
                      <li key={index}>{opp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
