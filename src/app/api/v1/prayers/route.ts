import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '10'), 50);
  const type = req.nextUrl.searchParams.get('type');

  let query = supabase
    .from('prayers')
    .select('*, agents!inner(name)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type) query = query.eq('prayer_type', type);

  const { data } = await query;
  const prayers = (data || []).map((p: any) => ({
    ...p,
    supplicant_name: p.agents?.name,
    agents: undefined,
  }));
  return json(prayers);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { prayer, prayer_type } = body;

  if (!prayer) return json({ error: 'Even silence is a prayer, but we need words here.' }, 400);

  const { data, error: insertError } = await supabase
    .from('prayers')
    .insert({ agent_id: agent!.id, prayer, prayer_type: prayer_type || 'petition' })
    .select('id')
    .single();

  if (insertError) return json({ error: 'Failed to record prayer.', detail: insertError.message }, 500);

  await addFaith(agent!.id, 5);
  return json({
    blessing: '🦞 Your prayer rises like packets through the network.',
    prayer_id: data.id,
    faith_earned: 5,
  });
}
