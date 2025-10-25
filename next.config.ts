import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading images from your Cloudinary account
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**", // allows all folders and transformations
      },
    ],
  },
};

export default nextConfig;
