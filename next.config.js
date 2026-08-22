/** @type {import('next').NextConfig} */
const nextConfig = {
  // Posts are read from `content/` at request time, so the directory has to be
  // traced into the serverless bundle.
  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*"],
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
