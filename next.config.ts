import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable the Vercel dev toolbar in lower left
    vercelToolbarEnabled: false,
  },
};

export default nextConfig;
