import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db"; // <-- Import your PG pool

const handler = NextAuth({
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

        try {
          // Query the startups table
          const result = await pool.query(
            "SELECT * FROM startups WHERE email = $1",
            [email]
          );
          const user = result.rows[0];

          if (!user || !user.password) return null;

          const isValid = await compare(password, user.password);
          if (!isValid) return null;

          // This is the data available in `useSession()`
          return { id: user.id, email: user.email };
        } catch (err) {
          console.error("Login error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
