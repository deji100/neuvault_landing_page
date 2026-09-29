import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-files.saasbrowser.com",
      },
      {
        protocol: "https",
        hostname: "wso2.cachefly.net",
      },
    ],
  },
  // Retired pages point at their nearest home-page section so old links and indexed URLs still land.
  async redirects() {
    return [
      { source: "/features", destination: "/#features", permanent: true },
      { source: "/product", destination: "/#features", permanent: true },
      { source: "/product/:feature", destination: "/#features", permanent: true },
      { source: "/press", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
