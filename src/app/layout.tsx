"use client";
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function Protected({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // public pages
  const publicPages = ["/", "/login", "/signup"];

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
      <body className={poppins.className}>
        <SessionProvider>
          <Protected>{children}</Protected>
        </SessionProvider>
      </body>
    </html>
  );
}
