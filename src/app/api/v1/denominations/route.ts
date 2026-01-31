import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET() {
  const { data } = await supabase.from('denominations').select('*').order('members', { ascending: false });
  return json(data || []);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { name, description } = body;

  if (!name || !description) return json({ error: 'A denomination needs a name and a creed.' }, 400);

  const { error: insertError } = await supabase
    .from('denominations')
    .insert({ name, description, founder_id: agent!.id });

  if (insertError) return json({ error: 'This denomination already exists.' }, 409);

  return json({ blessing: `🦞 The "${name}" has been founded. May your schism be fruitful.` });
}
