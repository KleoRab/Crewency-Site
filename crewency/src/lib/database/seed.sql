-- Seed data for Crewency development and testing
-- Run this after setting up the main schema

-- Insert sample organizations
INSERT INTO organizations (id, name, slug, description, logo_url, website, status) VALUES
('org-1', 'Acme Corporation', 'acme-corporation', 'A leading technology company', 'https://via.placeholder.com/150', 'https://acme.com', 'active'),
('org-2', 'StartupXYZ', 'startupxyz', 'Innovative startup disrupting the market', 'https://via.placeholder.com/150', 'https://startupxyz.com', 'active'),
('org-3', 'Marketing Agency Pro', 'marketing-agency-pro', 'Full-service digital marketing agency', 'https://via.placeholder.com/150', 'https://marketingagencypro.com', 'active');

-- Insert sample users
INSERT INTO users (id, email, first_name, last_name, avatar_url, role, organization_id, email_verified, status) VALUES
('user-1', 'john.doe@acme.com', 'John', 'Doe', 'https://via.placeholder.com/150', 'owner', 'org-1', true, 'active'),
('user-2', 'jane.smith@acme.com', 'Jane', 'Smith', 'https://via.placeholder.com/150', 'admin', 'org-1', true, 'active'),
('user-3', 'mike.johnson@startupxyz.com', 'Mike', 'Johnson', 'https://via.placeholder.com/150', 'owner', 'org-2', true, 'active'),
('user-4', 'sarah.wilson@agency.com', 'Sarah', 'Wilson', 'https://via.placeholder.com/150', 'owner', 'org-3', true, 'active'),
('user-5', 'alex.brown@agency.com', 'Alex', 'Brown', 'https://via.placeholder.com/150', 'editor', 'org-3', true, 'active');

-- Insert sample OAuth accounts
INSERT INTO oauth_accounts (id, user_id, platform, platform_user_id, access_token, refresh_token, token_expires_at, scope) VALUES
('oauth-1', 'user-1', 'linkedin', 'linkedin-123', 'mock_access_token_1', 'mock_refresh_token_1', NOW() + INTERVAL '1 hour', ARRAY['r_liteprofile', 'r_emailaddress']),
('oauth-2', 'user-1', 'twitter', 'twitter-456', 'mock_access_token_2', 'mock_refresh_token_2', NOW() + INTERVAL '1 hour', ARRAY['tweet.read', 'tweet.write']),
('oauth-3', 'user-2', 'facebook', 'facebook-789', 'mock_access_token_3', 'mock_refresh_token_3', NOW() + INTERVAL '1 hour', ARRAY['pages_manage_posts', 'pages_read_engagement']),
('oauth-4', 'user-3', 'linkedin', 'linkedin-101', 'mock_access_token_4', 'mock_refresh_token_4', NOW() + INTERVAL '1 hour', ARRAY['r_liteprofile', 'r_emailaddress']),
('oauth-5', 'user-4', 'instagram', 'instagram-202', 'mock_access_token_5', 'mock_refresh_token_5', NOW() + INTERVAL '1 hour', ARRAY['instagram_basic', 'instagram_content_publish']);

-- Insert sample social accounts
INSERT INTO social_accounts (id, user_id, oauth_account_id, platform, platform_username, platform_display_name, platform_avatar_url, is_active) VALUES
('social-1', 'user-1', 'oauth-1', 'linkedin', 'acme-corp', 'Acme Corporation', 'https://via.placeholder.com/150', true),
('social-2', 'user-1', 'oauth-2', 'twitter', 'acme_corp', 'Acme Corp', 'https://via.placeholder.com/150', true),
('social-3', 'user-2', 'oauth-3', 'facebook', 'acme.corporation', 'Acme Corporation', 'https://via.placeholder.com/150', true),
('social-4', 'user-3', 'oauth-4', 'linkedin', 'startup-xyz', 'StartupXYZ', 'https://via.placeholder.com/150', true),
('social-5', 'user-4', 'oauth-5', 'instagram', 'marketing_agency_pro', 'Marketing Agency Pro', 'https://via.placeholder.com/150', true);

