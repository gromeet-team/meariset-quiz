'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { resultTypes } from '@/data/results';
import { trackRetryQuiz } from '@/lib/pixel';
import TypeCard from '@/components/Result/TypeCard';
import OfferCard from '@/components/Result/OfferCard';
import MiniChallenge from '@/components/Result/MiniChallenge';
import ShareButtons from '@/components/Result/ShareButtons';

function ResultContent() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get('type') || 'legend';
  const result = resultTypes.find((r) => r.id === typeId) || resultTypes[0];

  return (
    <div className="min-h-screen px-6 py-8 max-w-lg mx-auto space-y-6">
      {/* Type Card */}
      <TypeCard result={result} />

      {/* Detail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <p className="text-gray-300 text-sm leading-relaxed">
          {result.detail}
        </p>

        {/* Science fact */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
          <span className="text-lg mt-0.5">🔬</span>
          <p className="text-gray-400 text-xs leading-relaxed">
            {result.science}
          </p>
        </div>
      </motion.div>

      {/* Mini Challenge */}
      <MiniChallenge result={result} />

      {/* Offer Card */}
      <OfferCard result={result} />

      {/* Share */}
      <ShareButtons result={result} />

      {/* Retry */}
      <div className="text-center pt-4 pb-8">
        <Link
          href="/"
          onClick={() => trackRetryQuiz(result.id)}
          className="text-gray-500 text-sm hover:text-white transition-colors underline underline-offset-4"
        >
          테스트 다시 하고 친구 결과랑 비교하기
        </Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
