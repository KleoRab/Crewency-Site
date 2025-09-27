import { NextRequest, NextResponse } from 'next/server';
import { SocialAccount } from '@/lib/auth/socialAuth';

// Mock database - in production, this would be a real database
const socialAccounts: SocialAccount[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, code, redirectUri } = body;

    if (!platform || !code) {
      return NextResponse.json(
        { success: false, error: 'Missing platform or code' },
        { status: 400 }
      );
    }

    // Simulate OAuth token exchange
    const mockAccount: SocialAccount = {
      id: `${platform}_${Date.now()}`,
      platform,
      username: `@${platform}_user_${Math.floor(Math.random() * 1000)}`,
      displayName: `${platform.charAt(0).toUpperCase() + platform.slice(1)} User`,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform}`,
      followers: Math.floor(Math.random() * 50000) + 1000,
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresAt: Date.now() + (3600 * 1000), // 1 hour
      connectedAt: new Date().toISOString(),
    };

    // Store in mock database
    socialAccounts.push(mockAccount);

    return NextResponse.json({
      success: true,
      data: mockAccount,
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process OAuth callback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!platform || !code) {
      return NextResponse.json(
        { success: false, error: 'Missing platform or code' },
        { status: 400 }
      );
    }

    // Simulate OAuth token exchange
    const mockAccount: SocialAccount = {
      id: `${platform}_${Date.now()}`,
      platform,
      username: `@${platform}_user_${Math.floor(Math.random() * 1000)}`,
      displayName: `${platform.charAt(0).toUpperCase() + platform.slice(1)} User`,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform}`,
      followers: Math.floor(Math.random() * 50000) + 1000,
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresAt: Date.now() + (3600 * 1000), // 1 hour
      connectedAt: new Date().toISOString(),
    };

    // Store in mock database
    socialAccounts.push(mockAccount);

    // Redirect to accounts page with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/accounts?connected=${platform}`
    );
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/accounts?error=oauth_failed`
    );
  }
}

