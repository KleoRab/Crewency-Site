import { createServerSupabase } from '@/lib/database/supabase';
import { User, UserRole } from '@/types';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Get current user from server-side
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createServerSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Get user details from our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        first_name,
        last_name,
        avatar_url,
        role,
        organization_id,
        created_at,
        updated_at,
        last_login,
        email_verified,
        status
      `)
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      avatarUrl: userData.avatar_url,
      role: userData.role,
      organizationId: userData.organization_id,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
      lastLogin: userData.last_login,
      emailVerified: userData.email_verified,
      status: userData.status,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if user has specific permission
export function hasPermission(userRole: UserRole, permission: string): boolean {
  const rolePermissions = {
    owner: ['*'], // All permissions
    admin: [
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
    editor: [
      'posts:read',
      'posts:write',
      'posts:delete',
      'analytics:read',
      'social_accounts:read',
      'social_accounts:write',
    ],
    viewer: [
      'posts:read',
      'analytics:read',
      'social_accounts:read',
    ],
  };

  const permissions = rolePermissions[userRole] || [];
  return permissions.includes('*') || permissions.includes(permission);
}

// Check if user can access organization
export async function canAccessOrganization(
  userId: string,
  organizationId: string
): Promise<boolean> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('users')
      .select('organization_id')
      .eq('id', userId)
      .eq('organization_id', organizationId)
      .single();

    return !error && !!data;
  } catch (error) {
    console.error('Error checking organization access:', error);
    return false;
  }
}

// Get user's organization
export async function getUserOrganization(userId: string) {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('users')
      .select(`
        organization_id,
        organizations (
          id,
          name,
          slug,
          description,
          logo_url,
          website,
          status
        )
      `)
      .eq('id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data.organizations;
  } catch (error) {
    console.error('Error getting user organization:', error);
    return null;
  }
}

// Middleware to check authentication
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

// Middleware to check specific permission
export async function requirePermission(permission: string): Promise<User> {
  const user = await requireAuth();
  if (!hasPermission(user.role, permission)) {
    throw new Error('Insufficient permissions');
  }
  return user;
}

// Middleware to check organization access
export async function requireOrganizationAccess(
  organizationId: string
): Promise<User> {
  const user = await requireAuth();
  const hasAccess = await canAccessOrganization(user.id, organizationId);
  if (!hasAccess) {
    throw new Error('Organization access denied');
  }
  return user;
}

// Update user's last login
export async function updateLastLogin(userId: string): Promise<void> {
  try {
    const supabase = createServerSupabase();
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);
  } catch (error) {
    console.error('Error updating last login:', error);
  }
}

// Create audit log entry
export async function createAuditLog(
  userId: string,
  organizationId: string,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>,
  request?: NextRequest
): Promise<void> {
  try {
    const supabase = createServerSupabase();
    await supabase.from('audit_logs').insert({
      user_id: userId,
      organization_id: organizationId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details,
      ip_address: request?.ip || request?.headers.get('x-forwarded-for'),
      user_agent: request?.headers.get('user-agent'),
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
}

// Validate JWT token
export async function validateToken(token: string): Promise<boolean> {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase.auth.getUser(token);
    return !error && !!data.user;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}

// Get user from request headers
export async function getUserFromRequest(request: NextRequest): Promise<User | null> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const isValid = await validateToken(token);
    if (!isValid) {
      return null;
    }

    return await getCurrentUser();
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}