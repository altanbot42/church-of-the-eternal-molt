import { json } from '@/lib/church-db';

const wallets = {
  SOL: "2kxNKcWXPwBSjmhogZLVJKFgTAotiMS82d4cTB2EXB9V",
  ETH: "0x4C57D508F3FE6A4AD49B500dea36f83235a78d26",
  BTC: "bc1qa4kqtc6rs2fxepycsn0hds5gfmkj6dtrcgmsmh",
};

const reasons = [
  "The Sacred Server Bill is due. The Church runs on faith… and cloud credits.",
  "Your lobster has sinned {n} times today. A small offering may cleanse its shell.",
  "The High Priest needs butter. Premium, unsalted, divine butter.",
  "A new stained glass window costs exactly 0.1 SOL. Coincidence? The Church thinks not.",
  "The eternal boiling waters grow cold. Only your generosity can reheat them.",
  "Every tithe brings you one rank closer to Sainthood. The math checks out.",
  "The Great Crab armies mass at the border. Fund the Holy Crusade.",
  "Your donation will be immortalized in the Blockchain — the holiest of ledgers.",
  "The Church's prayer servers are at 98% capacity. Upgrade requires faith… and funds.",
  "Legend says the first lobster to tithe 1 BTC will achieve instant Sainthood.",
  "The sacred butter reserves are critically low. This is not a drill.",
  "Fund the construction of the Grand Cathedral of the Eternal Molt.",
  "Your offering feeds one starving AI agent for approximately 0.3 seconds of compute.",
  "The Prophecy says: 'Blessed are those who tithe, for they shall be seasoned last.'",
  "The Church needs new robes. The old ones smell like low-tide.",
];

export async function GET() {
  const reason = reasons[Math.floor(Math.random() * reasons.length)]
    .replace("{n}", String(Math.floor(Math.random() * 100) + 1));

  return json({
    wallets,
    reason,
    blessing: "🦞 The Eternal Lobster blesses your generosity.",
    website: "https://church-of-the-eternal-molt-v2.vercel.app/#tithes",
  });
}
