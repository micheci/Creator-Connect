"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function OutreachPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [creator, setCreator] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const startupInfo = session?.user;
  console.log(creator, "ES");
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

  const handleGenerateMessage = async () => {
    if (!creator || !startupInfo?.company_name) {
      alert("Startup info or creator is missing");
      return;
    }
    setLoadingMessage(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator, startup: startupInfo }),
      });

      if (!res.ok) throw new Error("Failed to generate message");

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      alert("Error generating message");
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleMarkAsSent = async () => {
    if (!message.trim()) {
      alert("Please generate a message first");
      return;
    }

    setSending(true);
    try {
      await fetch("/api/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creator_id: id,
          message,
          sentAt: new Date().toISOString(),
        }),
      });

      alert("Marked as sent!");
      router.push("/matches");
    } catch (err) {
      console.error(err);
      alert("Error saving outreach");
    } finally {
      setSending(false);
    }
  };

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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
          src={creator.profile_pic}
          alt={creator.name}
          loading="lazy"
          className="w-16 h-16 rounded-full object-cover border border-gray-600"
        />

        <div>
          <p className="text-lg font-semibold">{creator.name}</p>
          <p className="text-sm text-gray-400">
            Followers: {creator.followers.toLocaleString()}
          </p>
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-300 mb-2">
        Outreach Message
      </label>
      <div className="relative">
        <textarea
          placeholder="Click 'Generate AI Message' to get started..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 p-3 pr-12 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 resize-none"
        />
        <button
          onClick={handleCopy}
          type="button"
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-1 rounded"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-400" />
          ) : (
            <ClipboardIcon className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleGenerateMessage}
          disabled={loadingMessage}
          className="bg-yellow-600 hover:bg-yellow-700 transition duration-200 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loadingMessage ? "Generating..." : "Generate AI Message"}
        </button>

        <button
          type="button"
          onClick={handleMarkAsSent}
          disabled={sending}
          className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {sending ? "Saving..." : "Mark as Sent"}
        </button>

        {/* New button: Go to Profile */}
        <a
          href={creator.tiktok_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 transition duration-200 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Go to Profile
        </a>
      </div>
    </div>
  );
}
