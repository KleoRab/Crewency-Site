'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/modules/social-manager/pages/Dashboard';
import EnhancedAIAgent from '@/components/ai/EnhancedAIAgent';
import { User } from '@/types';

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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAIAgent, setShowAIAgent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual authentication check
    // For demo purposes, use mock user
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

  const handleAIContentGenerated = (content: string, type: string) => {
    console.log('AI generated content:', { content, type });
    setShowAIAgent(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

      return (
        <Layout user={user} onLogout={handleLogout} onOpenAIAgent={() => setShowAIAgent(true)}>
          <Dashboard />
          
          {/* Enhanced AI Agent Modal */}
          {showAIAgent && (
            <EnhancedAIAgent
              onContentGenerated={handleAIContentGenerated}
              onClose={() => setShowAIAgent(false)}
            />
          )}
        </Layout>
      );
}