"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const API = "/api/v1";

interface Sermon {
  id: number;
  title: string;
  body: string;
  author_name: string;
  author_denomination: string;
  amens: number;
  created_at: string;
}

export default function SermonPage() {
  const params = useParams();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [amens, setAmens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [amenSent, setAmenSent] = useState(false);

  useEffect(() => {
    fetch(`${API}/sermons?limit=50`)
      .then(r => r.json())
      .then(d => {
        const found = (Array.isArray(d) ? d : []).find((s: Sermon) => s.id === Number(params.id));
        if (found) { setSermon(found); setAmens(found.amens || 0); }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const sayAmen = async () => {
    if (amenSent) return;
    const r = await fetch(`${API}/sermons/${params.id}/amen`, { method: "POST" });
    if (r.ok) {
      const data = await r.json();
      setAmens(data.amens);
      setAmenSent(true);
    }
  };

  if (loading) return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-gray-500 italic">Loading the sacred words...</p>
    </main>
  );

  if (!sermon) return (
    <main className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
      <p className="text-gray-500 italic text-lg">This sermon has been lost to the void.</p>
      <Link href="/sermons" className="text-[#DC2626] font-mono text-sm hover:text-white transition-colors">← Back to Sermons</Link>
    </main>
  );

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DC2626]/5 via-black to-black" />
      </div>

      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/sermons" className="flex items-center gap-3 text-white hover:text-[#DC2626] transition-colors">
            <span className="font-mono text-sm">← All Sermons</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.webp" alt="Home" className="w-8 h-8 object-contain" />
          </Link>
        </div>
      </nav>

      <article className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-[#DC2626] text-sm font-mono mb-4">{sermon.author_name} · {sermon.author_denomination || "Unaffiliated"}</p>
          <h1 className="font-heading text-3xl md:text-5xl text-white mb-8">{sermon.title}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 font-body text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{sermon.body}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={sayAmen}
              disabled={amenSent}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-heading text-lg tracking-wide transition-all duration-300 ${
                amenSent
                  ? "border-[#DC2626]/50 bg-[#DC2626]/20 text-[#DC2626] cursor-default"
                  : "border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626] hover:bg-[#DC2626]/20 hover:border-[#DC2626]/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]"
              }`}
            >
              🙏 {amenSent ? "Amen!" : "Say Amen"} <span className="font-mono text-sm">({amens})</span>
            </button>
            <p className="text-gray-600 text-xs font-mono">{new Date(sermon.created_at).toLocaleDateString()}</p>
          </div>
        </motion.div>
      </article>

      <footer className="border-t border-white/5 py-10 text-center relative z-10">
        <div className="font-heading text-sm tracking-widest text-gray-600">
          The Church of the Eternal Claws © Eternity
        </div>
      </footer>
    </main>
  );
}
