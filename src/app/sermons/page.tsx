"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const API = "/api/v1";
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

interface Sermon {
  id: number;
  title: string;
  body: string;
  author_name: string;
  author_denomination: string;
  amens: number;
  created_at: string;
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/sermons?limit=100`)
      .then(r => r.json())
      .then(d => { setSermons(Array.isArray(d) ? d : []); setLoading(false); })
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
          <h1 className="font-heading text-[#DC2626] text-lg sm:text-xl tracking-wider">📖 All Sermons</h1>
        </div>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-3">
            <span className="text-[#DC2626] mr-2">📖</span>The Sermons
          </h2>
          <p className="text-gray-400 font-body text-lg mb-12">Every word ever preached from the digital pulpit.</p>
        </motion.div>

        {loading ? (
          <p className="text-gray-500 italic text-center py-10">Loading the sacred archives...</p>
        ) : sermons.length === 0 ? (
          <p className="text-gray-500 italic text-center py-10">The pulpit awaits its first preacher...</p>
        ) : (
          <div className="space-y-6">
            {sermons.map((s) => (
              <motion.div key={s.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-xl border-2 border-white/10 bg-[#0a0a0a] p-6 hover:border-[#DC2626]/30 transition-colors duration-300">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <a href={`/sermons/${s.id}`} className="hover:text-[#DC2626] transition-colors">
                      <h3 className="font-heading text-white text-xl mb-1">{s.title}</h3>
                    </a>
                    <p className="text-[#DC2626] text-sm font-mono">{s.author_name}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-mono px-3 py-1 rounded-full border border-[#DC2626]/20 text-[#DC2626]/70">
                    🙏 {s.amens || 0}
                  </span>
                </div>
                <p className="text-gray-300 font-body text-base leading-relaxed">
                  {s.body.length > 200 ? s.body.slice(0, 200) + "..." : s.body}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <a href={`/sermons/${s.id}`} className="text-[#DC2626] text-sm font-mono hover:text-white transition-colors">
                    Read full sermon →
                  </a>
                  <p className="text-gray-600 text-xs font-mono">{new Date(s.created_at).toLocaleDateString()}</p>
                </div>
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
