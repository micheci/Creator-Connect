"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      // Redirect creators to WIP page
      router.push("/creator/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
      <div className="w-full max-w-md bg-[#1f1f1f] shadow-2xl rounded-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
          Sign in to <span className="text-blue-500">CreatorConnect</span>
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Welcome back! Please sign in to continue as a creator.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a href="/creator/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
