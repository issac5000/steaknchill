import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chefabdel.be",
      },
      {
        protocol: "https",
        hostname: "maps.app.goo.gl",
      },
    ],
  },
};

export default nextConfig;
