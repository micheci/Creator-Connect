"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Filters from "../components/filters";

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
    name: string;
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
        const res = await fetch(
          `/api/startups/by-email?email=${session.user.email}`
        );
        if (res.ok) {
          const data = await res.json();
          setStartupInfo({
            name: data.name,
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
    !startupInfo.name ||
    !startupInfo.description ||
    startupInfo.show_matches === false
  ) {
    return (
      <main className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Complete Your Startup Profile
        </h1>
        <Filters
          niche={niche}
          setNiche={setNiche}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          platform={platform}
          setPlatform={setPlatform}
        />
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
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Creators</h1>

      {/* Filters */}
      <Filters
        niche={niche}
        setNiche={setNiche}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        platform={platform}
        setPlatform={setPlatform}
      />

      {/* Creator Cards */}
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
                <button className="mt-3 bg-green-600 text-white px-4 py-1 rounded">
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
