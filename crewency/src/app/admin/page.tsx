'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import AdminDashboard from '@/modules/social-manager/pages/AdminDashboard';
import { User } from '@/types';

// Mock admin user data for demonstration
const mockAdminUser: User = {
  id: '1',
  email: 'admin@crewency.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  organizationId: 'org-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  emailVerified: true,
  status: 'active',
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement actual authentication check
    // For demo purposes, use mock admin user
    const timer = setTimeout(() => {
      setUser(mockAdminUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout
    console.log('Logging out...');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  // Check if user has admin permissions
  if (user.role !== 'admin' && user.role !== 'owner') {
    router.push('/dashboard');
    return null;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <AdminDashboard />
    </Layout>
  );
}