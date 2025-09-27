# Deployment Guide

## Vercel Deployment Issues

If you're experiencing deployment failures on Vercel, here are the most common issues and solutions:

### 1. Environment Variables

Make sure you have set up the following environment variables in your Vercel dashboard:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `NEXTAUTH_SECRET` - A random secret key for NextAuth
- `NEXTAUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)

**Optional (for full functionality):**
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `FACEBOOK_APP_ID` - Facebook app ID
- `FACEBOOK_APP_SECRET` - Facebook app secret
- `LINKEDIN_CLIENT_ID` - LinkedIn client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn client secret
- `TWITTER_CLIENT_ID` - Twitter client ID
- `TWITTER_CLIENT_SECRET` - Twitter client secret
- `INSTAGRAM_APP_ID` - Instagram app ID
- `INSTAGRAM_APP_SECRET` - Instagram app secret

### 2. Build Configuration

The project is configured to work with Vercel out of the box. Key configurations:

- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 3. Common Issues and Solutions

#### Issue: "Missing Supabase environment variables"
**Solution**: Add the required Supabase environment variables in your Vercel dashboard.

#### Issue: Build fails with TypeScript errors
**Solution**: 
1. Run `npm run type-check` locally to identify issues
2. Make sure all imports are correct
3. Check that all required dependencies are installed

#### Issue: "Module not found" errors
**Solution**: 
1. Ensure all dependencies are listed in `package.json`
2. Run `npm install` to install dependencies
3. Check that file paths are correct

#### Issue: API routes not working
**Solution**: 
1. Make sure API routes are in the correct directory (`src/app/api/`)
2. Check that environment variables are properly set
3. Verify that the database connection is working

### 4. Database Setup

If you're using Supabase:

1. Create a new Supabase project
2. Run the SQL schema from `src/lib/database/schema.sql`
3. Get your project URL and keys from the Supabase dashboard
4. Add them to your Vercel environment variables

### 5. Testing Locally

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Run the development server
npm run dev

# Test the build
npm run build
npm run start
```

### 6. Vercel-Specific Settings

In your Vercel dashboard:

1. **Project Settings** → **Environment Variables**: Add all required variables
2. **Project Settings** → **Build & Development Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Deployments**: Check the build logs for any errors

### 7. Troubleshooting Steps

1. **Check Build Logs**: Look at the Vercel deployment logs for specific error messages
2. **Test Locally**: Make sure the app builds and runs locally
3. **Environment Variables**: Verify all required variables are set
4. **Dependencies**: Ensure all dependencies are properly installed
5. **TypeScript**: Run type checking to catch any TypeScript errors

### 8. Quick Fixes

If you're still having issues, try these quick fixes:

1. **Clear Vercel Cache**: In Vercel dashboard, go to Deployments → Redeploy
2. **Update Dependencies**: Run `npm update` and redeploy
3. **Check Node Version**: Ensure you're using Node.js 18+ (Vercel default)
4. **Simplify Configuration**: Remove any experimental features temporarily

### 9. Getting Help

If you're still experiencing issues:

1. Check the Vercel deployment logs for specific error messages
2. Test the build locally with `npm run build`
3. Verify all environment variables are set correctly
4. Check the GitHub repository for any open issues

## Alternative Deployment Options

If Vercel continues to have issues, you can also deploy to:

- **Netlify**: Similar to Vercel, good for static sites
- **AWS Amplify**: Full-stack deployment with database support
- **Railway**: Simple deployment with database included
- **DigitalOcean App Platform**: Full-stack deployment option

Each platform has its own configuration requirements, but the core Next.js app should work on any of them.
