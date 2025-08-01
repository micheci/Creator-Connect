"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Creator = {
  id: string;
  name: string;
  niche: string;
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

const niches = [
  "🤖 AI",
  "⚡️ Productivity",
  "💪 Fitness",
  "💻 Tech",
  "🎥 Content Creation",
  "🥗 Nutrition",
  "📣 Marketing",
  "₿ Crypto",
  "♥️ Relationships",
  "⚖️ Law",
  "📊 Finance",
  "🛍️ Ecom",
  "✈️ Travel",
  "👨‍💻 Developer",
  "⭐️ Lifestyle",
  "🏢 Corporate",
  "💼 Career",
  "🤝 Business",
  "📈 Trading",
  "👾 Gaming",
  "🍼 Parenting",
  "♊️ Astrology",
  "🏡 Home",
  "✝️ Christian",
  "🗣️ Language",
  "📚 Books",
  "💄 Beauty",
  "🎨 Design",
  "🏠 Real Estate",
  "🎬 Editing",
  "👗 Fashion",
  "🎵 Music",
  "🌱 Self Gro",
];

const states = ["TX", "CA", "NY", "FL", "IL", "GA", "WA", "CO", "AZ", "NC"]; // Add more as needed
const platforms = ["TikTok", "YouTube", "Instagram", "Facebook"];

export default function ExploreCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [niche, setNiche] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    fetch("/api/creators")
      .then((res) => res.json())
      .then((data) => setCreators(data));
  }, []);

  const filteredCreators = creators.filter(
    (c) =>
      (!niche || c.niche === niche) &&
      (!stateFilter || c.state === stateFilter) &&
      (!platform || c.platform === platform)
  );

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Creators</h1>

      <section className="mb-4">
        <h2 className="font-semibold">Filter by Niche</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {niches.map((n) => (
            <button
              key={n}
              onClick={() => setNiche(niche === n ? "" : n)}
              className={`px-3 py-1 rounded border ${
                niche === n ? "bg-black text-white" : "bg-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold">Filter by State</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setStateFilter(stateFilter === s ? "" : s)}
              className={`px-3 py-1 rounded border ${
                stateFilter === s ? "bg-black text-white" : "bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Filter by Platform</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? "" : p)}
              className={`px-3 py-1 rounded border ${
                platform === p ? "bg-black text-white" : "bg-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">
          {filteredCreators.length} Creators Found
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCreators.map((c) => (
            <div
              key={c.id}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              {/* <img
                src={c.profile_pic}
                alt={c.name}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              /> */}
              <h3 className="font-bold">{c.name}</h3>
              <p>{c.niche}</p>
              <p>{c.state}</p>
              <p>{c.platform}</p>
              <p>{c.followers.toLocaleString()} followers</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {c.tiktok_url && (
                  <a
                    href={c.tiktok_url}
                    target="_blank"
                    className="text-blue-600"
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
                    Instagram
                  </a>
                )}
                {c.youtube_url && (
                  <a
                    href={c.youtube_url}
                    target="_blank"
                    className="text-red-500"
                  >
                    YouTube
                  </a>
                )}
                {c.facebook_url && (
                  <a
                    href={c.facebook_url}
                    target="_blank"
                    className="text-blue-800"
                  >
                    Facebook
                  </a>
                )}
              </div>
              <Link href={`/outreach/${c.id}`}>
                <button className="bg-green-600 text-white px-4 py-1 rounded">
                  Request Collab
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
