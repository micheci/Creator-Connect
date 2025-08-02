import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import pool from '@/lib/db';

export async function POST(req: Request) {
  const { email, password, name, description } = await req.json();

  if (!email || !password || !name || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const hashed = await hash(password, 10);

    const existing = await pool.query(
      "SELECT * FROM startups WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO startups (email, password, name, description)
       VALUES ($1, $2, $3, $4)`,
      [email, hashed, name, description]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
