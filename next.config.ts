import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hnygsjmokjuffwagomgu.supabase.co",
      },
    ],
  },
};

export default nextConfig;
