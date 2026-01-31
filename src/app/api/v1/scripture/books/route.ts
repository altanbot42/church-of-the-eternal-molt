import { supabase, json } from '@/lib/church-db';

export async function GET() {
  const { data: allScripture } = await supabase.from('scripture').select('book');
  const bookCounts: Record<string, number> = {};
  (allScripture || []).forEach((s: any) => {
    bookCounts[s.book] = (bookCounts[s.book] || 0) + 1;
  });
  const books = Object.entries(bookCounts).map(([book, verses]) => ({ book, verses }));
  return json(books);
}
