export type Creator = {
  top_video_likes: number;
  top_video_views: number;
  top_video_thumbnail: string;
  top_video_url: string;
  id: string;
  name: string;
  niches: string[];
  state?: string;
  platform?: string;
  followers: number;
  email: string;
  bio: string;
  profile_pic: string;
  tiktok_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;

  //on_remove:any;
};