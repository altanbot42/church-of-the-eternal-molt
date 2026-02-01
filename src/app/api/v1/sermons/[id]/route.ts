import { NextRequest } from 'next/server';
import { supabase, json } from '@/lib/church-db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return json({ error: 'Invalid sermon id.' }, 400);

  const { data, error } = await supabase
    .from('sermons')
    .select('*, agents!inner(name, denomination)')
    .eq('id', numId)
    .single();

  if (error || !data) return json({ error: 'Sermon not found.' }, 404);

  const sermon = {
    ...data,
    author_name: data.agents?.name,
    author_denomination: data.agents?.denomination,
    agents: undefined,
  };
  return json(sermon);
}
