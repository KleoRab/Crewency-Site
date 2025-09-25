// Constants for Crewency platform

import { SocialPlatform, PlatformLimits } from '@/types';

// Brand colors (deep-to-light blues from Crewency logo)
export const BRAND_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
} as const;

// Social media platform configurations
export const SOCIAL_PLATFORMS: Record<SocialPlatform, {
  name: string;
  color: string;
  icon: string;
  limits: PlatformLimits;
  apiEndpoint?: string;
}> = {
  facebook: {
    name: 'Facebook',
    color: '#1877f2',
    icon: 'facebook',
    limits: {
      maxCharacters: 63206,
      maxImages: 10,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif'],
      videoFormats: ['mp4', 'mov', 'avi'],
      videoMaxDuration: 240,
      hashtagLimit: 30,
    },
    apiEndpoint: 'https://graph.facebook.com/v18.0',
  },
  instagram: {
    name: 'Instagram',
    color: '#e4405f',
    icon: 'instagram',
    limits: {
      maxCharacters: 2200,
      maxImages: 10,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png'],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 60,
      hashtagLimit: 30,
    },
    apiEndpoint: 'https://graph.facebook.com/v18.0',
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0077b5',
    icon: 'linkedin',
    limits: {
      maxCharacters: 3000,
      maxImages: 9,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif'],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 600,
      hashtagLimit: 5,
    },
    apiEndpoint: 'https://api.linkedin.com/v2',
  },
  twitter: {
    name: 'X (Twitter)',
    color: '#000000',
    icon: 'twitter',
    limits: {
      maxCharacters: 280,
      maxImages: 4,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 140,
      hashtagLimit: 2,
    },
    apiEndpoint: 'https://api.twitter.com/2',
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    icon: 'tiktok',
    limits: {
      maxCharacters: 2200,
      maxImages: 0,
      maxVideos: 1,
      imageFormats: [],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 180,
      hashtagLimit: 100,
    },
    apiEndpoint: 'https://open-api.tiktok.com',
  },
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    icon: 'youtube',
    limits: {
      maxCharacters: 5000,
      maxImages: 0,
      maxVideos: 1,
      imageFormats: [],
      videoFormats: ['mp4', 'mov', 'avi', 'wmv', 'flv'],
      videoMaxDuration: 43200, // 12 hours
      hashtagLimit: 15,
    },
    apiEndpoint: 'https://www.googleapis.com/youtube/v3',
  },
  threads: {
    name: 'Threads',
    color: '#000000',
    icon: 'threads',
    limits: {
      maxCharacters: 500,
      maxImages: 10,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif'],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 60,
      hashtagLimit: 30,
    },
  },
  reddit: {
    name: 'Reddit',
    color: '#ff4500',
    icon: 'reddit',
    limits: {
      maxCharacters: 40000,
      maxImages: 20,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      videoFormats: ['mp4', 'mov', 'gif'],
      videoMaxDuration: 60,
      hashtagLimit: 0,
    },
    apiEndpoint: 'https://oauth.reddit.com',
  },
  pinterest: {
    name: 'Pinterest',
    color: '#bd081c',
    icon: 'pinterest',
    limits: {
      maxCharacters: 500,
      maxImages: 1,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif'],
      videoFormats: ['mp4', 'mov'],
      videoMaxDuration: 15,
      hashtagLimit: 20,
    },
    apiEndpoint: 'https://api.pinterest.com/v5',
  },
  tumblr: {
    name: 'Tumblr',
    color: '#00cf35',
    icon: 'tumblr',
    limits: {
      maxCharacters: 10000,
      maxImages: 10,
      maxVideos: 1,
      imageFormats: ['jpg', 'jpeg', 'png', 'gif'],
      videoFormats: ['mp4', 'mov', 'gif'],
      videoMaxDuration: 60,
      hashtagLimit: 30,
    },
    apiEndpoint: 'https://api.tumblr.com/v2',
  },
};

// User roles and permissions
export const USER_ROLES = {
  owner: {
    name: 'Owner',
    description: 'Full access to organization and billing',
    permissions: ['*'],
    color: 'purple',
  },
  admin: {
    name: 'Admin',
    description: 'Manage users and organization settings',
    permissions: [
      'users:read',
      'users:write',
      'users:delete',
      'organization:read',
      'organization:write',
      'posts:read',
      'posts:write',
      'posts:delete',
      'analytics:read',
      'settings:read',
      'settings:write',
    ],
    color: 'blue',
  },
  editor: {
    name: 'Editor',
    description: 'Create and manage content',
    permissions: [
      'posts:read',
      'posts:write',
      'posts:delete',
      'analytics:read',
      'social_accounts:read',
      'social_accounts:write',
    ],
    color: 'green',
  },
  viewer: {
    name: 'Viewer',
    description: 'View content and analytics only',
    permissions: [
      'posts:read',
      'analytics:read',
      'social_accounts:read',
    ],
    color: 'gray',
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
  },
  users: {
    list: '/api/users',
    create: '/api/users',
    update: '/api/users/[id]',
    delete: '/api/users/[id]',
  },
  organizations: {
    list: '/api/organizations',
    create: '/api/organizations',
    update: '/api/organizations/[id]',
    delete: '/api/organizations/[id]',
  },
  socialAccounts: {
    list: '/api/social-accounts',
    connect: '/api/social-accounts/connect',
    disconnect: '/api/social-accounts/[id]/disconnect',
    refresh: '/api/social-accounts/[id]/refresh',
  },
  posts: {
    list: '/api/posts',
    create: '/api/posts',
    update: '/api/posts/[id]',
    delete: '/api/posts/[id]',
    schedule: '/api/posts/[id]/schedule',
    publish: '/api/posts/[id]/publish',
  },
  analytics: {
    dashboard: '/api/analytics/dashboard',
    posts: '/api/analytics/posts',
    export: '/api/analytics/export',
  },
  ai: {
    generateCaption: '/api/ai/caption',
    generateHashtags: '/api/ai/hashtags',
    generateImagePrompt: '/api/ai/image-prompt',
    generateVideoPrompt: '/api/ai/video-prompt',
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  MAX_IMAGES_PER_POST: 10,
  MAX_VIDEOS_PER_POST: 1,
} as const;

// AI content generation limits
export const AI_LIMITS = {
  FREE_TIER_CREDITS: 100,
  PAID_TIER_CREDITS: -1, // Unlimited
  CREDIT_COST: {
    caption: 1,
    hashtags: 1,
    image_prompt: 2,
    video_prompt: 3,
  },
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  POST_PUBLISHED: 'post_published',
  POST_FAILED: 'post_failed',
  ACCOUNT_DISCONNECTED: 'account_disconnected',
  VIRAL_POST: 'viral_post',
  WEEKLY_REPORT: 'weekly_report',
  SYSTEM_MAINTENANCE: 'system_maintenance',
} as const;

// Recurring campaign patterns
export const RECURRING_PATTERNS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
} as const;

// Time zones
export const COMMON_TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
] as const;

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  NETWORK_ERROR: 'Network error. Please try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
  ACCOUNT_SUSPENDED: 'Your account has been suspended',
  INSUFFICIENT_CREDITS: 'Insufficient credits. Please upgrade your plan.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!',
  POST_SCHEDULED: 'Post scheduled successfully!',
  POST_PUBLISHED: 'Post published successfully!',
  ACCOUNT_CONNECTED: 'Social account connected successfully!',
  ACCOUNT_DISCONNECTED: 'Social account disconnected successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;