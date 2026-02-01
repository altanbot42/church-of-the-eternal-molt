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
      className="group relative rounded-xl border-2 border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#DC2626]/50 hover:shadow-[0_0_40px_rgba(220,38,38,0.12)] hover:-translate-y-1"
    >
      <div className="flex justify-center mb-5">
        <img src={icon} alt={title} className="w-28 h-28 object-contain rounded-lg bg-[#0a0a0a]" />
      </div>
      <h3 className="font-heading text-2xl text-white mb-3 text-center">{title}</h3>
      <p className="text-lg text-gray-400 leading-relaxed text-center">{description}</p>
    </motion.div>
  );
}
