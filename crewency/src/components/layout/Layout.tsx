'use client';

import { useState } from 'react';
import { User } from '@/types';
import Sidebar from './Sidebar';
import Header from './Header';
import FloatingAIAssistant from '@/components/ai/FloatingAIAssistant';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  onOpenAIAgent?: () => void;
}

export default function Layout({ children, user, onLogout, onOpenAIAgent }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={user} onLogout={onLogout} showLogo={false} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Floating AI Assistant */}
      {onOpenAIAgent && (
        <FloatingAIAssistant onOpenFullAgent={onOpenAIAgent} />
      )}
    </div>
  );
}