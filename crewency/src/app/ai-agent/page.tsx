'use client';

import React, { useState } from 'react';
import PowerhouseDemo from '../../components/ai/PowerhouseDemo';

export default function AIAgentPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🚀 V0.1 POWERHOUSE</h1>
              <p className="text-gray-600">PC-Powered AI with Maximum Creativity</p>
            </div>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Launch AI Agent
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Ultimate AI Social Media Solution
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the power of local AI with maximum creativity, no API limits, 
            and expert-level social media management - all running on your PC.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowDemo(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              🚀 Start Creating
            </button>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200">
              📚 Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Intelligence</h3>
            <p className="text-gray-600">
              Advanced trend analysis, news scraping, and competitor monitoring using PC resources.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximum Creativity</h3>
            <p className="text-gray-600">
              95% creativity level with multi-format content creation and viral potential scoring.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Living AI Brain</h3>
            <p className="text-gray-600">
              Emotional intelligence, learning system, and personality adaptation for human-like interactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
            <p className="text-gray-600">
              Real-time performance tracking, predictive modeling, and ROI calculation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Optimizer</h3>
            <p className="text-gray-600">
              Cross-platform content adaptation, optimal posting times, and algorithm optimization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Trend Analyzer</h3>
            <p className="text-gray-600">
              AI-powered trend prediction, viral content identification, and market opportunity detection.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-purple-100">Creativity Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-purple-100">Intelligence Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">88%</div>
              <div className="text-purple-100">Trendiness Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-purple-100">API Dependencies</div>
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Supported Content Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '📝', name: 'Posts' },
              { icon: '🎬', name: 'Videos' },
              { icon: '📱', name: 'Stories' },
              { icon: '🎠', name: 'Carousels' },
              { icon: '🔴', name: 'Live' },
              { icon: '🎪', name: 'Reels' }
            ].map((type, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="text-sm font-medium text-gray-900">{type.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience the Power of V0.1 POWERHOUSE?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of creators and businesses using our PC-powered AI for maximum creativity and results.
          </p>
          <button
            onClick={() => setShowDemo(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            🚀 Launch AI Agent Now
          </button>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <PowerhouseDemo onClose={() => setShowDemo(false)} />
      )}
    </div>
  );
}