import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import pool from "@/lib/db"; 

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // 1. Get the logged-in startup
    const startupRes = await pool.query(
      `SELECT * FROM startups WHERE email = $1`,
      [session.user.email]
    );

    if (startupRes.rows.length === 0) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    const startup = startupRes.rows[0];
    const keywordArray: string[] = startup.target_keywords || [];
    const nicheArray: string[] = startup.target_niches || [];

    // 2. Match creators based on niche or keyword in bio
   const creatorsRes = await pool.query(
  `
  SELECT * FROM creators
 WHERE niches && $1::text[]
    OR (
      ${keywordArray.map((_, i) => `LOWER(bio) LIKE $${i + 2}`).join(" OR ")}
    )
  LIMIT 20
  `,
  [nicheArray, ...keywordArray.map((k) => `%${k.toLowerCase()}%`)]
);


    return NextResponse.json(creatorsRes.rows);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
