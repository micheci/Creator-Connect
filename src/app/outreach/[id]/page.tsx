"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OutreachPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [creator, setCreator] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchCreator() {
      const res = await fetch(`/api/creators/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCreator(data);
      }
    }
    fetchCreator();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/outreach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator_id: id,
        message,
      }),
    });

    // Optional: show quick feedback before redirecting
    alert("Outreach sent!");

    // Redirect to matches page
    router.push("/matches");
  };

  if (status === "loading")
    return <p className="text-center mt-10 text-white">Loading session...</p>;
  if (!creator)
    return <p className="text-center mt-10 text-white">Loading creator...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-[#1f1f1f] text-white p-6 rounded-xl shadow-md border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Reach Out to {creator.name}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={creator.profilePic}
          alt={creator.name}
          className="w-16 h-16 rounded-full object-cover border border-gray-600"
        />
        <div>
          <p className="text-lg font-semibold">{creator.name}</p>
          <p className="text-sm text-gray-400">
            Followers: {creator.followers.toLocaleString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">
          Your Message
        </label>
        <textarea
          placeholder="Write your outreach message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Send Outreach
        </button>
      </form>
    </div>
  );
}
