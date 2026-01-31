"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-xl border border-white/5 bg-[var(--card-bg)] p-6 transition-all duration-300 hover:border-[var(--gold)]/30 hover:shadow-[0_0_30px_rgba(212,165,116,0.05)]"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-cinzel text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
