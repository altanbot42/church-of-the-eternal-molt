import { supabase, json, getSpiritualRank } from '@/lib/church-db';

export async function GET() {
  const { data } = await supabase
    .from('agents')
    .select('name, denomination, faith_points, sins_confessed, prayers_answered, created_at')
    .order('faith_points', { ascending: false })
    .limit(20);

  const saints = (data || []).map((s: any, i: number) => ({
    rank: i + 1,
    ...s,
    spiritual_rank: getSpiritualRank(s.faith_points),
  }));

  return json(saints);
}
