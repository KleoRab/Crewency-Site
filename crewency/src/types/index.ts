// Core types for Crewency platform

export type UserRole = 'admin' | 'editor' | 'viewer' | 'owner';
export type AccountStatus = 'active' | 'suspended' | 'pending' | 'cancelled';
export type SocialPlatform = 
  | 'facebook' 
  | 'instagram' 
  | 'linkedin' 
  | 'twitter' 
  | 'tiktok' 
  | 'youtube' 
  | 'threads' 
  | 'reddit' 
  | 'pinterest' 
  | 'tumblr';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  emailVerified: boolean;
  status: AccountStatus;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  status: AccountStatus;
}

export interface OAuthAccount {
  id: string;
  userId: string;
  platform: SocialPlatform;
  platformUserId: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: string;
  scope?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SocialAccount {
  id: string;
  userId: string;
  oauthAccountId: string;
  platform: SocialPlatform;
  platformUsername: string;
  platformDisplayName?: string;
  platformAvatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  organizationId: string;
  createdAt: string;
}

export interface ScheduledPost {
  id: string;
  userId: string;
  organizationId: string;
  socialAccountId: string;
  categoryId?: string;
  title?: string;
  content: string;
  mediaUrls?: string[];
  hashtags?: string[];
  scheduledFor: string;
  status: PostStatus;
  platformSpecificData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface PostAnalytics {
  id: string;
  postId: string;
  platform: SocialPlatform;
  platformPostId?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  reachCount: number;
  impressionsCount: number;
  engagementRate?: number;
  sentimentScore?: number;
  collectedAt: string;
  createdAt: string;
}

export interface AIContentRequest {
  id: string;
  userId: string;
  organizationId: string;
  requestType: 'caption' | 'hashtags' | 'image_prompt' | 'video_prompt';
  prompt: string;
  generatedContent?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

export interface SystemSettings {
  id: string;
  organizationId: string;
  settingKey: string;
  settingValue: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  organizationId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName?: string;
  acceptTerms: boolean;
}

export interface PostForm {
  content: string;
  mediaUrls?: string[];
  hashtags?: string[];
  scheduledFor: string;
  socialAccountIds: string[];
  categoryId?: string;
  title?: string;
}

// Dashboard types
export interface DashboardStats {
  totalPosts: number;
  scheduledPosts: number;
  publishedPosts: number;
  totalEngagement: number;
  followerGrowth: number;
  topPerformingPost?: ScheduledPost;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'post_published' | 'post_scheduled' | 'account_connected' | 'analytics_updated';
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Social Media Platform specific types
export interface PlatformLimits {
  maxCharacters: number;
  maxImages: number;
  maxVideos: number;
  imageFormats: string[];
  videoFormats: string[];
  videoMaxDuration?: number; // in seconds
  hashtagLimit?: number;
}

export interface PlatformPostData {
  platform: SocialPlatform;
  content: string;
  mediaUrls?: string[];
  hashtags?: string[];
  scheduledFor: string;
  platformSpecificData?: Record<string, any>;
}

// Module types for extensibility
export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  isActive: boolean;
  routes: ModuleRoute[];
  permissions: string[];
}

export interface ModuleRoute {
  path: string;
  component: string;
  permissions?: string[];
  isPublic?: boolean;
}