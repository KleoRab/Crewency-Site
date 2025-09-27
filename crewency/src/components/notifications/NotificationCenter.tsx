'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Post Published',
    message: 'Your LinkedIn post has been successfully published and is now live.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Scheduled Post',
    message: 'Your Twitter post is scheduled for 2:00 PM today.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Account Sync Issue',
    message: 'Facebook account sync failed. Please reconnect your account.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: true,
    action: {
      label: 'Reconnect',
      onClick: () => console.log('Reconnect Facebook'),
    },
  },
  {
    id: '4',
    type: 'success',
    title: 'Analytics Updated',
    message: 'Your weekly analytics report is ready to view.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Team Member Added',
    message: 'Sarah Johnson has been added to your team as an Editor.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
  },
];

const NotificationItem = ({ notification, onMarkAsRead, onDismiss }: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className={`p-4 rounded-lg border ${getBgColor()} ${!notification.read ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
              <button
                onClick={() => onDismiss(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        {!notification.read && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <CheckIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <BellIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onDismiss={handleDismiss}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
