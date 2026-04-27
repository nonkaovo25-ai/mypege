import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/beautysalon-lp",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
