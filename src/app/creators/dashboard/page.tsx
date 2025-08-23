// app/creators/dashboard/page.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function CreatorDashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      {/* Hero Message */}
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">
          Welcome to Your Creator Dashboard
        </h1>
        <p className="text-gray-700 mb-6">
          Hi there! We are currently reviewing your social links and fetching
          the necessary information. Once everything is ready, we’ll send you an
          email notification.
        </p>

        {/* Optional Link back to creators landing page */}
        <Link href="/creators">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-200">
            Back to Creator Landing
          </button>
        </Link>
      </div>
    </main>
  );
}
