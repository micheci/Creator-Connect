// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    company_name?: string; // optional for creators
  }

  interface Session {
    user: User;
  }
}
