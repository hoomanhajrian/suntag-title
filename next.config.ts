import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
