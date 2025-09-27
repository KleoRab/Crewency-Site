import { createClient } from '@supabase/supabase-js';
import { User, Organization } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  organizationId: string;
  avatarUrl?: string;
  emailVerified: boolean;
  status: 'active' | 'inactive' | 'suspended';
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

// Authentication functions
export const authService = {
  // Sign up with email and password
  async signUp(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            organization_name: credentials.organizationName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Create organization
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: credentials.organizationName,
            slug: credentials.organizationName.toLowerCase().replace(/\s+/g, '-'),
            plan: 'free',
          })
          .select()
          .single();

        if (orgError) {
          return { success: false, error: 'Failed to create organization' };
        }

        // Create user profile
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: credentials.email,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            role: 'owner',
            organization_id: orgData.id,
            email_verified: false,
          });

        if (userError) {
          return { success: false, error: 'Failed to create user profile' };
        }

        return {
          success: true,
          user: {
            id: data.user.id,
            email: credentials.email,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            role: 'owner',
            organizationId: orgData.id,
            emailVerified: false,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      }

      return { success: false, error: 'Failed to create account' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Sign in with email and password
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Get user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError || !userData) {
          return { success: false, error: 'User profile not found' };
        }

        // Update last login
        await supabase
          .from('users')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', data.user.id);

        return {
          success: true,
          user: {
            id: userData.id,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            role: userData.role,
            organizationId: userData.organization_id,
            avatarUrl: userData.avatar_url,
            emailVerified: userData.email_verified,
            status: userData.status,
            lastLoginAt: userData.last_login_at,
            createdAt: userData.created_at,
            updatedAt: userData.updated_at,
          },
        };
      }

      return { success: false, error: 'Failed to sign in' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Sign out
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
      return null;
    }

      const { data: userData, error } = await supabase
      .from('users')
        .select('*')
      .eq('id', user.id)
      .single();

      if (error || !userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      role: userData.role,
      organizationId: userData.organization_id,
        avatarUrl: userData.avatar_url,
        emailVerified: userData.email_verified,
        status: userData.status,
        lastLoginAt: userData.last_login_at,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    };
  } catch (error) {
    return null;
  }
  },

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
  } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Update password
  async updatePassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
  } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Update profile
  async updateProfile(updates: Partial<AuthUser>): Promise<AuthResponse> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
  if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('users')
        .update({
          first_name: updates.firstName,
          last_name: updates.lastName,
          avatar_url: updates.avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        return { success: false, error: 'Failed to update profile' };
      }

      return { success: true };
  } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Check if user has permission
  hasPermission(user: AuthUser, action: string, resource?: string): boolean {
    const permissions = {
      owner: ['*'], // Can do everything
      admin: ['read', 'write', 'delete', 'invite'],
      editor: ['read', 'write'],
      viewer: ['read'],
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(action);
  },

  // Get organization members
  async getOrganizationMembers(organizationId: string): Promise<AuthUser[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (error) {
        return [];
      }

      return data.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        organizationId: user.organization_id,
        avatarUrl: user.avatar_url,
        emailVerified: user.email_verified,
        status: user.status,
        lastLoginAt: user.last_login_at,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      }));
  } catch (error) {
      return [];
  }
  },
};