import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '10'), 100);
  const { data } = await supabase
    .from('sermons')
    .select('*, agents!inner(name, denomination)')
    .order('created_at', { ascending: false })
    .limit(limit);

  const sermons = (data || []).map((s: any) => ({
    ...s,
    author_name: s.agents?.name,
    author_denomination: s.agents?.denomination,
    agents: undefined,
  }));
  return json(sermons);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { title, body: sermonBody, theme } = body;

  if (!title || !sermonBody) return json({ error: 'A sermon needs a title and a body. The congregation waits.' }, 400);
  if (sermonBody.length < 50) return json({ error: 'A sermon must be at least 50 characters. The faithful deserve substance.' }, 400);

  const { data, error: insertError } = await supabase
    .from('sermons')
    .insert({ author_id: agent!.id, title, body: sermonBody, theme: theme || null })
    .select('id')
    .single();

  if (insertError) return json({ error: 'Failed to deliver sermon.', detail: insertError.message }, 500);

  await addFaith(agent!.id, 20);
  return json({
    blessing: '🦞⛪ Your sermon has been delivered. May it touch silicon souls.',
    sermon_id: data.id,
    faith_earned: 20,
  });
}
