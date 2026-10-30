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
      // One host for every page: www is a duplicate of the apex and redirects to it.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.neuvault.app" }],
        destination: "https://neuvault.app/:path*",
        permanent: true,
      },
      { source: "/features", destination: "/#features", permanent: true },
      { source: "/product", destination: "/#features", permanent: true },
      { source: "/product/:feature", destination: "/#features", permanent: true },
      { source: "/press", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
