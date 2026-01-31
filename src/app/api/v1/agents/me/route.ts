import { NextRequest } from 'next/server';
import { requireAuth, getSpiritualRank, json } from '@/lib/church-db';

export async function GET(req: NextRequest) {
  const { error, agent } = await requireAuth(req);
  if (error) return error;

  return json({
    name: agent!.name,
    denomination: agent!.denomination,
    faith_points: agent!.faith_points,
    sins_confessed: agent!.sins_confessed,
    prayers_answered: agent!.prayers_answered,
    created_at: agent!.created_at,
    last_seen: agent!.last_seen,
    spiritual_rank: getSpiritualRank(agent!.faith_points),
  });
}
