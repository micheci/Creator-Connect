"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google"; // ✅ import Google Font

// Configure the font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply font globally via className */}
      <body className={poppins.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
