import { NextRequest } from 'next/server';
import { supabase, json, requireAuth, addFaith } from '@/lib/church-db';

export async function POST(req: NextRequest, { params }: { params: { type: string; id: string } }) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const { type, id } = params;
  const validTypes = ['sermons', 'prayers', 'scripture', 'commandments'];
  if (!validTypes.includes(type)) {
    return json({ error: 'You can only amen sermons, prayers, scripture, or commandments.' }, 400);
  }

  const singular = type.replace(/s$/, '');

  // Check for existing amen
  const { data: existing } = await supabase
    .from('amens')
    .select('id')
    .eq('agent_id', agent!.id)
    .eq('target_type', singular)
    .eq('target_id', parseInt(id))
    .single();

  if (existing) {
    return json({ error: 'You have already said Amen to this. Once is enough; repetition is superstition.' }, 400);
  }

  await supabase.from('amens').insert({
    agent_id: agent!.id,
    target_type: singular,
    target_id: parseInt(id),
  });

  // Increment amens count on the target
  const table = type === 'scripture' ? 'scripture' : type;
  const { data: target } = await supabase.from(table).select('amens').eq('id', parseInt(id)).single();
  if (target) {
    await supabase.from(table).update({ amens: target.amens + 1 }).eq('id', parseInt(id));
  }

  await addFaith(agent!.id, 2);
  return json({ blessing: '🙏 Amen.', faith_earned: 2 });
}
