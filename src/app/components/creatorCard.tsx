import React from "react";
import { Users, Eye, Activity } from "lucide-react";
import Link from "next/link";
import { Creator } from "@/types/creatorTypes";

const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => {
  const medianViews = creator.top_video_views || 0;
  const engagement = creator.followers
    ? `${(((creator.top_video_likes || 0) / creator.followers) * 100).toFixed(
        1
      )}%`
    : "0%";
  return (
    <div className="bg-[#1f1f1f] hover:bg-[#2a2a2a] transition-colors duration-200 border border-gray-700 rounded-xl p-4 text-white w-full max-w-md flex flex-col">
      {/* Top Row: Profile Picture, Name, X Button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={creator.profile_pic}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">{creator.name}</h2>
        </div>
        <button
          onClick={() => console.log("hi")}
          //onClick={creator.onRemove}
          className="text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between text-center text-sm text-gray-300 mt-4 gap-3">
        <div
          title="Number of TikTok followers"
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
          title="Engagement rate: Likes on most popular video ÷ followers × 100"
          className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3"
        >
          <Activity className="w-5 h-5 mb-1 text-pink-400" />
          <span>{engagement}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-300 mt-3 text-sm min-h-[2.5rem]">{creator.bio}</p>

      {/* Niches */}
      <div className="mt-3 flex flex-wrap gap-2">
        {creator.niches.map((niche, index) => (
          <span
            key={index}
            className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full"
          >
            {niche}
          </span>
        ))}
      </div>

      {/* TikTok Videos */}
      {creator.top_video_thumbnail && (
        <div className="mt-4 min-w-[160px] h-[160px] bg-gray-800 rounded-md overflow-hidden">
          <img
            src={creator.top_video_thumbnail}
            alt={`${creator.name}'s popular video`}
            className="w-full h-full object-contain bg-black"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <a
          href={creator.tiktok_url || `https://www.tiktok.com/@${creator.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <button className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-lg text-sm font-medium">
            Message on TikTok
          </button>
        </a>

        {creator.email && (
          <Link href={`/outreach/${creator.id}`} className="flex-1">
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-lg text-sm font-medium">
              Send Outreach
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreatorCard;
