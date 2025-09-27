'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'AI Agent', href: '/ai-agent', icon: CpuChipIcon, primary: true },
  { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Accounts', href: '/accounts', icon: LinkIcon },
  { name: 'Team', href: '/team', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 64 : 256 }}
      className="flex flex-col h-full bg-white border-r border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
                  <Image
                    src="/crewency-logo.svg"
                    alt="Crewency - Social Media Management"
                    width={200}
                    height={45}
                    className="h-8 w-auto"
                  />
            </Link>
          </motion.div>
        )}
        
        {isCollapsed && (
          <Link href="/" className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
          </Link>
        )}
        
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const isPrimary = item.primary;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? isPrimary
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200'
                        : 'bg-blue-50 text-blue-700'
                      : isPrimary
                      ? 'text-purple-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-800'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive 
                        ? isPrimary 
                          ? 'text-purple-500' 
                          : 'text-blue-500'
                        : isPrimary
                        ? 'text-purple-400 group-hover:text-purple-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={false}
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      className="truncate"
                    >
                      {item.name}
                      {isPrimary && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
                          AI
                        </span>
                      )}
                    </motion.span>
                  )}
                </Link>
              );
            })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <motion.div
            initial={false}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            className="text-xs text-gray-500"
          >
            <p>© 2024 Crewency</p>
            <p>v1.0.0</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}