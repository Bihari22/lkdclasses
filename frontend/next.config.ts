import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ enables static HTML export (replaces next export)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
