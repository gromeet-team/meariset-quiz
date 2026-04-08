'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ResultType } from '@/data/results';
import { trackCompareClick, trackRetryQuiz } from '@/lib/pixel';
import TypeCard from '@/components/Result/TypeCard';
import OfferCard from '@/components/Result/OfferCard';
import MiniChallenge from '@/components/Result/MiniChallenge';
import ShareButtons from '@/components/Result/ShareButtons';

interface ResultPageClientProps {
  result: ResultType;
}

export default function ResultPageClient({ result }: ResultPageClientProps) {
  return (
    <div className="min-h-screen px-5 py-6 max-w-lg mx-auto space-y-5">
      <TypeCard result={result} />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
      >
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
            style={{ backgroundColor: `${result.color}22` }}
          >
            🧠
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              왜 자꾸 이렇게 되냐면
            </p>
            <p className="text-sm leading-relaxed text-gray-200">
              {result.detail}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/8 bg-black/25 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            쉽게 말한 실행 습관
          </p>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            {result.science}
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5"
      >
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            친구랑 붙여보면
          </p>
          <h3 className="text-lg font-bold text-white">
            같은 테스트인데 결이 꽤 다르게 나와요
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">
            내 결과 보내고 친구 결과 캡처 받으면 누가 더 미루는지 바로 비교됩니다.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs">
          <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3 text-gray-300">
            내 유형
            <div className="mt-1 text-sm font-semibold text-white">
              {result.name}
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-3 py-3 text-gray-400">
            친구 유형
            <div className="mt-1 text-sm font-semibold text-white">
              아직 미정
            </div>
          </div>
        </div>

        <Link
          href={`/?from=result&type=${result.id}&compare=1`}
          onClick={() => trackCompareClick(result.id)}
          className="mt-4 flex w-full items-center justify-center rounded-2xl px-4 py-4 text-base font-bold text-black transition-all active:scale-[0.98]"
          style={{ backgroundColor: '#FEE500' }}
        >
          친구랑 결과 비교 열기
        </Link>
      </motion.section>

      <MiniChallenge result={result} />
      <OfferCard result={result} />
      <ShareButtons result={result} />

      <div className="pb-8 pt-2 text-center">
        <Link
          href="/"
          onClick={() => trackRetryQuiz(result.id)}
          className="text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-white"
        >
          다시 해보고 결과 바뀌는지 보기
        </Link>
      </div>
    </div>
  );
}
