'use client';

import React, { useState } from 'react';

export default function TestPowerhousePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testPowerhouse = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/powerhouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: 'Create a post about our new AI product launch',
          industry: 'Technology',
          platform: 'LinkedIn',
          mode: 'quick'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Test failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🚀 V0.1 POWERHOUSE Test
          </h1>
          
          <p className="text-gray-600 mb-8">
            This page tests the V0.1 POWERHOUSE system to ensure it's working correctly.
          </p>

          <button
            onClick={testPowerhouse}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Testing...' : 'Test Powerhouse System'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">❌ Error: {error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Test Successful!</h3>
                <p className="text-green-700">V0.1 POWERHOUSE system is working correctly.</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Generated Content:</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {result.data?.content?.text || 'No content generated'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">System Status</h3>
                  <div className="text-sm text-blue-700">
                    <p>Initialized: {result.systemStatus?.initialized ? '✅' : '❌'}</p>
                    <p>Creativity: {result.systemStatus?.config?.creativityLevel || 95}%</p>
                    <p>Intelligence: {result.systemStatus?.config?.intelligenceLevel || 90}%</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Performance</h3>
                  <div className="text-sm text-purple-700">
                    <p>Processing Time: {result.performance?.processingTime || 0}ms</p>
                    <p>Memory Usage: {result.performance?.memoryUsage || 0}MB</p>
                    <p>CPU Usage: {result.performance?.cpuUsage || 0}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
