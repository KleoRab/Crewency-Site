'use client';

import React, { useState } from 'react';

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
  data?: any;
}

export default function TestRevolutionaryAIPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'pending' | 'running' | 'completed'>('pending');

  const runAllTests = async () => {
    setIsRunning(true);
    setOverallStatus('running');
    setTestResults([]);

    const tests = [
      { name: 'API Health Check', test: testAPIHealth },
      { name: 'Prompt Analysis', test: testPromptAnalysis },
      { name: 'Content Generation', test: testContentGeneration },
      { name: 'Video Generation', test: testVideoGeneration },
      { name: 'Multi-Format Delivery', test: testMultiFormatDelivery },
      { name: 'Platform Optimization', test: testPlatformOptimization },
      { name: 'Performance Prediction', test: testPerformancePrediction },
      { name: 'Content Enhancement', test: testContentEnhancement },
      { name: 'System Integration', test: testSystemIntegration }
    ];

    const results: TestResult[] = [];

    for (const test of tests) {
      try {
        const result = await test.test();
        results.push({
          test: test.name,
          status: result.success ? 'pass' : 'fail',
          message: result.message,
          data: result.data
        });
        setTestResults([...results]);
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UI
      } catch (error) {
        results.push({
          test: test.name,
          status: 'fail',
          message: error instanceof Error ? error.message : 'Unknown error',
          data: null
        });
        setTestResults([...results]);
      }
    }

    setIsRunning(false);
    setOverallStatus('completed');
  };

  const testAPIHealth = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai');
      const data = await response.json();
      
      if (data.success && data.status === 'operational') {
        return {
          success: true,
          message: 'API is operational and responding correctly',
          data: data.system
        };
      } else {
        return {
          success: false,
          message: 'API is not operational',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to API',
        data: null
      };
    }
  };

  const testPromptAnalysis = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a viral post about our new AI product launch',
          platform: 'instagram',
          mode: 'analyze'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.intent) {
        return {
          success: true,
          message: 'Prompt analysis working correctly',
          data: data.data
        };
      } else {
        return {
          success: false,
          message: 'Prompt analysis failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Prompt analysis test failed',
        data: null
      };
    }
  };

  const testContentGeneration = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a post about our new AI product launch',
          platform: 'instagram',
          format: 'post',
          style: 'professional',
          mode: 'generate'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.content && data.data.content.length > 0) {
        return {
          success: true,
          message: `Generated ${data.data.content.length} content pieces successfully`,
          data: data.data.summary
        };
      } else {
        return {
          success: false,
          message: 'Content generation failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Content generation test failed',
        data: null
      };
    }
  };

  const testVideoGeneration = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a video about our new AI product launch',
          platform: 'tiktok',
          style: 'fun',
          mode: 'video'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.video) {
        return {
          success: true,
          message: 'Video generation working correctly',
          data: data.data.video
        };
      } else {
        return {
          success: false,
          message: 'Video generation failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Video generation test failed',
        data: null
      };
    }
  };

  const testMultiFormatDelivery = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create content about our new AI product launch',
          platform: 'instagram',
          style: 'professional',
          mode: 'all'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.content && data.data.content.length > 0) {
        return {
          success: true,
          message: `Generated ${data.data.content.length} multi-format content pieces`,
          data: data.data.summary
        };
      } else {
        return {
          success: false,
          message: 'Multi-format delivery failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Multi-format delivery test failed',
        data: null
      };
    }
  };

  const testPlatformOptimization = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a post about our new AI product launch',
          platform: 'linkedin',
          targetAudience: ['professionals', 'business_owners'],
          mode: 'optimize'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.optimizations) {
        return {
          success: true,
          message: 'Platform optimization working correctly',
          data: data.data
        };
      } else {
        return {
          success: false,
          message: 'Platform optimization failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Platform optimization test failed',
        data: null
      };
    }
  };

  const testPerformancePrediction = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a viral post about our new AI product launch',
          platform: 'instagram',
          targetAudience: ['millennials', 'gen_z'],
          mode: 'predict'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.viralScore !== undefined) {
        return {
          success: true,
          message: `Performance prediction working (Viral Score: ${data.data.viralScore}%)`,
          data: data.data
        };
      } else {
        return {
          success: false,
          message: 'Performance prediction failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Performance prediction test failed',
        data: null
      };
    }
  };

  const testContentEnhancement = async () => {
    try {
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Our new AI product is amazing',
          platform: 'instagram',
          style: 'fun',
          mode: 'enhance'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.enhancedText) {
        return {
          success: true,
          message: 'Content enhancement working correctly',
          data: data.data
        };
      } else {
        return {
          success: false,
          message: 'Content enhancement failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Content enhancement test failed',
        data: null
      };
    }
  };

  const testSystemIntegration = async () => {
    try {
      // Test multiple components working together
      const response = await fetch('/api/revolutionary-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: 'Create a comprehensive social media campaign for our new AI product launch',
          platform: 'instagram',
          format: 'post',
          style: 'professional',
          targetAudience: ['professionals', 'business_owners'],
          businessGoals: ['brand_awareness', 'lead_generation'],
          mode: 'generate'
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.data.content && data.data.summary) {
        return {
          success: true,
          message: 'System integration working correctly',
          data: data.data.summary
        };
      } else {
        return {
          success: false,
          message: 'System integration failed',
          data: data
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'System integration test failed',
        data: null
      };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'fail': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const passedTests = testResults.filter(r => r.status === 'pass').length;
  const totalTests = testResults.length;
  const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Revolutionary AI Test Suite
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive testing of all AI engines and system integration
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRunning ? '🔄 Running Tests...' : '🚀 Run All Tests'}
            </button>
            
            <button
              onClick={() => window.open('/revolutionary-ai', '_blank')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              🎨 Open AI Interface
            </button>
          </div>
        </div>

        {/* Overall Status */}
        {overallStatus !== 'pending' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Overall Status</h2>
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                overallStatus === 'completed' 
                  ? successRate >= 80 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-red-600 bg-red-100'
                  : 'text-blue-600 bg-blue-100'
              }`}>
                {overallStatus === 'completed' 
                  ? `${successRate}% Success Rate` 
                  : 'Running Tests...'
                }
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{passedTests}</div>
                <div className="text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{testResults.filter(r => r.status === 'fail').length}</div>
                <div className="text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalTests}</div>
                <div className="text-gray-600">Total</div>
              </div>
            </div>
          </div>
        )}

        {/* Test Results */}
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStatusIcon(result.status)}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{result.test}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(result.status)}`}>
                  {result.status.toUpperCase()}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{result.message}</p>
              
              {result.data && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Test Data:</h4>
                  <pre className="text-sm text-gray-600 overflow-x-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Tests Run */}
        {testResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tests run yet
            </h3>
            <p className="text-gray-600">
              Click "Run All Tests" to start testing the Revolutionary AI system
            </p>
          </div>
        )}

        {/* System Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">AI Engines</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Prompt Intelligence Engine</li>
                <li>• Content Enhancement Engine</li>
                <li>• Video Generation Pipeline</li>
                <li>• Multi-Format Delivery System</li>
                <li>• Platform Optimization Engine</li>
                <li>• Performance Prediction Engine</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Supported Platforms</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instagram</li>
                <li>• TikTok</li>
                <li>• LinkedIn</li>
                <li>• YouTube</li>
                <li>• Facebook</li>
                <li>• Twitter</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Content Formats</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Posts</li>
                <li>• Videos</li>
                <li>• Stories</li>
                <li>• Reels</li>
                <li>• Carousels</li>
                <li>• Live Content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
