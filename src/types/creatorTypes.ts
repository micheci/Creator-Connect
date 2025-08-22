export type Creator = {
  id: string;
  name: string;
  username?: string;
  platform?: "tiktok" | "instagram" | "youtube" | "facebook";
  profile_pic: string;
  followers: number;
  bio?: string;
  top_video_url?: string;
  top_video_thumbnail?: string;
  top_video_likes?: number;
  top_video_views?: number;

  tiktok_username?: string;
  email: string;
  niches: string[];
  instagram_username?: string;
  youtube_username?: string;
  facebook_username?: string;
};
