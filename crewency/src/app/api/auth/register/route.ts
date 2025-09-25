import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/database/supabase';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, organizationName } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'All required fields must be provided',
      }, { status: 400 });
    }

    const supabase = createServerSupabase();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: authError.message,
      }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to create user',
      }, { status: 500 });
    }

    // Create organization if provided
    let organizationId = null;
    if (organizationName) {
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: organizationName,
          slug: organizationName.toLowerCase().replace(/\s+/g, '-'),
        })
        .select()
        .single();

      if (orgError) {
        console.error('Organization creation error:', orgError);
        // Continue without organization
      } else {
        organizationId = orgData.id;
      }
    }

    // Create user record in our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        organization_id: organizationId,
        role: organizationId ? 'owner' : 'viewer',
        email_verified: false,
        status: 'active',
      })
      .select()
      .single();

    if (userError) {
      console.error('User creation error:', userError);
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to create user profile',
      }, { status: 500 });
    }

    // Create audit log
    await supabase.from('audit_logs').insert({
      user_id: authData.user.id,
      organization_id: organizationId,
      action: 'register',
      resource_type: 'user',
      resource_id: authData.user.id,
      ip_address: request.ip || request.headers.get('x-forwarded-for'),
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
        session: authData.session,
      },
      message: 'Account created successfully. Please check your email to verify your account.',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}