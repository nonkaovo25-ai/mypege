import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mypege/beautysalon-lp",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
