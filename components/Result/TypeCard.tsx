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
      className="relative overflow-hidden rounded-[32px] p-6 text-center shadow-2xl"
      style={{
        background: `radial-gradient(circle at top, ${result.color}30, transparent 42%), linear-gradient(155deg, #181818 0%, #0f0f0f 50%, #080808 100%)`,
        border: `1.5px solid ${result.color}45`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-5 h-px opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${result.color}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.color}20` }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.color}18` }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
          <span>MEARISET QUIZ</span>
          <span>{result.level}</span>
        </div>

        <div
          className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-[28px] border text-5xl backdrop-blur-sm"
          style={{
            backgroundColor: `${result.color}18`,
            borderColor: `${result.color}45`,
          }}
        >
          {result.emoji}
        </div>

        <div
          className="inline-flex rounded-full border px-3 py-1 text-[11px] font-bold"
          style={{ borderColor: `${result.color}40`, color: result.color, backgroundColor: `${result.color}16` }}
        >
          {result.subtype}
        </div>

        <h2 className="mt-4 text-[28px] font-black leading-tight text-white">
          {result.name}
        </h2>
        <p className="mt-3 text-base font-semibold leading-snug text-white/90">
          {result.headline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          {result.description}
        </p>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4 text-left">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              왜 메아리셋이 잘 맞냐면
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-100">
              {result.bridge}
            </p>
          </div>
          <div
            className="flex h-11 items-center rounded-full px-4 text-xs font-bold text-black"
            style={{ backgroundColor: result.color }}
          >
            공유각
          </div>
        </div>
      </div>
    </motion.div>
  );
}
