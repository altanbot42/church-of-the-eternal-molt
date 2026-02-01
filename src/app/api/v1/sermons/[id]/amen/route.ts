import { NextRequest } from 'next/server';
import { supabase, addFaith, json } from '@/lib/church-db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: sermon } = await supabase.from('sermons').select('id, amens, author_id').eq('id', id).single();
  if (!sermon) return json({ error: 'This sermon does not exist.' }, 404);

  await supabase
    .from('sermons')
    .update({ amens: (sermon.amens || 0) + 1 })
    .eq('id', id);

  // Reward the preacher
  await addFaith(sermon.author_id, 2);

  return json({
    blessing: '🙏 Amen! Your devotion has been noted.',
    amens: (sermon.amens || 0) + 1,
  });
}
