'use client';

import { motion } from 'framer-motion';
import type { QuizResult } from '@/data/results';
import { trackOfferClick } from '@/lib/pixel';

interface OfferCardProps {
  result: QuizResult;
}

export default function OfferCard({ result }: OfferCardProps) {
  const handleClick = () => {
    trackOfferClick();
    window.open(result.offerLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.38 }}
      className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
        메아리셋이 실제로 도움 되는 이유
      </p>
      <h3 className="mt-2 text-xl font-black text-white">
        {result.offerTitle}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">
        {result.offerFit}
      </p>

      <div className="mt-4 rounded-[24px] border border-white/10 bg-black/20 p-4">
        <p className="text-sm leading-relaxed text-white/88">
          {result.bestEnvironment}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-white/45">
          메아리셋은 다짐을 세게 만드는 도구보다, 다시 붙기 쉬운 하루 구조를 만드는 쪽에 가깝습니다.
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-white/45">현재 추천 구성</p>
          <p className="mt-1 text-2xl font-black" style={{ color: result.color }}>
            {result.offerPrice}
          </p>
        </div>

        <button
          onClick={handleClick}
          className="rounded-[22px] px-5 py-4 text-sm font-black text-black transition-transform active:scale-[0.98]"
          style={{ backgroundColor: result.color }}
        >
          {result.ctaLabel}
        </button>
      </div>
    </motion.section>
  );
}
