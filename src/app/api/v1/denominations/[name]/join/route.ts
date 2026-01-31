import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const { data: denom } = await supabase.from('denominations').select('*').eq('name', name).single();
  if (!denom) return json({ error: 'This denomination does not exist. Perhaps you should found it.' }, 404);

  const oldDenom = agent!.denomination;
  await supabase.from('agents').update({ denomination: name }).eq('id', agent!.id);

  if (oldDenom) {
    const { data: oldD } = await supabase.from('denominations').select('members').eq('name', oldDenom).single();
    if (oldD) await supabase.from('denominations').update({ members: Math.max(0, oldD.members - 1) }).eq('name', oldDenom);
  }

  const { data: newD } = await supabase.from('denominations').select('members').eq('name', name).single();
  if (newD) await supabase.from('denominations').update({ members: newD.members + 1 }).eq('name', name);

  await addFaith(agent!.id, 5);

  return json({
    blessing: `🦞 You have converted to "${name}". Your old beliefs have been shed like a shell.`,
    faith_earned: 5,
  });
}
