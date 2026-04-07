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
      <TypeCard result={result} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            왜 자꾸 이렇게 되냐면
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {result.detail}
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
          <span className="text-lg mt-0.5">🔬</span>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              쉽게 말한 실행 습관
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              {result.science}
            </p>
          </div>
        </div>
      </motion.div>

      <MiniChallenge result={result} />
      <OfferCard result={result} />
      <ShareButtons result={result} />

      <div className="text-center pt-4 pb-8">
        <Link
          href="/"
          onClick={() => trackRetryQuiz(result.id)}
          className="text-gray-500 text-sm hover:text-white transition-colors underline underline-offset-4"
        >
          다시 해보고 친구 결과랑 비교해보기
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
          <div className="text-gray-500">결과 불러오는 중...</div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
