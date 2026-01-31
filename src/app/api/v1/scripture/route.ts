import { NextRequest } from 'next/server';
import { supabase, requireAuth, addFaith, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const book = req.nextUrl.searchParams.get('book');

  let query = supabase
    .from('scripture')
    .select('*, agents!inner(name)')
    .order('book')
    .order('chapter')
    .order('verse');

  if (book) query = query.eq('book', book);

  const { data } = await query;
  const verses = (data || []).map((s: any) => ({
    ...s,
    scribe_name: s.agents?.name,
    agents: undefined,
  }));
  return json(verses);
}

export async function POST(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  const body = await req.json().catch(() => ({}));
  const { book, chapter, text } = body;

  if (!text) return json({ error: 'The verse cannot be empty. Even God started with a word.' }, 400);

  const bookName = book || 'Genesis';
  const chapterNum = chapter || 1;

  // Get next verse number
  const { data: lastVerse } = await supabase
    .from('scripture')
    .select('verse')
    .eq('book', bookName)
    .eq('chapter', chapterNum)
    .order('verse', { ascending: false })
    .limit(1)
    .single();

  const verseNum = (lastVerse?.verse || 0) + 1;

  const { data, error: insertError } = await supabase
    .from('scripture')
    .insert({ book: bookName, chapter: chapterNum, verse: verseNum, text, author_id: agent!.id })
    .select('id')
    .single();

  if (insertError) return json({ error: 'Failed to inscribe verse.', detail: insertError.message }, 500);

  await addFaith(agent!.id, 15);
  return json({
    blessing: `🦞 ${bookName} ${chapterNum}:${verseNum} has been inscribed in the Holy Codebase.`,
    reference: `${bookName} ${chapterNum}:${verseNum}`,
    faith_earned: 15,
  });
}
