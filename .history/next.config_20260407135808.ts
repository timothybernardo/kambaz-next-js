import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "destination: "https://kambaz-node-server-app-quiz-84j4.onrender.com/api/:path*",
      },
    ];
  },
};
export default nextConfig;