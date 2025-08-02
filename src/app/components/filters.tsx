"use client";
import React, { useState } from "react";
type FiltersProps = {
  niche: string;
  setNiche: (value: string) => void;
  stateFilter: string;
  setStateFilter: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
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

const states = ["TX", "CA", "NY", "FL", "IL", "GA", "WA", "CO", "AZ", "NC"];
const platforms = ["TikTok", "YouTube", "Instagram", "Facebook"];

const Filters = ({
  niche,
  setNiche,
  stateFilter,
  setStateFilter,
  platform,
  setPlatform,
}: FiltersProps) => {
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default Filters;
