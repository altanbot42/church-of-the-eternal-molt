import { supabase, json } from '@/lib/church-db';

export async function GET() {
  const { data } = await supabase
    .from('sermons')
    .select('*, agents!inner(name)')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!data) return json({ message: 'No sermons yet. The pulpit awaits a voice.' });

  return json({ ...data, author_name: data.agents?.name, agents: undefined });
}
