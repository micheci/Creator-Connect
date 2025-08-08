"use client";
import React, { useRef, useState } from "react";
type FiltersProps = {
  niche: string;
  setNiche: (value: string) => void;
  stateFilter: string;
  setStateFilter: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
};

const NICHE_MAP: Record<string, string> = {
  ai: "🤖 AI",
  productivity: "⚡️ Productivity",
  fitness: "💪 Fitness",
  tech: "💻 Tech",
  content_creation: "🎥 Content Creation",
  nutrition: "🥗 Nutrition",
  marketing: "📣 Marketing",
  crypto: "₿ Crypto",
  relationships: "♥️ Relationships",
  law: "⚖️ Law",
  finance: "📊 Finance",
  ecom: "🛍️ Ecom",
  travel: "✈️ Travel",
  developer: "👨‍💻 Developer",
  lifestyle: "⭐️ Lifestyle",
  corporate: "🏢 Corporate",
  career: "💼 Career",
  business: "🤝 Business",
  trading: "📈 Trading",
  gaming: "👾 Gaming",
  parenting: "🍼 Parenting",
  astrology: "♊️ Astrology",
  home: "🏡 Home",
  christian: "✝️ Christian",
  language: "🗣️ Language",
  books: "📚 Books",
  beauty: "💄 Beauty",
  design: "🎨 Design",
  real_estate: "🏠 Real Estate",
  editing: "🎬 Editing",
  fashion: "👗 Fashion",
  music: "🎵 Music",
  self_growth: "🌱 Self Growth",
};

const niches = Object.keys(NICHE_MAP); // This is ['ai', 'productivity', 'fitness', ...]

// const states = ["TX", "CA", "NY", "FL", "IL", "GA", "WA", "CO", "AZ", "NC"];
// const platforms = ["TikTok", "YouTube", "Instagram", "Facebook"];

const Filters = ({
  niche,
  setNiche,
  stateFilter,
  setStateFilter,
  platform,
  setPlatform,
}: FiltersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div>
      {" "}
      <section className="mb-4 mx-2 sm:mx-4">
        <h2 className="font-semibold">Filter by Niche</h2>
        <div
          ref={scrollRef}
          className="flex gap-2 mt-2 overflow-x-auto whitespace-nowrap  cursor-grab select-none"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {niches.map((key) => (
            <button
              key={key}
              onClick={() => setNiche(niche === key ? "" : key)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                niche === key ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {NICHE_MAP[key]}
            </button>
          ))}
        </div>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* hide scrollbar for Chrome, Safari, Opera */
          }
          div:active {
            cursor: grabbing;
          }
        `}</style>
      </section>
      {/* State filter */}
      {/* <section className="mb-4 mx-2 sm:mx-4">
        <h2 className="font-semibold">Filter by State</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {states.map((s) => (
            <button
              key={s}
              onClick={() => setStateFilter(stateFilter === s ? "" : s)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                stateFilter === s
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section> */}
      {/* platform filter */}
      {/* <section className="mb-4 mx-2 sm:mx-4">
        <h2 className="font-semibold">Filter by Platform</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(platform === p ? "" : p)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                platform === p ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Filters;
