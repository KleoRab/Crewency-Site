// Real Social Media OAuth Integration
export interface SocialAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string[];
}

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  profilePicture?: string;
  followers: number;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  connectedAt: string;
}

// LinkedIn OAuth
export const getLinkedInAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(' '),
    state: 'linkedin_' + Date.now(),
  });
  
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

// X OAuth 2.0
export const getXAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(' '),
    state: 'twitter_' + Date.now(),
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  });
  
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
};

// Facebook OAuth
export const getFacebookAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(','),
    response_type: 'code',
    state: 'facebook_' + Date.now(),
  });
  
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
};

// Instagram OAuth (via Facebook)
export const getInstagramAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(','),
    response_type: 'code',
    state: 'instagram_' + Date.now(),
  });
  
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
};

// YouTube OAuth
export const getYouTubeAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope.join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
    state: 'youtube_' + Date.now(),
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// TikTok OAuth
export const getTikTokAuthUrl = (config: SocialAuthConfig): string => {
  const params = new URLSearchParams({
    client_key: config.clientId,
    response_type: 'code',
    scope: config.scope.join(','),
    redirect_uri: config.redirectUri,
    state: 'tiktok_' + Date.now(),
  });
  
  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (
  platform: string,
  code: string,
  config: SocialAuthConfig
): Promise<SocialAccount> => {
  const response = await fetch('/api/auth/social/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform,
      code,
      redirectUri: config.redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${response.statusText}`);
  }

  return response.json();
};

// Refresh access token
export const refreshAccessToken = async (
  platform: string,
  refreshToken: string
): Promise<SocialAccount> => {
  const response = await fetch('/api/auth/social/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      platform,
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`);
  }

  return response.json();
};

// Get platform-specific configuration
export const getPlatformConfig = (platform: string): SocialAuthConfig => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const configs: Record<string, SocialAuthConfig> = {
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=linkedin`,
      scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=twitter`,
      scope: ['tweet.read', 'tweet.write', 'users.read', 'follows.read'],
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=facebook`,
      scope: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'],
    },
    instagram: {
      clientId: process.env.INSTAGRAM_CLIENT_ID || '',
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=instagram`,
      scope: ['user_profile', 'user_media'],
    },
    youtube: {
      clientId: process.env.YOUTUBE_CLIENT_ID || '',
      clientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=youtube`,
      scope: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'],
    },
    tiktok: {
      clientId: process.env.TIKTOK_CLIENT_ID || '',
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
      redirectUri: `${baseUrl}/api/auth/social/callback?platform=tiktok`,
      scope: ['user.info.basic', 'video.list'],
    },
  };

  return configs[platform] || configs.linkedin;
};

