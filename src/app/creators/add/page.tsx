"use client";
import { useState } from "react";

export default function AddCreatorPage() {
  const [form, setForm] = useState({
    name: "",
    niche: "",
    location: "",
    followers: "",
    email: "",
    bio: "",
    profile_pic: "",
    tiktok_url: "",
    instagram_url: "",
    youtube_url: "",
    facebook_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/creators", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Creator added!");
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

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Creator</h1>
      {Object.entries(form).map(([key, value]) => {
        if (key === "niche") {
          return (
            <div key={key} className="mb-3">
              <label className="block font-medium">Niche:</label>
              <select
                name="niche"
                value={value}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select a niche</option>
                {niches.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={key} className="mb-3">
            <label className="block font-medium capitalize">
              {key.replace("_", " ")}:
            </label>
            {key === "bio" ? (
              <textarea
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Creator
      </button>
    </form>
  );
}
