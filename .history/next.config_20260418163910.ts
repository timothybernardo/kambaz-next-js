import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://kambaz-next-js-git-quizzes-timothybernardos-projects.vercel.app",
      },
    ];
  },
};
export default nextConfig;