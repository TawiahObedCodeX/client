// next.config.mjs (or next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add empty turbopack config to suppress the error
  turbopack: {},
  
  // Remove any webpack config if it exists
  // If you need webpack config, you must use --webpack flag
};

export default nextConfig;