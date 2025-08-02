"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OutreachPage() {
  const { id } = useParams();
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
      body: JSON.stringify({
        creator_id: id,
        message,
      }),
    });

    alert("Outreach sent!");
    setMessage("");
  };

  if (status === "loading") return <p>Loading session...</p>;
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
