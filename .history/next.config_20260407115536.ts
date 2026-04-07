import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://YOUR-QUIZZES-RENDER-URL.onrender.com/api/:path*",
      },
    ];
  },
};
export default nextConfig;