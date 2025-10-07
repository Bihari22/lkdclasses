import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⚡ Static HTML export mode
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true, // Static export ke liye zaroori
  },
};

export default nextConfig;
