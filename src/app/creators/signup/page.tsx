"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatorSignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!tiktok) {
      setError("TikTok URL is required");
      return;
    }

    try {
      const res = await fetch("/api/creator/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          tiktok_url: tiktok,
          instagram_url: instagram || null,
          youtube_url: youtube || null,
          facebook_url: facebook || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      router.push("/creators/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1f1f1f] px-4">
      <div className="w-full max-w-md bg-[#1f1f1f] shadow-2xl rounded-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
          Sign Up as a Creator
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Join now and get discovered by startups looking for creators.
        </p>

        {error && <p className="mb-4 text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Social URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  TikTok URL <span className="text-yellow-400">(Required)</span>
                </label>
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Instagram URL (Coming Soon)
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  disabled
                  placeholder="Coming Soon"
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-500 rounded-md cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  YouTube URL (Coming Soon)
                </label>
                <input
                  type="text"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  disabled
                  placeholder="Coming Soon"
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-500 rounded-md cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-500">
                  Facebook URL (Coming Soon)
                </label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  disabled
                  placeholder="Coming Soon"
                  className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-gray-500 rounded-md cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition"
          >
            Sign Up as a Creator
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/creators/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
