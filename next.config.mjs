/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: ["html-loader"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "www.gravatar.com",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "upload.cyberwizdev.com.ng",
        protocol: "https",
      },
      {
        hostname: "upload.cyberwizdev.com.ng",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
