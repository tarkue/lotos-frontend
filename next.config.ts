import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendOrigin = process.env.BACKEND_ORIGIN;
    if (!backendOrigin) return [];

    const origin = new URL(backendOrigin).origin;
    return [
      { source: "/api/:path*", destination: `${origin}/api/:path*` },
      { source: "/uploads/:path*", destination: `${origin}/uploads/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "verybaddomain.site",
      },
    ],
  },
};

export default nextConfig;
