import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/database/supabase';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Email and password are required',
      }, { status: 400 });
    }

    const supabase = await createServerSupabase();

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid email or password',
      }, { status: 401 });
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
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'User not found',
      }, { status: 404 });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);

    // Create audit log
    await supabase.from('audit_logs').insert({
      user_id: data.user.id,
      organization_id: userData.organization_id,
      action: 'login',
      resource_type: 'user',
      resource_id: data.user.id,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        user: {
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
        },
        session: data.session,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}