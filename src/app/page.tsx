"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CreatorMatch</h1>
        <p className="mb-6 text-gray-600">
          Find the perfect creators for your startup in seconds.
        </p>
        <Link href="/login">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Find creators
          </button>
        </Link>
      </div>
    </main>
  );
}
