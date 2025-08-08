import pool from '@/lib/db';
// get all creatoers
// export async function GET() {
//   try {
//     const { rows } = await pool.query('SELECT * FROM creators LIMIT 20');
//     return new Response(JSON.stringify(rows), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: 'Failed to fetch creators' }), {
//       status: 500,
//     });
//   }
// }

//get all filtered creators 
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const niche = url.searchParams.get('niche');

    // Pagination params with defaults
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM creators';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];
    const conditions: string[] = [];

    if (niche) {
      params.push(niche);
      conditions.push(`niches @> ARRAY[$${params.length}]::text[]`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // Add pagination
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const { rows } = await pool.query(query, params);

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
