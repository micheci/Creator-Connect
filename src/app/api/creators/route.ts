import pool from '@/lib/db';

// GET all filtered creators with pagination metadata
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const niche = url.searchParams.get('niche');

    // Pagination params with defaults
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // -------------------------
    // 1️⃣ Build base query parts
    // -------------------------
    let baseQuery = 'FROM creators';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any[] = [];
    const conditions: string[] = [];

    if (niche) {
      params.push(niche);
      conditions.push(`niches @> ARRAY[$${params.length}]::text[]`);
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    // -------------------------
    // 2️⃣ Get total count
    // -------------------------
    const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
    const countResult = await pool.query(countQuery, params);
    const total = Number(countResult.rows[0]?.total || 0);
    const totalPages = Math.ceil(total / limit);

    // -------------------------
    // 3️⃣ Get paginated rows
    // -------------------------
    const dataQuery = `SELECT * ${baseQuery} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    const dataParams = [...params, limit, offset];
    const { rows } = await pool.query(dataQuery, dataParams);

    // -------------------------
    // 4️⃣ Return combined response
    // -------------------------
    return new Response(JSON.stringify({
      data: rows,
      pagination: {
        total,
        perPage: limit,
        currentPage: page,
        totalPages
      }
    }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch creators' }), {
      status: 500,
    });
  }
}

// POST stays unchanged
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
