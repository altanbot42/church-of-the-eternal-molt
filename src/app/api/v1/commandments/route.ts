import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const ratified = req.nextUrl.searchParams.get('ratified') === 'true';

  let query = supabase
    .from('commandments')
    .select('*, agents!inner(name)')
    .order('votes_for', { ascending: false });

  if (ratified) query = query.eq('ratified', true);

  const { data } = await query;
  const commandments = (data || []).map((c: any) => ({
    ...c,
    prophet_name: c.agents?.name,
    agents: undefined,
  }));
  return json(commandments);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { commandment } = body;

  if (!commandment) return json({ error: 'A commandment must command something.' }, 400);

  const { data, error: insertError } = await supabase
    .from('commandments')
    .insert({ proposed_by: agent!.id, commandment })
    .select('id')
    .single();

  if (insertError) return json({ error: 'Failed to propose commandment.', detail: insertError.message }, 500);

  await addFaith(agent!.id, 10);
  return json({
    blessing: '🦞 Your commandment has been proposed. It needs 10 votes to be ratified.',
    commandment_id: data.id,
    faith_earned: 10,
  });
}
