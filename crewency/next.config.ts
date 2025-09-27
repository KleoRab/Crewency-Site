import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: ['localhost', 'crewency-site-ca68zo6db-crewencys-projects.vercel.app'],
  },
  // Handle environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
