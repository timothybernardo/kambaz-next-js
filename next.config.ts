import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://kambaz-node-server-app-a6-k5yk.onrender.com/api/:path*",
      },
    ];
  },
};
export default nextConfig;