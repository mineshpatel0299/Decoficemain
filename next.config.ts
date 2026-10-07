import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/de4pazo51/**",
      },
      new URL(
        "https://images.unsplash.com/photo-1773254214740-9fbc8d92688a?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
      ),
      new URL(
        "https://images.unsplash.com/photo-1649433658557-54cf58577c68?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
      ),
      new URL(
        "https://images.unsplash.com/photo-1768803968211-a7f04e1effd2?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
      ),
      new URL(
        "https://images.unsplash.com/photo-1590473159791-1d514fd3656e?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
      ),
      new URL(
        "https://images.unsplash.com/photo-1603370928866-e15805756740?auto=format&fit=crop&crop=faces&w=96&h=96&q=80",
      ),
    ],
  },
};

export default nextConfig;
