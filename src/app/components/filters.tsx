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
          {niches.map((n) => (
            <button
              key={n}
              onClick={() => setNiche(niche === n ? "" : n)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap shrink-0 ${
                niche === n ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {n}
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
      <section className="mb-4 mx-2 sm:mx-4">
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
      </section>
      {/* platform filter */}
      <section className="mb-4 mx-2 sm:mx-4">
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
      </section>
    </div>
  );
};

export default Filters;
