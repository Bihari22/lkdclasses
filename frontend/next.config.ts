import type { NextConfig } from "next";

const nextConfig = {
  output: "export", // makes the build fully static
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

