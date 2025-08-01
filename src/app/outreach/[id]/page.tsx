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
    async function fetchCreator() {
      const res = await fetch(`/api/creators/${id}`);
      const data = await res.json();
      setCreator(data);
    }
    if (id) fetchCreator();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/outreach", {
      method: "POST",
      body: JSON.stringify({
        creator_id: id,
        message,
        // Optional: include user ID if stored in session
        // startup_id: session?.user?.id
      }),
    });

    alert("Outreach sent!");
    setMessage("");
  };

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-xl font-semibold">
          Please log in to send a message
        </h1>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!creator) return <p>Loading creator...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact {creator.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Send Request
        </button>
      </form>
    </div>
  );
}
