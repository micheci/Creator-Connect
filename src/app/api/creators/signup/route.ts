import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, tiktokUrl } = await req.json();

    // 1. Validate required fields
    if (!name || !email || !password || !tiktokUrl) {
      return NextResponse.json(
        { error: "Name, email, password, and TikTok URL are required" },
        { status: 400 }
      );
    }

    // 2. Check if email already exists
    const existing = await pool.query(
      "SELECT id FROM creators WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // 3. Hash the password
    const hashedPassword = await hash(password, 10);

    // 4. Extract TikTok username from URL
    // e.g., https://www.tiktok.com/@username -> username
    let tiktokUsername = "";
    try {
      const url = new URL(tiktokUrl);
      tiktokUsername = url.pathname.replace(/^\/@/, "").replace(/\/$/, "");
    } catch {
      return NextResponse.json(
        { error: "Invalid TikTok URL" },
        { status: 400 }
      );
    }

    // 5. Insert the new creator
    await pool.query(
      `INSERT INTO creators (name, email, password, tiktok_url, tiktok_username)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, hashedPassword, tiktokUrl, tiktokUsername]
    );

    // 6. Return success
    return NextResponse.json(
      { success: true, message: "Creator account created successfully" },
      { status: 201 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Creator signup error:", err.message, err.stack);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
