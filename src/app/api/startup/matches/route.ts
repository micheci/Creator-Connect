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

    // 2. Match creators, excluding those this startup already emailed
    const creatorsRes = await pool.query(
      `
      SELECT c.*
      FROM creators c
      LEFT JOIN outreach_requests o
        ON c.id = o.creator_id
        AND o.startup_email = $1
      WHERE (c.niches && $2::text[]
             OR (${keywordArray.map((_, i) => `LOWER(c.bio) LIKE $${i + 3}`).join(" OR ")}))
        AND o.id IS NULL
      LIMIT 20
      `,
      [startup.email, nicheArray, ...keywordArray.map((k) => `%${k.toLowerCase()}%`)]
    );

    return NextResponse.json(creatorsRes.rows);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
