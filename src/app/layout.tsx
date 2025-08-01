"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // ✅ import SessionProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider> {/* ✅ wrap here */}
      </body>
    </html>
  );
}
