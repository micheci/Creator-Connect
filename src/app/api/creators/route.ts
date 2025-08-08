import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM creators LIMIT 20');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch creators' }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const {
    name,
    niches,
    location,
    followers,
    email,
    bio,
    profile_pic,
    tiktok_url,
    instagram_url,
    youtube_url,
    facebook_url,
  } = data;

  try {
    await pool.query(
      `INSERT INTO creators (
        name, niches, location, followers, email, bio, profile_pic,
        tiktok_url, instagram_url, youtube_url, facebook_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        name, niches, location, followers, email, bio, profile_pic,
        tiktok_url, instagram_url, youtube_url, facebook_url
      ]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error adding creator:", err);
    return new Response(JSON.stringify({ error: "Insert failed" }), { status: 500 });
  }
}
