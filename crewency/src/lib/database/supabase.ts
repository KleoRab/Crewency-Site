import { createClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Only throw error in production runtime if variables are missing
// Allow build to complete with placeholder values
if (process.env.NODE_ENV === 'production' && 
    typeof window === 'undefined' && 
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'placeholder-key') {
  console.warn('Supabase environment variables not set - using placeholder values');
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client component client (for use in client components)
export const createClientSupabase = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// Server component client (for use in server components)
export const createServerSupabase = async () => {
  try {
    const cookieStore = await cookies();
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });
  } catch (error) {
    console.warn('Failed to create server Supabase client:', error);
    // Return a fallback client
    return createClient(supabaseUrl, supabaseAnonKey);
  }
};

// Admin client (for server-side operations with service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types (generated from schema)
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
          status: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string | null;
          first_name: string;
          last_name: string;
          avatar_url: string | null;
          role: 'admin' | 'editor' | 'viewer' | 'owner';
          organization_id: string;
          created_at: string;
          updated_at: string;
          last_login: string | null;
          email_verified: boolean;
          status: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
        Insert: {
          id?: string;
          email: string;
          password_hash?: string | null;
          first_name: string;
          last_name: string;
          avatar_url?: string | null;
          role?: 'admin' | 'editor' | 'viewer' | 'owner';
          organization_id: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          email_verified?: boolean;
          status?: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string | null;
          first_name?: string;
          last_name?: string;
          avatar_url?: string | null;
          role?: 'admin' | 'editor' | 'viewer' | 'owner';
          organization_id?: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          email_verified?: boolean;
          status?: 'active' | 'suspended' | 'pending' | 'cancelled';
        };
      };
      oauth_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_user_id: string;
          access_token: string;
          refresh_token: string | null;
          token_expires_at: string | null;
          scope: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_user_id: string;
          access_token: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scope?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          platform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_user_id?: string;
          access_token?: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scope?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      social_accounts: {
        Row: {
          id: string;
          user_id: string;
          oauth_account_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_username: string;
          platform_display_name: string | null;
          platform_avatar_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          oauth_account_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_username: string;
          platform_display_name?: string | null;
          platform_avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          oauth_account_id?: string;
          platform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_username?: string;
          platform_display_name?: string | null;
          platform_avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      scheduled_posts: {
        Row: {
          id: string;
          user_id: string;
          organization_id: string;
          social_account_id: string;
          category_id: string | null;
          title: string | null;
          content: string;
          media_urls: string[] | null;
          hashtags: string[] | null;
          scheduled_for: string;
          status: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';
          platform_specific_data: Record<string, any> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          organization_id: string;
          social_account_id: string;
          category_id?: string | null;
          title?: string | null;
          content: string;
          media_urls?: string[] | null;
          hashtags?: string[] | null;
          scheduled_for: string;
          status?: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';
          platform_specific_data?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          organization_id?: string;
          social_account_id?: string;
          category_id?: string | null;
          title?: string | null;
          content?: string;
          media_urls?: string[] | null;
          hashtags?: string[] | null;
          scheduled_for?: string;
          status?: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';
          platform_specific_data?: Record<string, any> | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      post_analytics: {
        Row: {
          id: string;
          post_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_post_id: string | null;
          likes_count: number;
          comments_count: number;
          shares_count: number;
          reach_count: number;
          impressions_count: number;
          engagement_rate: number | null;
          sentiment_score: number | null;
          collected_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_post_id?: string | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          reach_count?: number;
          impressions_count?: number;
          engagement_rate?: number | null;
          sentiment_score?: number | null;
          collected_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          platform?: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
          platform_post_id?: string | null;
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          reach_count?: number;
          impressions_count?: number;
          engagement_rate?: number | null;
          sentiment_score?: number | null;
          collected_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'editor' | 'viewer' | 'owner';
      account_status: 'active' | 'suspended' | 'pending' | 'cancelled';
      social_platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube' | 'threads' | 'reddit' | 'pinterest' | 'tumblr';
      post_status: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}