"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Instantly Match With Your{" "}
          <span className="text-blue-600">Ideal Creators</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          It&apos;s{" "}
          <span className="text-blue-600 font-medium">super easy</span> and{" "}
          <span className="text-blue-600 font-medium">fun</span> — discover{" "}
          <span className="text-blue-600 font-medium">niche creators</span> and
          let our <span className="text-blue-600 font-medium">AI</span> handle
          the outreach for you.
        </p>
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl transition duration-200">
            Find Creators
          </button>
        </Link>
      </div>
    </main>
  );
}
