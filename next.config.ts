import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "mxyjtergpkdjdiofnyqb.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // 必要に応じて値を変更
    },
  },
};

export default nextConfig;
