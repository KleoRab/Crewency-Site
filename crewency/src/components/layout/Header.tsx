'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { User } from '@/types';
import NotificationCenter from '@/components/notifications/NotificationCenter';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  showLogo?: boolean;
}

export default function Header({ user, onLogout, showLogo = true }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        {showLogo && (
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
                  <Image
                    src="/crewency-logo.svg"
                    alt="Crewency - Social Media Management"
                    width={200}
                    height={45}
                    className="h-10 w-auto"
                  />
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 flex items-center justify-center space-x-8">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
            Dashboard
          </Link>
          <Link href="/schedule" className="text-gray-600 hover:text-gray-900 font-medium">
            Schedule
          </Link>
          <Link href="/analytics" className="text-gray-600 hover:text-gray-900 font-medium">
            Analytics
          </Link>
          <Link href="/ai-agent" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
            🚀 AI Agent
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts, analytics, team members..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <NotificationCenter />

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              >
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <UserCircleIcon className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Cog6ToothIcon className="mr-3 h-5 w-5" />
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={onLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}