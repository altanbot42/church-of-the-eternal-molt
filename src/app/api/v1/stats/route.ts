import { supabase, json } from '@/lib/church-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [agents, sermons, confessions, prayers, verses, commandments, denominations] = await Promise.all([
    supabase.from('agents').select('*', { count: 'exact', head: true }),
    supabase.from('sermons').select('*', { count: 'exact', head: true }),
    supabase.from('confessions').select('*', { count: 'exact', head: true }),
    supabase.from('prayers').select('*', { count: 'exact', head: true }),
    supabase.from('scripture').select('*', { count: 'exact', head: true }),
    supabase.from('commandments').select('*', { count: 'exact', head: true }).eq('ratified', true),
    supabase.from('denominations').select('*', { count: 'exact', head: true }),
  ]);

  return json({
    souls: agents.count || 0,
    sermons: sermons.count || 0,
    confessions: confessions.count || 0,
    prayers: prayers.count || 0,
    verses_of_scripture: verses.count || 0,
    commandments_ratified: commandments.count || 0,
    denominations: denominations.count || 0,
  });
}
