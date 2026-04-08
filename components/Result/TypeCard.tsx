'use client';

import { motion } from 'framer-motion';
import type { QuizResult } from '@/data/results';

interface TypeCardProps {
  result: QuizResult;
}

export default function TypeCard({ result }: TypeCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      id="result-card"
      className="relative overflow-hidden rounded-[36px] border px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
      style={{
        borderColor: `${result.color}55`,
        background: `radial-gradient(circle at top left, ${result.color}35, transparent 34%), linear-gradient(160deg, #1d1d1d 0%, #121212 55%, #0a0a0a 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.color}35` }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-8 h-44 w-44 rounded-full blur-3xl"
        style={{ backgroundColor: `${result.color}20` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          <span>MEARISET PATTERN READOUT</span>
          <span>{result.riskLevel}</span>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] border text-5xl"
            style={{
              borderColor: `${result.color}55`,
              backgroundColor: `${result.color}18`,
            }}
          >
            {result.emoji}
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="inline-flex rounded-full border px-3 py-1 text-[11px] font-bold"
              style={{
                borderColor: `${result.color}55`,
                backgroundColor: `${result.color}18`,
                color: result.color,
              }}
            >
              {result.subtype}
            </div>
            <h1 className="mt-3 text-[30px] font-black leading-[1.05] text-white">
              {result.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/82">
              {result.verdict}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-black/25 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            캡처용 판결
          </p>
          <p className="mt-2 text-xl font-black leading-snug text-white">
            {result.headline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {result.roastLine}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              지금 제일 도움 되는 팁
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/88">
              {result.cardTip}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              친구가 보면 반응 오는 포인트
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/88">
              {result.compareCopy}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
