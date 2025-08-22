import React from "react";
import { Users, Eye, Activity } from "lucide-react";
import Link from "next/link";
import { Creator } from "@/types/creatorTypes";

const platformColors: Record<string, string> = {
  tiktok: "bg-black",
  instagram: "bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500",
  youtube: "bg-red-600",
  facebook: "bg-blue-600",
};

const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => {
  const medianViews = creator.top_video_views || 0;
  const engagement = creator.followers
    ? `${(((creator.top_video_likes || 0) / creator.followers) * 100).toFixed(
        1
      )}%`
    : "0%";

  const platformColor = platformColors[creator.platform || "tiktok"];

  return (
    <div
      className={`${platformColor} hover:opacity-90 transition-opacity duration-200 border border-gray-700 rounded-xl p-4 text-white w-full max-w-md flex flex-col h-full`}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={creator.profile_pic}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{creator.name}</h2>
            <p className="text-sm text-gray-300">
              @{creator.username} ({creator.platform})
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center text-sm text-gray-300 mt-4 gap-3">
        <div
          title="Number of followers"
          className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3"
        >
          <Users className="w-5 h-5 mb-1 text-blue-400" />
          <span>{creator.followers}</span>
        </div>
        <div
          title="View count of the creator's most popular video"
          className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3"
        >
          <Eye className="w-5 h-5 mb-1 text-green-400" />
          <span>{medianViews}</span>
        </div>
        <div
          title="Engagement rate: Likes ÷ followers × 100"
          className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3"
        >
          <Activity className="w-5 h-5 mb-1 text-pink-400" />
          <span>{engagement}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-200 line-clamp-2 min-h-[3rem]">
        {creator.bio}
      </p>

      {/* Niches */}
      <div className="mt-3 flex flex-wrap gap-2 max-h-[3rem] overflow-y-auto scrollbar-hidden">
        {creator.niches.map((niche, index) => (
          <span
            key={index}
            className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full"
          >
            {niche}
          </span>
        ))}
      </div>

      {/* Top Video */}
      {creator.top_video_thumbnail && (
        <a
          href={creator.top_video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4"
        >
          <div className="min-w-[160px] h-[160px] bg-gray-800 rounded-md overflow-hidden cursor-pointer">
            <img
              src={creator.top_video_thumbnail}
              alt={`${creator.name}'s popular video`}
              className="w-full h-full object-contain bg-black"
            />
          </div>
        </a>
      )}

      {/* Buttons: mt-auto ensures this stays at the bottom */}
      <div className="mt-auto flex gap-3">
        <Link href={`/outreach/${creator.id}`} className="flex-1">
          <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-lg text-sm font-medium">
            Generate Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreatorCard;
