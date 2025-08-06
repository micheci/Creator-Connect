"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Filters from "../components/filters";
import CreatorCard from "../components/creatorCard";
import Nav from "../components/nav";

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

export default function MatchesPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [niche, setNiche] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [platform, setPlatform] = useState("");

  const [startupInfo, setStartupInfo] = useState<{
    company_name: string;
    description: string;
    show_matches: boolean;
  } | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/creators")
      .then((res) => res.json())
      .then((data) => setCreators(data));
  }, []);

  useEffect(() => {
    const fetchStartupInfo = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/startup`);
        if (res.ok) {
          const data = await res.json();
          setStartupInfo({
            company_name: data.company_name,
            description: data.description,
            show_matches: data.show_matches, // <-- include this
          });
        }
      }
    };
    fetchStartupInfo();
  }, [session]);

  const filteredCreators = creators.filter(
    (c) =>
      (!niche || c.niche === niche) &&
      (!stateFilter || c.state === stateFilter) &&
      (!platform || c.platform === platform)
  );

  if (
    !startupInfo ||
    !startupInfo.company_name ||
    !startupInfo.description ||
    startupInfo.show_matches === false
  ) {
    return (
      <main className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Complete Your Startup Profile
        </h1>
        {/* Add a top menu so they can click on dashbaord */}
        <p className="mb-6">
          To get tailored creator recommendations, please complete your company
          info.
        </p>
        <Link href="/onboarding">
          <button className="bg-black text-white px-6 py-2 rounded">
            Complete Profile
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8  ">
      <Nav current="matches" /> {/* Boxes to show total creators/totalviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-black border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Total Matched Creators</p>
          <p className="text-2xl font-bold text-white">
            {filteredCreators.length}
          </p>
        </div>
        <div className="bg-black border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Estimated Total Views</p>
          <p className="text-2xl font-bold text-white">
            {filteredCreators
              .reduce((sum, c) => sum + 25000, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-6">Explore Creators</h1>
      {/* Add a top menu so they can click on dashbaord */}
      {/* Creator Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCreators.map((c) => (
            <CreatorCard
              key={c.id}
              creator={{
                id: c.id,
                name: c.name,
                profilePic: c.profile_pic,
                followers: c.followers,
                medianViews: 25000,
                engagement: "3.2%",
                bio: c.bio,
                niches: ["test", "test2"],
                videos: [
                  "https://via.placeholder.com/100x160?text=Video+1",
                  "https://via.placeholder.com/100x160?text=Video+2",
                  "https://via.placeholder.com/100x160?text=Video+3",
                ],
                onRemove: () => console.log(`Remove ${c.name}`),
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
