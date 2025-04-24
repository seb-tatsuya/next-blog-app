import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // 画像のホスト名（使用可能にする）
      },
    ],
  },
};

export default nextConfig;
