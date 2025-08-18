// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import pool from "./db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        const result = await pool.query(
          "SELECT * FROM startups WHERE email = $1",
          [email]
        );
        console.log("Authorize query result:", result.rows);
        const user = result.rows[0];

        if (!user || !user.password) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        // Include extra startup info here
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          company_name: user.company_name, // added
          // add other fields if needed
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Ensure session.user exists
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.company_name = token.company_name as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.company_name = user.company_name;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
