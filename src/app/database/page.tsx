"use client";

import { useEffect, useState, useRef } from "react";
import Filters from "../components/filters";
import { useSession } from "next-auth/react";
import Nav from "../components/nav";
import Link from "next/link";
import { Creator } from "@/types/creatorTypes";

function NicheTags({ niches }: { niches: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="flex gap-2 overflow-x-auto whitespace-nowrap cursor-grab select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {niches.map((n, i) => (
        <span
          key={i}
          className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs whitespace-nowrap shrink-0"
        >
          {n}
        </span>
      ))}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}

export default function DatabasePage() {
  const { data: session } = useSession();

  const [creators, setCreators] = useState<Creator[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 0,
  });

  const [niche, setNiche] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [platform, setPlatform] = useState("");
  const [savedMatches, setSavedMatches] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    let url = `/api/creators?limit=${limit}&page=${page}`;
    if (niche) url += `&niche=${encodeURIComponent(niche)}`;
    // Add other filters here if your API supports (stateFilter, platform)

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setCreators(resData.data);
        setPagination(resData.pagination);
      });
  }, [niche, page]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/matches")
        .then((res) => res.json())
        .then((data) => setSavedMatches(data.map((c: Creator) => c.id)));
    }
  }, [session]);

  return (
    <main className="max-w-7xl mx-auto">
      <Nav current="database" />
      <h1 className="text-3xl font-bold mb-4">Browse Creators</h1>
      <Filters
        niche={niche}
        setNiche={(val) => {
          setPage(1); // reset page when filter changes
          setNiche(val);
        }}
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
              <th className="p-3 font-medium">Followers</th>
              <th className="p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((c) => (
              <tr key={c.id} className="border-b ">
                <td className="p-3 whitespace-nowrap">{c.name}</td>
                <td className="p-3 max-w-[200px] align-top">
                  <NicheTags niches={c.niches.map((n) => n.trim())} />
                </td>
                <td className="p-3 whitespace-nowrap">
                  {c.followers.toLocaleString()}
                </td>
                <td className="p-3 whitespace-nowrap flex gap-2">
                  <a
                    href={c.tiktok_url || `https://www.tiktok.com/@${c.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700">
                      Message on TikTok
                    </button>
                  </a>
                  {c.email && (
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination info + controls */}
      <div className="flex justify-between items-center mt-4 px-4 text-sm text-gray-700">
        <span>
          Showing {(pagination.currentPage - 1) * pagination.perPage + 1}–
          {Math.min(
            pagination.currentPage * pagination.perPage,
            pagination.total
          )}{" "}
          of {pagination.total} creators
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page >= pagination.totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
