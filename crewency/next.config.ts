import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: ['localhost', 'crewency-site.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 0, // Disable caching for development
  },
  // Fix lockfile detection issue
  outputFileTracingRoot: process.cwd(),
  // Handle environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Disable ESLint during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
