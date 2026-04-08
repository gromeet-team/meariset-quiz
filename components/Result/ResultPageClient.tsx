'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { QuizResult } from '@/data/results';
import { trackRetryQuiz } from '@/lib/pixel';
import TypeCard from '@/components/Result/TypeCard';
import MiniChallenge from '@/components/Result/MiniChallenge';
import OfferCard from '@/components/Result/OfferCard';
import ShareButtons from '@/components/Result/ShareButtons';

interface ResultPageClientProps {
  result: QuizResult;
}

export default function ResultPageClient({ result }: ResultPageClientProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <TypeCard result={result} />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mt-5 rounded-[30px] border border-white/10 bg-white/[0.04] p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
          개인화 요약
        </p>
        <h2 className="mt-2 text-xl font-black text-white">
          {result.utilityHeadline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/72">
          {result.summary}
        </p>

        <div className="mt-5 grid gap-3">
          {result.metrics.map((metric) => {
            const width = `${(metric.score / 4) * 100}%`;

            return (
              <div
                key={metric.key}
                className="rounded-[24px] border border-white/8 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{metric.label}</p>
                    <p className="mt-1 text-xs text-white/45">{metric.scoreText}</p>
                  </div>
                  <p className="text-sm font-black text-white">
                    {metric.score.toFixed(1)} / 4
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width,
                      background: `linear-gradient(90deg, ${result.color}, #ffffff)`,
                    }}
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/72">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      <div className="mt-5 grid gap-5">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            왜 이런 결과가 나왔냐면
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/78">
            {result.why}
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                잘 되는 환경
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/86">
                {result.bestEnvironment}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                특히 망하는 트리거
              </p>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-white/86">
                {result.triggers.map((trigger) => (
                  <p key={trigger}>• {trigger}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <MiniChallenge result={result} />
        <ShareButtons result={result} />
        <OfferCard result={result} />
      </div>

      <div className="pb-10 pt-6 text-center">
        <Link
          href="/"
          onClick={() => trackRetryQuiz(result.id)}
          className="text-sm text-white/45 underline underline-offset-4 transition-colors hover:text-white"
        >
          다시 해보고 결과 바뀌는지 보기
        </Link>
      </div>
    </div>
  );
}