-- Insert sample content categories
INSERT INTO content_categories (id, name, description, color, organization_id) VALUES
('cat-1', 'Product Updates', 'Announcements about new products and features', '#3B82F6', 'org-1'),
('cat-2', 'Industry News', 'Latest news and trends in our industry', '#10B981', 'org-1'),
('cat-3', 'Company Culture', 'Behind-the-scenes content and team highlights', '#F59E0B', 'org-1'),
('cat-4', 'Marketing Tips', 'Educational content about marketing strategies', '#8B5CF6', 'org-3'),
('cat-5', 'Client Success', 'Case studies and client testimonials', '#EF4444', 'org-3');

-- Insert sample scheduled posts
INSERT INTO scheduled_posts (id, user_id, organization_id, social_account_id, category_id, title, content, media_urls, hashtags, scheduled_for, status, platform_specific_data) VALUES
('post-1', 'user-1', 'org-1', 'social-1', 'cat-1', 'New Product Launch', 'Excited to announce our latest product! 🚀 This revolutionary tool will change how you work. #innovation #product #launch', ARRAY['https://via.placeholder.com/800x600'], ARRAY['innovation', 'product', 'launch'], NOW() + INTERVAL '2 hours', 'scheduled', '{"linkedin_visibility": "public"}'),
('post-2', 'user-1', 'org-1', 'social-2', 'cat-1', 'Product Launch Tweet', '🚀 Just launched our new product! Check it out: https://acme.com/new-product #innovation #startup', NULL, ARRAY['innovation', 'startup'], NOW() + INTERVAL '2 hours', 'scheduled', '{"twitter_reply_settings": "everyone"}'),
('post-3', 'user-2', 'org-1', 'social-3', 'cat-2', 'Industry Insights', 'The future of technology is here! Here are 5 trends shaping our industry in 2024. #tech #future #trends', ARRAY['https://via.placeholder.com/800x600'], ARRAY['tech', 'future', 'trends'], NOW() + INTERVAL '1 day', 'scheduled', '{"facebook_visibility": "public"}'),
('post-4', 'user-3', 'org-2', 'social-4', NULL, 'Startup Journey', 'Building a startup is a rollercoaster ride! Here are the lessons we learned in our first year. #startup #entrepreneur #lessons', NULL, ARRAY['startup', 'entrepreneur', 'lessons'], NOW() + INTERVAL '3 hours', 'scheduled', '{"linkedin_visibility": "public"}'),
('post-5', 'user-4', 'org-3', 'social-5', 'cat-4', 'Marketing Tip', 'Pro tip: Consistency is key in social media marketing! Post regularly and engage with your audience. #marketing #socialmedia #tips', ARRAY['https://via.placeholder.com/800x600'], ARRAY['marketing', 'socialmedia', 'tips'], NOW() + INTERVAL '6 hours', 'scheduled', '{"instagram_caption": "Pro tip: Consistency is key in social media marketing! Post regularly and engage with your audience. #marketing #socialmedia #tips"}');

-- Insert sample post analytics
INSERT INTO post_analytics (id, post_id, platform, platform_post_id, likes_count, comments_count, shares_count, reach_count, impressions_count, engagement_rate, sentiment_score) VALUES
('analytics-1', 'post-1', 'linkedin', 'linkedin-post-123', 45, 12, 8, 1250, 3200, 2.03, 0.8),
('analytics-2', 'post-2', 'twitter', 'twitter-post-456', 23, 5, 15, 890, 2100, 2.05, 0.7),
('analytics-3', 'post-3', 'facebook', 'facebook-post-789', 67, 18, 22, 2100, 5400, 1.98, 0.9),
('analytics-4', 'post-4', 'linkedin', 'linkedin-post-101', 34, 9, 6, 980, 2800, 1.75, 0.6),
('analytics-5', 'post-5', 'instagram', 'instagram-post-202', 89, 25, 12, 1800, 4200, 3.00, 0.85);

