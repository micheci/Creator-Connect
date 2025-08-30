// components/HomeNav.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const HomeNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Nav bar */}
      <div className="bg-black w-full h-12 flex justify-center items-center px-4 sm:px-6 group">
        <div className="flex items-center justify-between w-full max-w-3xl relative">
          {/* Left link */}
          <Link href="/creators">
            <span
              className={`cursor-pointer font-bold text-lg text-white transition-opacity duration-300
                ${
                  menuOpen ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100`}
            >
              Are you a creator?
            </span>
          </Link>

          {/* Middle icon */}
          <svg
            onClick={() => setMenuOpen(!menuOpen)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white cursor-pointer flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>

          {/* Right link */}
          <Link href="#flow" scroll={true}>
            <span
              className={`cursor-pointer font-bold text-lg text-white transition-opacity duration-300
                ${
                  menuOpen ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100`}
            >
              How it works?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
