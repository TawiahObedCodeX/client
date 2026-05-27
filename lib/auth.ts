// src/lib/auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // TODO: Replace with your actual authentication logic
          if (email === "admin@fda.gov.gh" && password === "password") {
            return { id: "1", name: "Admin", email, role: "ADMIN" };
          }
          if (email === "officer@fda.gov.gh" && password === "password") {
            return { id: "2", name: "Officer", email, role: "OFFICER" };
          }
          if (email === "applicant@company.com" && password === "password") {
            return { id: "3", name: "Applicant", email, role: "APPLICANT" };
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;