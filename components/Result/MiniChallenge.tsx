'use client';

import { motion } from 'framer-motion';
import { ResultType } from '@/data/results';

interface MiniChallengeProps {
  result: ResultType;
}

export default function MiniChallenge({ result }: MiniChallengeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-gray-700 bg-gray-800/30 p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎯</span>
        <h3 className="text-white font-bold text-sm">오늘 바로 해볼 1칸 액션</h3>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">{result.challenge}</p>
    </motion.div>
  );
}
