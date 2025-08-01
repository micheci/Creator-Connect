import pool from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const result = await pool.query('SELECT * FROM creators WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Creator not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error('Error fetching creator:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch creator' }), { status: 500 });
  }
}
