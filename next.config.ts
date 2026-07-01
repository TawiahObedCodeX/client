// next.config.ts
import type { NextConfig } from "next";
import { networkInterfaces } from "os";

// ============================================
// HELPER: Get all local IP addresses
// This automatically detects your network IPs
// ============================================
function getLocalIPs(): string[] {
  const interfaces = networkInterfaces();
  const ips: string[] = ["localhost", "127.0.0.1"];

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (nets) {
      for (const net of nets) {
        // Skip internal and non-IPv4 addresses
        if (net.family === "IPv4" && !net.internal) {
          ips.push(net.address);
          
          // Also add wildcard for subnet
          const parts = net.address.split(".");
          if (parts.length === 4) {
            ips.push(`${parts[0]}.${parts[1]}.*.*`);
          }
        }
      }
    }
  }

  return ips;
}

const nextConfig: NextConfig = {
  // Automatically detect and allow local network IPs
  allowedDevOrigins: getLocalIPs(),
  
  // ... rest of your config
};

export default nextConfig;