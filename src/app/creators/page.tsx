"use client";

import { useEffect, useState } from "react";

type Creator = {
  id: string;
  name: string;
  platform: string;
  niche: string;
  location: string;
  followers: number;
  profile_pic: string;
};

export default function CreatorList() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    fetch("/api/creators")
      .then((res) => res.json())
      .then(setCreators);
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Available Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {creators.map((c) => (
          <div key={c.id} className="border rounded p-4 shadow">
            <img
              src={c.profile_pic}
              alt={c.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600">
              {c.platform} - {c.niche}
            </p>
            <p className="text-sm">{c.location}</p>
            <p className="text-sm text-gray-800">Followers: {c.followers}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
