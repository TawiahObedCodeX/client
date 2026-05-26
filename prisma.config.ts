// prisma.config.ts - Prisma 7 Configuration
// Working configuration for Prisma 7.8.0
// Version: 2026.1.0

import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://fda_app_user:FDAApp2026Secure!@localhost:5432/fda_ghana_2026?schema=public',
  },
})