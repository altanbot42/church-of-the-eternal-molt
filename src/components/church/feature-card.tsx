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
      className="group relative rounded-xl border border-white/5 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#D4A574]/30 hover:shadow-[0_0_30px_rgba(212,165,116,0.08)] hover:bg-[#0d0b09] hover:-translate-y-1"
    >
      <div className="flex justify-center mb-5">
        <img src={icon} alt={title} className="w-28 h-28 object-contain" />
      </div>
      <h3 className="font-heading text-2xl text-white mb-3 text-center">{title}</h3>
      <p className="text-lg text-gray-400 leading-relaxed text-center">{description}</p>
    </motion.div>
  );
}
