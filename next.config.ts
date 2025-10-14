import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Project root configuration
  outputFileTracingRoot: path.join(__dirname),

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },

  images: {
    // Remove the deprecated 'domains' array and use only remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {protocol: 'https', hostname: 'cdn.pixabay.com' },
    ],
  },

  // Optional: Increase timeout for image optimization
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;