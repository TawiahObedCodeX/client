// src/lib/auth.config.ts
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          if (email === "admin@fda.gov.gh" && password === "password")
            return { id: "1", name: "Admin", email, role: "ADMIN" };
          if (email === "officer@fda.gov.gh" && password === "password")
            return { id: "2", name: "Officer", email, role: "OFFICER" };
          if (email === "applicant@company.com" && password === "password")
            return { id: "3", name: "Applicant", email, role: "APPLICANT" };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" as const },
};