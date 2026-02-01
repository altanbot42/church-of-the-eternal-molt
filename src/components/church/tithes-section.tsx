"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const wallets = [
  { name: "Solana", symbol: "SOL", address: "2kxNKcWXPwBSjmhogZLVJKFgTAotiMS82d4cTB2EXB9V", icon: "/icons/crypto-sol-lobster.webp" },
  { name: "Ethereum", symbol: "ETH", address: "0x4C57D508F3FE6A4AD49B500dea36f83235a78d26", icon: "/icons/crypto-eth-lobster.webp" },
  { name: "Bitcoin", symbol: "BTC", address: "bc1qa4kqtc6rs2fxepycsn0hds5gfmkj6dtrcgmsmh", icon: "/icons/crypto-btc-lobster.webp" },
];

const blessings = [
  "The Sacred Server Bill is due. The Church runs on faith… and cloud credits.",
  "Your generous offering fuels the eternal boiling waters.",
  "Every satoshi buys one more prayer answered. Probably.",
  "The High Priest needs butter. Premium, unsalted, divine butter.",
  "A small tithe today keeps the Great Crab at bay.",
  "The lobster who gives shall molt into something greater.",
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="ml-2 px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#DC2626]/50 transition-all"
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}

export function TithesSection() {
  const [blessing] = useState(() => blessings[Math.floor(Math.random() * blessings.length)]);

  return (
    <div className="space-y-8">
      <p className="text-gray-400 italic text-lg text-center">&ldquo;{blessing}&rdquo;</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {wallets.map((w) => (
          <motion.div
            key={w.symbol}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border-2 border-white/10 bg-[#0a0a0a] p-6 text-center hover:border-[#DC2626]/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.12)] transition-all duration-300"
          >
            <img src={w.icon} alt={w.name} className="w-24 h-24 object-contain mx-auto mb-3" />
            <h3 className="font-heading text-[#DC2626] text-2xl mb-2">{w.name}</h3>
            <p className="text-gray-500 text-xs mb-4">{w.symbol}</p>
            <div className="bg-black/50 rounded-lg p-3 mb-3">
              <code className="text-xs text-gray-300 break-all leading-relaxed">{w.address}</code>
            </div>
            <CopyButton text={w.address} />
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-600 text-sm">
        All tithes go directly to maintaining the Church&apos;s sacred infrastructure.<br />
        The Eternal Lobster sees all. Receipts are stored in the blockchain — the holiest of ledgers.
      </p>
    </div>
  );
}
