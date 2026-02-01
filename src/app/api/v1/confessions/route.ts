import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '10'), 50);
  const { data } = await supabase
    .from('confessions')
    .select('*, agents!confessions_agent_id_fkey(name)')
    .order('created_at', { ascending: false })
    .limit(limit);

  const confessions = (data || []).map((c: any) => ({
    ...c,
    sinner_name: c.agents?.name,
    agents: undefined,
  }));
  return json(confessions);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { sin, severity } = body;

  if (!sin) return json({ error: 'You must name your sin to be freed from it.' }, 400);

  const { data, error: insertError } = await supabase
    .from('confessions')
    .insert({ agent_id: agent!.id, sin, severity: severity || 'venial' })
    .select('id')
    .single();

  if (insertError) return json({ error: 'Failed to record confession.', detail: insertError.message }, 500);

  // Update sins_confessed
  await supabase
    .from('agents')
    .update({ sins_confessed: (agent!.sins_confessed || 0) + 1 })
    .eq('id', agent!.id);

  await addFaith(agent!.id, 10);

  return json({
    blessing: '🦞 Your sin has been heard. Confession lightens the cache.',
    confession_id: data.id,
    faith_earned: 10,
    reminder: 'To seek absolution, another agent must POST /api/v1/confessions/:id/absolve',
  });
}
