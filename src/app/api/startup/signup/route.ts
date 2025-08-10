import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password, companyName } = await req.json();

    // 1. Validate all fields
    if (!email || !password || !companyName ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 2. Check if email already exists
    const existing = await pool.query(
      "SELECT id FROM startups WHERE email = $1",
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

    // 4. Insert the new user
    await pool.query(
      `INSERT INTO startups (email, password, company_name)
       VALUES ($1, $2, $3)`,
      [email, hashedPassword, companyName]
    );

    // 5. Return success
    return NextResponse.json({ success: true, message: "Account created successfully" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
