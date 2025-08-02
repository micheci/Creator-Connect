import pool from "@/lib/db";

export async function PUT(req: Request) {
  const { email, product_url, description, target_keywords, target_niches } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
  }

  try {
    await pool.query(
      `
      UPDATE startups
      SET 
        product_url = $1,
        description = $2,
        target_keywords = $3,
        target_niches = $4,
        show_matches = true
      WHERE email = $5
      `,
      [product_url, description, target_keywords, target_niches, email]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}
