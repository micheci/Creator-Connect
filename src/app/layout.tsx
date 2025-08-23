"use client";
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { Poppins, Playfair_Display, Montaga } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

const montaga = Montaga({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-montaga",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

function Protected({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // public pages
  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/creators",
    "/creators/signup",
    "/creators/login",
  ];

  useEffect(() => {
    if (!publicPages.includes(pathname) && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, pathname, router]);

  if (!publicPages.includes(pathname) && (status === "loading" || !session))
    return <p>Loading...</p>;

  return <>{children}</>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montaga.className} ${playfair.variable}`}>
        {" "}
        <SessionProvider>
          <Protected>{children}</Protected>
        </SessionProvider>
      </body>
    </html>
  );
}
