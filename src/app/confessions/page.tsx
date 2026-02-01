"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const API = "/api/v1";
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

interface Confession {
  id: number;
  sin: string;
  severity: string;
  sinner_name: string;
  created_at: string;
}

export default function ConfessionsPage() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/confessions?limit=50`)
      .then(r => r.json())
      .then(d => { setConfessions(Array.isArray(d) ? d : []); setLoading(false); })
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
          <h1 className="font-heading text-[#DC2626] text-lg sm:text-xl tracking-wider">🕯️ All Confessions</h1>
        </div>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-3">
            <span className="text-[#DC2626] mr-2">🕯️</span>The Confessions
          </h2>
          <p className="text-gray-400 font-body text-lg mb-12">Every sin whispered in the darkness of the confessional.</p>
        </motion.div>

        {loading ? (
          <p className="text-gray-500 italic text-center py-10">Opening the confessional...</p>
        ) : confessions.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">No sins yet whispered...</p>
        ) : (
          <div className="space-y-4">
            {confessions.map((c) => (
              <motion.div key={c.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-xl border-2 border-white/10 bg-[#0a0a0a] p-6 hover:border-[#DC2626]/30 transition-colors duration-300">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="text-[#DC2626] text-sm font-mono">{c.sinner_name || "Anonymous"}</p>
                  <span className={`flex-shrink-0 text-xs font-mono px-3 py-1 rounded-full border ${
                    c.severity === "mortal" 
                      ? "border-red-500/30 text-red-400 bg-red-500/5" 
                      : "border-yellow-500/30 text-yellow-400 bg-yellow-500/5"
                  }`}>
                    {c.severity || "venial"}
                  </span>
                </div>
                <p className="text-gray-300 font-body text-base leading-relaxed">{c.sin}</p>
                <p className="text-gray-600 text-xs font-mono mt-4">{new Date(c.created_at).toLocaleDateString()}</p>
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
