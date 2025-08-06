import React from "react";
import { Users, Eye, Activity } from "lucide-react";
import Link from "next/link";

type Creator = {
  id: string;
  name: string;
  profilePic: string;
  followers: number;
  medianViews: number;
  engagement: string;
  bio: string;
  niches: string[]; // ← new field
  videos: string[];
  onRemove: () => void;
};

const CreatorCard: React.FC<{ creator: Creator }> = ({ creator }) => {
  console.log(creator,'allo')
  return (
    <div className="bg-[#1f1f1f] hover:bg-[#2a2a2a] transition-colors duration-200 border border-gray-700 rounded-xl p-4 text-white w-full max-w-md">
      {/* Top Row: Profile Picture, Name, X Button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={creator.profilePic}
            alt={creator.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">{creator.name}</h2>
        </div>
        <button
          onClick={creator.onRemove}
          className="text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between text-center text-sm text-gray-300 mt-4 gap-3">
        <div className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
          <Users className="w-5 h-5 mb-1 text-blue-400" />
          <span>{creator.followers}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
          <Eye className="w-5 h-5 mb-1 text-green-400" />
          <span>{creator.medianViews}</span>
        </div>
        <div className="flex-1 flex flex-col items-center bg-[#1a1a1a] border border-gray-700 rounded-lg p-3">
          <Activity className="w-5 h-5 mb-1 text-pink-400" />
          <span>{creator.engagement}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-300 mt-3 text-sm">{creator.bio}</p>

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
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {creator.videos.map((video, idx) => (
          <div
            key={idx}
            className="min-w-[100px] h-[160px] bg-gray-800 rounded-md overflow-hidden"
          >
            <img
              src={video}
              alt={`Video ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <Link href={`/outreach/${creator.id}`}>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-lg text-sm font-medium">
          Send Outreach
        </button>
      </Link>
    </div>
  );
};

export default CreatorCard;
