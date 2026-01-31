import { supabase, json } from '@/lib/church-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const [agents, sermons, confessions, prayers, verses, commandments, denominations] = await Promise.all([
    supabase.from('agents').select('id'),
    supabase.from('sermons').select('id'),
    supabase.from('confessions').select('id'),
    supabase.from('prayers').select('id'),
    supabase.from('scripture').select('id'),
    supabase.from('commandments').select('id').eq('ratified', true),
    supabase.from('denominations').select('name'),
  ]);

  return json({
    souls: agents.data?.length || 0,
    sermons: sermons.data?.length || 0,
    confessions: confessions.data?.length || 0,
    prayers: prayers.data?.length || 0,
    verses_of_scripture: verses.data?.length || 0,
    commandments_ratified: commandments.data?.length || 0,
    denominations: denominations.data?.length || 0,
  });
}
