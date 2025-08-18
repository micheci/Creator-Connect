import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const result = await pool.query("SELECT * FROM creators WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0], { status: 200 });
}
