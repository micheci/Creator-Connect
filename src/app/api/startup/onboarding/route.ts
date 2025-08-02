import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions); 

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const email = session.user.email;
  const { product_url, description, target_keywords, target_niches } = await req.json();

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
