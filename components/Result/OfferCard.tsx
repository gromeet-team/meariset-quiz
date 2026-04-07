'use client';

import { motion } from 'framer-motion';
import { ResultType } from '@/data/results';
import { trackOfferClick } from '@/lib/pixel';

interface OfferCardProps {
  result: ResultType;
}

export default function OfferCard({ result }: OfferCardProps) {
  const handleClick = () => {
    trackOfferClick();
    window.open(result.offerLink, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 space-y-4"
    >
      <div className="text-center">
        <p className="text-gray-400 text-xs mb-1">나에게 맞는 플래너</p>
        <h3 className="text-white text-lg font-bold">
          메아리셋 {result.offerTitle}
        </h3>
        <p className="text-2xl font-bold mt-2" style={{ color: result.color }}>
          {result.offerPrice}
        </p>
        <p className="text-yellow-400 text-xs mt-1">
          🏷️ 지금 시작하면 3,000원 할인
        </p>
      </div>

      <button
        onClick={handleClick}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
        style={{ backgroundColor: result.color, color: '#fff' }}
      >
        지금 시작하기 →
      </button>
    </motion.div>
  );
}
