// app/api/startup/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import pool from "@/lib/db"; // Your PostgreSQL pool

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await pool.query(
      "SELECT company_name, description, show_matches FROM startups WHERE email = $1",
      [session.user.email]
    );

    const startup = result.rows[0];

    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    return NextResponse.json(startup, { status: 200 });
  } catch (err) {
    console.error("Error fetching startup info:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
