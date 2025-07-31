import pool from '@/lib/db';

// post new startup
export async function POST(req: Request) {
  const { name, email, description } = await req.json();

  try {
    await pool.query(
      "INSERT INTO startups (name, email, description) VALUES ($1, $2, $3)",
      [name, email, description]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB insert failed" }), {
      status: 500,
    });
  }
}
