import { createClient } from '@supabase/supabase-js';
import { User, Organization, SocialAccount, ScheduledPost, PostAnalytics } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DataServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class DataService {
  // User Management
  static async getCurrentUser(): Promise<DataServiceResponse<User>> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !userData) {
        return { success: false, error: 'User profile not found' };
      }

      return {
        success: true,
        data: {
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          role: userData.role,
          organizationId: userData.organization_id,
          createdAt: userData.created_at,
          updatedAt: userData.updated_at,
          emailVerified: userData.email_verified,
          status: userData.status,
        },
      };
    } catch (error) {
      return { success: false, error: 'Failed to get current user' };
    }
  }

  // Social Accounts Management
  static async getSocialAccounts(organizationId: string): Promise<DataServiceResponse<SocialAccount[]>> {
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: 'Failed to fetch social accounts' };
      }

      const accounts: SocialAccount[] = data.map(account => ({
        id: account.id,
        platform: account.platform,
        username: account.username,
        displayName: account.display_name,
        profilePicture: account.profile_picture_url,
        followers: account.followers_count,
        connected: true,
        lastSync: account.last_sync_at,
        status: 'connected',
      }));

      return { success: true, data: accounts };
    } catch (error) {
      return { success: false, error: 'Failed to fetch social accounts' };
    }
  }

  static async connectSocialAccount(
    organizationId: string,
    platform: string,
    accountData: Partial<SocialAccount>
  ): Promise<DataServiceResponse<SocialAccount>> {
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .insert({
          organization_id: organizationId,
          platform,
          platform_account_id: accountData.id || '',
          username: accountData.username || '',
          display_name: accountData.displayName,
          profile_picture_url: accountData.profilePicture,
          followers_count: accountData.followers || 0,
          access_token: 'mock_token', // In real implementation, this would be the actual token
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: 'Failed to connect social account' };
      }

      const socialAccount: SocialAccount = {
        id: data.id,
        platform: data.platform,
        username: data.username,
        displayName: data.display_name,
        profilePicture: data.profile_picture_url,
        followers: data.followers_count,
        connected: true,
        lastSync: data.last_sync_at,
        status: 'connected',
      };

      return { success: true, data: socialAccount };
    } catch (error) {
      return { success: false, error: 'Failed to connect social account' };
    }
  }

  static async disconnectSocialAccount(accountId: string): Promise<DataServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update({ is_active: false })
        .eq('id', accountId);

      if (error) {
        return { success: false, error: 'Failed to disconnect social account' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to disconnect social account' };
    }
  }

  // Scheduled Posts Management
  static async getScheduledPosts(organizationId: string): Promise<DataServiceResponse<ScheduledPost[]>> {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('organization_id', organizationId)
        .order('scheduled_for', { ascending: true });

      if (error) {
        return { success: false, error: 'Failed to fetch scheduled posts' };
      }

      const posts: ScheduledPost[] = data.map(post => ({
        id: post.id,
        content: post.content,
        scheduledFor: post.scheduled_for,
        status: post.status,
        userId: post.user_id,
        organizationId: post.organization_id,
        socialAccountId: post.social_account_id,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }));

      return { success: true, data: posts };
    } catch (error) {
      return { success: false, error: 'Failed to fetch scheduled posts' };
    }
  }

  static async createScheduledPost(
    organizationId: string,
    userId: string,
    postData: Partial<ScheduledPost>
  ): Promise<DataServiceResponse<ScheduledPost>> {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          organization_id: organizationId,
          user_id: userId,
          content: postData.content || '',
          platforms: postData.platforms || [],
          scheduled_for: postData.scheduledFor || new Date().toISOString(),
          status: postData.status || 'scheduled',
          media_urls: postData.mediaUrls || [],
          hashtags: postData.hashtags || [],
          metadata: postData.metadata || {},
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: 'Failed to create scheduled post' };
      }

      const post: ScheduledPost = {
        id: data.id,
        content: data.content,
        scheduledFor: data.scheduled_for,
        status: data.status,
        userId: data.user_id,
        organizationId: data.organization_id,
        socialAccountId: data.social_account_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { success: true, data: post };
    } catch (error) {
      return { success: false, error: 'Failed to create scheduled post' };
    }
  }

  static async updateScheduledPost(
    postId: string,
    updates: Partial<ScheduledPost>
  ): Promise<DataServiceResponse<ScheduledPost>> {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .update({
          content: updates.content,
          scheduled_for: updates.scheduledFor,
          status: updates.status,
          media_urls: updates.mediaUrls,
          hashtags: updates.hashtags,
          metadata: updates.metadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) {
        return { success: false, error: 'Failed to update scheduled post' };
      }

      const post: ScheduledPost = {
        id: data.id,
        content: data.content,
        scheduledFor: data.scheduled_for,
        status: data.status,
        userId: data.user_id,
        organizationId: data.organization_id,
        socialAccountId: data.social_account_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { success: true, data: post };
    } catch (error) {
      return { success: false, error: 'Failed to update scheduled post' };
    }
  }

  static async deleteScheduledPost(postId: string): Promise<DataServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        return { success: false, error: 'Failed to delete scheduled post' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete scheduled post' };
    }
  }

  // Analytics Management
  static async getPostAnalytics(
    organizationId: string,
    startDate?: string,
    endDate?: string
  ): Promise<DataServiceResponse<PostAnalytics[]>> {
    try {
      let query = supabase
        .from('post_analytics')
        .select(`
          *,
          scheduled_posts!inner(organization_id)
        `)
        .eq('scheduled_posts.organization_id', organizationId);

      if (startDate) {
        query = query.gte('recorded_at', startDate);
      }
      if (endDate) {
        query = query.lte('recorded_at', endDate);
      }

      const { data, error } = await query.order('recorded_at', { ascending: false });

      if (error) {
        return { success: false, error: 'Failed to fetch post analytics' };
      }

      const analytics: PostAnalytics[] = data.map(item => ({
        id: item.id,
        postId: item.post_id,
        platform: item.platform,
        platformPostId: item.platform_post_id,
        metrics: item.metrics,
        recordedAt: item.recorded_at,
        createdAt: item.created_at,
      }));

      return { success: true, data: analytics };
    } catch (error) {
      return { success: false, error: 'Failed to fetch post analytics' };
    }
  }

  // Organization Management
  static async getOrganization(organizationId: string): Promise<DataServiceResponse<Organization>> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .single();

      if (error || !data) {
        return { success: false, error: 'Organization not found' };
      }

      const organization: Organization = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        plan: data.plan,
        settings: data.settings || {},
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return { success: true, data: organization };
    } catch (error) {
      return { success: false, error: 'Failed to fetch organization' };
    }
  }

  // Team Management
  static async getTeamMembers(organizationId: string): Promise<DataServiceResponse<User[]>> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: 'Failed to fetch team members' };
      }

      const members: User[] = data.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        organizationId: user.organization_id,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        emailVerified: user.email_verified,
        status: user.status,
      }));

      return { success: true, data: members };
    } catch (error) {
      return { success: false, error: 'Failed to fetch team members' };
    }
  }

  // Notifications Management
  static async getNotifications(userId: string): Promise<DataServiceResponse<any[]>> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        return { success: false, error: 'Failed to fetch notifications' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch notifications' };
    }
  }

  static async markNotificationAsRead(notificationId: string): Promise<DataServiceResponse<void>> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        return { success: false, error: 'Failed to mark notification as read' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to mark notification as read' };
    }
  }
}

