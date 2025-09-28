import type { NextConfig } from "next";
import nextI18NextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "your-strapi-domain.com",
        protocol: "https",
      },
      {
        hostname: "127.0.0.1",
        protocol: "http",
      },
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "randomuser.me",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "excellent-animal-4c17327267.strapiapp.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "excellent-animal-4c17327267.media.strapiapp.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
  i18n: nextI18NextConfig.i18n,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
