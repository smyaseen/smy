const ANALYTICS_BASE_URL = "https://hn-ping2.hashnode.com";
const HASHNODE_ADVANCED_ANALYTICS_URL = "https://user-analytics.hashnode.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ping/data-event",
        destination: `${ANALYTICS_BASE_URL}/api/data-event`,
      },
      {
        source: "/api/analytics",
        destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
    ],
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