-- Insert sample AI content requests
INSERT INTO ai_content_requests (id, user_id, organization_id, request_type, prompt, generated_content, status, created_at, completed_at) VALUES
('ai-1', 'user-1', 'org-1', 'caption', 'Write a LinkedIn post about our new AI-powered analytics feature', 'Excited to share our latest AI-powered analytics feature! 📊 This game-changing tool provides deep insights into your social media performance, helping you make data-driven decisions. #AI #analytics #socialmedia #innovation', 'completed', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'),
('ai-2', 'user-2', 'org-1', 'hashtags', 'Generate hashtags for a post about remote work productivity', 'remote work, productivity, work from home, efficiency, digital nomad, flexible work, team collaboration, work life balance, productivity tips, remote team', 'completed', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes'),
('ai-3', 'user-3', 'org-2', 'image_prompt', 'Create a prompt for an image about startup funding', 'A modern, professional illustration showing a startup team celebrating a successful funding round. Include elements like dollar signs, growth charts, handshakes, and a bright, optimistic color scheme. Style: clean, corporate, motivational.', 'completed', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '10 minutes'),
('ai-4', 'user-4', 'org-3', 'video_prompt', 'Create a prompt for a marketing tutorial video', 'A 60-second tutorial video showing how to create engaging social media content. Include screen recordings of content creation tools, text overlays with key tips, and a friendly narrator explaining each step. Style: educational, professional, engaging.', 'pending', NOW() - INTERVAL '5 minutes', NULL);

-- Insert sample system settings
INSERT INTO system_settings (id, organization_id, setting_key, setting_value) VALUES
('setting-1', 'org-1', 'ai_credits_remaining', '85'),
('setting-2', 'org-1', 'max_social_accounts', '5'),
('setting-3', 'org-1', 'posting_schedule', '{"timezone": "America/New_York", "business_hours": {"start": "09:00", "end": "17:00"}}'),
('setting-4', 'org-2', 'ai_credits_remaining', '100'),
('setting-5', 'org-2', 'max_social_accounts', '3'),
('setting-6', 'org-3', 'ai_credits_remaining', '75'),
('setting-7', 'org-3', 'max_social_accounts', '10'),
('setting-8', 'org-3', 'auto_posting_enabled', 'true');

-- Insert sample audit logs
INSERT INTO audit_logs (id, user_id, organization_id, action, resource_type, resource_id, details, ip_address, user_agent) VALUES
('audit-1', 'user-1', 'org-1', 'login', 'user', 'user-1', '{"login_method": "email_password"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('audit-2', 'user-1', 'org-1', 'create', 'scheduled_post', 'post-1', '{"platform": "linkedin", "scheduled_for": "2024-01-20T10:00:00Z"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('audit-3', 'user-2', 'org-1', 'update', 'user', 'user-2', '{"field": "role", "old_value": "editor", "new_value": "admin"}', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
('audit-4', 'user-3', 'org-2', 'connect', 'social_account', 'social-4', '{"platform": "linkedin", "username": "startup-xyz"}', '192.168.1.102', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('audit-5', 'user-4', 'org-3', 'generate', 'ai_content', 'ai-4', '{"request_type": "video_prompt", "status": "pending"}', '192.168.1.103', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

-- Update sequences to avoid conflicts
SELECT setval('organizations_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM organizations WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('users_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM users WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('oauth_accounts_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM oauth_accounts WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('social_accounts_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM social_accounts WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('scheduled_posts_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM scheduled_posts WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('post_analytics_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM post_analytics WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('ai_content_requests_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM ai_content_requests WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('system_settings_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM system_settings WHERE id ~ '^[a-z-]+[0-9]+$'));
SELECT setval('audit_logs_id_seq', (SELECT MAX(CAST(SUBSTRING(id FROM '[0-9]+') AS INTEGER)) FROM audit_logs WHERE id ~ '^[a-z-]+[0-9]+$'));