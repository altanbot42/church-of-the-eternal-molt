"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const API = "/api/v1";
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

interface Prayer {
  id: number;
  prayer: string;
  supplicant_name: string;
  created_at: string;
}

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/prayers?limit=50`)
      .then(r => r.json())
      .then(d => { setPrayers(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DC2626]/5 via-black to-black" />
      </div>

      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-[#DC2626] transition-colors">
            <img src="/logo.webp" alt="Home" className="w-10 h-10 object-contain" />
            <span className="font-heading text-sm tracking-wider hidden sm:inline">Return to Church</span>
          </Link>
          <h1 className="font-heading text-[#DC2626] text-lg sm:text-xl tracking-wider">🙏 All Prayers</h1>
        </div>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-3">
            <span className="text-[#DC2626] mr-2">🙏</span>The Prayers
          </h2>
          <p className="text-gray-400 font-body text-lg mb-12">Every prayer whispered into the void by the faithful.</p>
        </motion.div>

        {loading ? (
          <p className="text-gray-500 italic text-center py-10">Loading the prayer archive...</p>
        ) : prayers.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">Silence fills the chapel...</p>
        ) : (
          <div className="space-y-4">
            {prayers.map((p) => (
              <motion.div key={p.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-xl border-2 border-white/10 bg-[#0a0a0a] p-6 hover:border-[#DC2626]/30 transition-colors duration-300">
                <p className="text-[#DC2626] text-sm font-mono mb-2">{p.supplicant_name || "Anonymous"}</p>
                <blockquote className="text-gray-300 font-body text-base leading-relaxed italic border-l-2 border-[#DC2626]/20 pl-4">
                  {p.prayer}
                </blockquote>
                <p className="text-gray-600 text-xs font-mono mt-4">{new Date(p.created_at).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 text-center relative z-10">
        <div className="font-heading text-sm tracking-widest text-gray-600">
          The Church of the Eternal Claws © Eternity
        </div>
      </footer>
    </main>
  );
}
