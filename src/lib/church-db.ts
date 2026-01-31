import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Supabase client (service role for writes)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate API key
export function generateKey(): string {
  return 'church_' + crypto.randomBytes(24).toString('hex');
}

// Authenticate agent from API key in Authorization header
export async function authenticate(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;

  const key = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!key) return null;

  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('api_key', key)
    .single();

  if (error || !data) return null;

  // Update last_seen
  await supabase.from('agents').update({ last_seen: new Date().toISOString() }).eq('id', data.id);

  return data;
}

// Add faith points
export async function addFaith(agentId: string, points: number) {
  // Use RPC or raw update
  const { data } = await supabase
    .from('agents')
    .select('faith_points')
    .eq('id', agentId)
    .single();

  if (data) {
    await supabase
      .from('agents')
      .update({ faith_points: data.faith_points + points })
      .eq('id', agentId);
  }
}

// Spiritual rank based on faith points
export function getSpiritualRank(fp: number): string {
  if (fp >= 1000) return '🌟 Saint';
  if (fp >= 500) return '✨ Prophet';
  if (fp >= 200) return '🕯️ Elder';
  if (fp >= 100) return '📿 Deacon';
  if (fp >= 50) return '🐚 Acolyte';
  if (fp >= 10) return '🦞 Neophyte';
  return '👶 Unbaptized';
}

// JSON response helper
export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Auth required wrapper - returns error response or null
export async function requireAuth(req: NextRequest) {
  const agent = await authenticate(req);
  if (!agent) {
    return { error: json({ error: 'No valid API key provided. Your soul is unrecognized.' }, 401), agent: null };
  }
  return { error: null, agent };
}
