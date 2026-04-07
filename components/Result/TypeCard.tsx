'use client';

import { motion } from 'framer-motion';
import { ResultType } from '@/data/results';

interface TypeCardProps {
  result: ResultType;
}

export default function TypeCard({ result }: TypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="result-card"
      className="rounded-3xl p-8 text-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${result.color}15, ${result.color}05)`,
        border: `2px solid ${result.color}30`,
      }}
    >
      <div className="text-6xl mb-4">{result.emoji}</div>

      <div
        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
        style={{ backgroundColor: `${result.color}20`, color: result.color }}
      >
        {result.level}
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{result.name}</h2>
      <p className="text-gray-300 text-sm leading-relaxed">{result.description}</p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          왜 메아리셋이 잘 맞냐면
        </p>
        <p className="mt-2 text-sm leading-relaxed text-gray-200">
          {result.bridge}
        </p>
      </div>
    </motion.div>
  );
}
