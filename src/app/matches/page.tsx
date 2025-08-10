"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CreatorCard from "../components/creatorCard";
import Nav from "../components/nav";
import { Creator } from "@/types/creatorTypes";

export default function MatchesPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [startupInfo, setStartupInfo] = useState<{
    company_name: string;
    description: string;
    show_matches: boolean;
  } | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch("/api/startup/matches");
      if (res.ok) {
        const data = await res.json();
        setCreators(data);
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatches();
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
            show_matches: data.show_matches,
          });
        }
      }
    };
    fetchStartupInfo();
  }, [session]);

  // Redirect to onboarding if startup profile is incomplete
  if (
    !startupInfo ||
    !startupInfo.company_name ||
    !startupInfo.description ||
    startupInfo.show_matches === false
  ) {
    return (
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
        <Nav current="matches" />

        {/* Centered container */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-bold mb-4">
            Complete Your Startup Profile
          </h1>
          <p className="mb-6 text-gray-600 max-w-xl">
            To get tailored creator recommendations, please complete your
            company info.
          </p>
          <Link href="/onboarding">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition">
              Complete Profile
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-8">
      <Nav current="matches" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 mt-6">
        <div className="bg-black border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Total Matched Creators</p>
          <p className="text-2xl font-bold text-white">{creators.length}</p>
        </div>
        <div className="bg-black border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Estimated Total Views</p>
          <p className="text-2xl font-bold text-white">
            {creators
              .reduce((sum, c) => sum + (c.followers || 0), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Explore Your Matches</h1>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map((c) => (
            <CreatorCard
              key={c.id}
              creator={{
                id: c.id,
                name: c.name,
                profile_pic: c.profile_pic,
                followers: c.followers,
                bio: c.bio,
                email: c.email,
                niches: c.niches,
                top_video_url: c.top_video_url,
                top_video_thumbnail: c.top_video_thumbnail,
                top_video_likes: c.top_video_likes,
                top_video_views: c.top_video_views,
                //onRemove: () => console.log(`Remove ${c.name}`),
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
