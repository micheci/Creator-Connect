import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import pool from "./db";

// Optional types for clarity
export type CreatorUser = {
  id: string;
  name: string;
  email: string;
};

export type StartupUser = {
  id: string;
  name: string;
  email: string;
  company_name: string;
};

export const authOptions: AuthOptions = {
  providers: [
    // Startup credentials
    CredentialsProvider({
      id: "startup-credentials",
      name: "Startup Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) return null;

        try {
          const result = await pool.query("SELECT * FROM startups WHERE email = $1", [email]);
          const user = result.rows[0];
          if (!user || !user.password) return null;

          const isValid = await compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            company_name: user.company_name,
          };
        } catch (err) {
          console.error("Startup authorize error:", err);
          return null;
        }
      },
    }),

    // Creator credentials
    CredentialsProvider({
      id: "creator-credentials",
      name: "Creator Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) return null;

        try {
          const result = await pool.query("SELECT * FROM creators WHERE email = $1", [email]);
          const user = result.rows[0];
          if (!user || !user.password) return null;

          const isValid = await compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            // company_name is omitted for creators
          };
        } catch (err) {
          console.error("Creator authorize error:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        if ("company_name" in token) session.user.company_name = token.company_name as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if ("company_name" in user) token.company_name = user.company_name;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
