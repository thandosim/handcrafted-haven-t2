import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicitly set project root to handcrafted-haven-t2
  outputFileTracingRoot: path.join(__dirname),

  // Remove turbopack if you're having issues with it
  // experimental: {
  //   turbo: {
  //     rules: {}
  //   }
  // },

  typescript: {
    // Ignore build errors during development, but check in production
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  eslint: {
    // Ignore ESLint during builds if needed
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
};

export default nextConfig;
