// components/HomeNav.jsx
import Link from "next/link";
import React from "react";

const HomeNav = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Collapsed bar */}
      <div className="bg-black w-full h-12 hover:h-28 transition-all duration-300 overflow-hidden flex justify-center items-center group">
        {/* Content container */}
        <div className="flex items-center justify-center space-x-4 px-6 w-full">
          {/* Creator Sign Up Link */}
          <Link href="/creators">
            <span className="cursor-pointer font-bold text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Are you a creator?
            </span>
          </Link>

          {/* Middle icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white flex-shrink-0"
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

          {/* How it works - stays as it was */}
          <Link href="#flow" scroll={true}>
            <span className="cursor-pointer font-bold text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              How it works?
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
