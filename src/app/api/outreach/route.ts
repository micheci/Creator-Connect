import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
//import { Resend } from "resend"; // or nodemailer, etc.

//const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { creator_id, message } = await req.json();

  if (!creator_id || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  try {
    // Save to DB
    await pool.query(
      `INSERT INTO outreach_requests (creator_id, startup_email, message)
       VALUES ($1, $2, $3)`,
      [creator_id, session.user.email, message]
    );

    // Optional: fetch creator info to include in email
    // const creatorRes = await pool.query(`SELECT name, email FROM creators WHERE id = $1`, [creator_id]);
    // const creator = creatorRes.rows[0];

    // // Send email notification to YOU
    // await resend.emails.send({
    //   from: "no-reply@yourdomain.com",
    //   to: "michecimartinez@gmail.com",
    //   subject: `New outreach message for ${creator?.name || "unknown creator"}`,
    //   html: `
    //     <h3>New outreach message</h3>
    //     <p><strong>From:</strong> ${session.user.email}</p>
    //     <p><strong>To:</strong> ${creator?.name || "Unknown"} (${creator?.email || "N/A"})</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("Outreach error:", err);
    return new Response(JSON.stringify({ error: "Failed to process outreach" }), { status: 500 });
  }
}
