/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Add empty turbopack config
  turbopack: {},
  
  // Environment variables available on the client
  env: {
    APP_NAME: 'FDA Ghana FIRMS',
    APP_VERSION: '1.0.0',
  },
  
  // Image domains (if using external images)
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig