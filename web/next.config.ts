import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
