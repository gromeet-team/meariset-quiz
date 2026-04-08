'use client';

import { motion } from 'framer-motion';
import type { QuizResult } from '@/data/results';

interface MiniChallengeProps {
  result: QuizResult;
}

export default function MiniChallenge({ result }: MiniChallengeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-2xl">🧩</div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            오늘부터 바로 쓰는 처방
          </p>
          <h3 className="mt-2 text-lg font-black text-white">
            {result.actionTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/72">
            {result.utilitySummary}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {result.actionPlan.map((step) => (
          <div
            key={step}
            className="rounded-[22px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-relaxed text-white/88"
          >
            {step}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
