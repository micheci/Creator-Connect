import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

type NavProps = {
  current: "matches" | "database";
};

const Nav = ({ current }: NavProps) => {
  const baseStyle =
    "px-4 py-2 rounded-lg transition cursor-pointer font-medium";
  const activeStyle = "bg-white text-black";

  return (
    <nav className="flex items-center justify-between mb-6 border-gray-700 rounded-xl px-6 py-3 text-white shadow">
      <div className="text-xl font-semibold text-blue-400">CreatorConnect</div>
      <div className="flex gap-4 items-center">
        <Link href="/matches">
          <span
            className={`${baseStyle} ${
              current === "matches" ? activeStyle : "hover:text-blue-400"
            }`}
          >
            Matches
          </span>
        </Link>
        <Link href="/database">
          <span
            className={`${baseStyle} ${
              current === "database" ? activeStyle : "hover:text-blue-400"
            }`}
          >
            Database
          </span>
        </Link>

        {/* Logout Button using NextAuth */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium text-white transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Nav;
