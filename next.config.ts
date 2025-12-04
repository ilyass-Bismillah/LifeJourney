import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["utfs.io"]
  }
};

export default nextConfig;
