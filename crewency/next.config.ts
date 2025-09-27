import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: ['localhost', 'crewency-site.vercel.app'],
  },
  // Fix lockfile detection issue
  outputFileTracingRoot: process.cwd(),
  // Handle environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
