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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await pool.query(
          "SELECT * FROM startups WHERE email = $1",
          [email]
        );
        const user = result.rows[0];

        if (!user || !user.password) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
