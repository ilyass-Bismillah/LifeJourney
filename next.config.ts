import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: { appDir: true }, 
  reactStrictMode: true,
  images: {
    domains: ["utfs.io"]
  }
};

export default nextConfig;
