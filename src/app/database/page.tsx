"use client";

import { useEffect, useState } from "react";
import Filters from "../components/filters";
import { useSession } from "next-auth/react";
import Nav from "../components/nav";
import Link from "next/link";

type Creator = {
  id: string;
  name: string;
  niche: string; // comma-separated or array, depending on your data
  state: string;
  platform: string;
  followers: number;
  email: string;
  bio: string;
  profile_pic: string;
  tiktok_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;
};

export default function DatabasePage() {
  const { data: session } = useSession();

  const [creators, setCreators] = useState<Creator[]>([]);
  const [niche, setNiche] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [platform, setPlatform] = useState("");
  const [savedMatches, setSavedMatches] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/creators")
      .then((res) => res.json())
      .then((data) => setCreators(data));

    if (session?.user?.email) {
      fetch("/api/matches")
        .then((res) => res.json())
        .then((data) => setSavedMatches(data.map((c: Creator) => c.id)));
    }
  }, [session]);

  const filteredCreators = creators.filter(
    (c) =>
      (!niche || c.niche.includes(niche)) &&
      (!stateFilter || c.state === stateFilter) &&
      (!platform || c.platform === platform)
  );

  const handleSaveMatch = async (creatorId: string) => {
    if (!session?.user?.email) return alert("Please log in.");
    const res = await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creatorId }),
    });
    if (res.ok) setSavedMatches((prev) => [...prev, creatorId]);
    else alert("Failed to save.");
  };

  return (
    <main className="max-w-7xl mx-auto">
      <Nav current="database" />{" "}
      <h1 className="text-3xl font-bold mb-4">Browse Creators</h1>
      <Filters
        niche={niche}
        setNiche={setNiche}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        platform={platform}
        setPlatform={setPlatform}
      />
      <div className="overflow-x-auto mt-6 px-2 sm:px-4">
        <table className="min-w-full border divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-left">
            <tr>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Niches</th>
              <th className="p-3 font-medium">State</th>
              <th className="p-3 font-medium">Platform</th>
              <th className="p-3 font-medium">Followers</th>
              <th className="p-3 font-medium">Links</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCreators.map((c) => (
              <tr key={c.id} className="border-b ">
                <td className="p-3 whitespace-nowrap">{c.name}</td>

                {/* Niche scrollable horizontally */}
                <td className="p-3 max-w-[200px] align-top">
                  <div
                    className="flex overflow-x-auto gap-2 scrollbar-thin whitespace-nowrap"
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    {c.niche
                      .split(",")
                      .map((n) => n.trim())
                      .map((n, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs whitespace-nowrap shrink-0"
                        >
                          {n}
                        </span>
                      ))}
                  </div>
                </td>

                <td className="p-3 whitespace-nowrap">{c.state}</td>
                <td className="p-3 whitespace-nowrap">{c.platform}</td>
                <td className="p-3 whitespace-nowrap">
                  {c.followers.toLocaleString()}
                </td>

                {/* Links */}
                <td className="p-3 whitespace-nowrap">
                  <div className="flex space-x-2 text-xs">
                    {c.tiktok_url && (
                      <a
                        href={c.tiktok_url}
                        target="_blank"
                        className="text-blue-500"
                      >
                        TikTok
                      </a>
                    )}
                    {c.instagram_url && (
                      <a
                        href={c.instagram_url}
                        target="_blank"
                        className="text-pink-500"
                      >
                        IG
                      </a>
                    )}
                    {c.youtube_url && (
                      <a
                        href={c.youtube_url}
                        target="_blank"
                        className="text-red-500"
                      >
                        YT
                      </a>
                    )}
                    {c.facebook_url && (
                      <a
                        href={c.facebook_url}
                        target="_blank"
                        className="text-blue-800"
                      >
                        FB
                      </a>
                    )}
                  </div>
                </td>

                {/* Save Button */}
                <td className="p-3 whitespace-nowrap ">
                  {/* <button
                    onClick={() => handleSaveMatch(c.id)}
                    disabled={savedMatches.includes(c.id)}
                    className={`px-3 py-1 rounded text-white ${
                      savedMatches.includes(c.id)
                        ? "bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {savedMatches.includes(c.id) ? "Saved" : "Save"}
                  </button> */}
                  {/* Email Buton */}
                  <Link href={`/outreach/${c.id}`}>
                    <button
                      className={`px-3 py-1 rounded text-white ${
                        savedMatches.includes(c.id)
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Email
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
