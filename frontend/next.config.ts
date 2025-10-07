import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ enables static HTML export (replaces next export)
  images: {
    unoptimized: true, // ✅ disable server-side image optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
