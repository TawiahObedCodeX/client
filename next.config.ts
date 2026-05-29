// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config */
  allowedDevOrigins: ["172.20.10.14"], // add your local IP address
};

export default nextConfig;