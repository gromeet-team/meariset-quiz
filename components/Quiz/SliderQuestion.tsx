'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSliderScore } from '@/lib/scoring';

interface SliderQuestionProps {
  onAnswer: (score: number) => void;
}

export default function SliderQuestion({ onAnswer }: SliderQuestionProps) {
  const [value, setValue] = useState(50);
  const [confirmed, setConfirmed] = useState(false);

  const getColor = () => {
    if (value <= 25) return '#FF4444';
    if (value <= 50) return '#FF8C00';
    if (value <= 75) return '#FFD700';
    return '#44CC44';
  };

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    onAnswer(getSliderScore(value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <h2 className="text-xl font-bold text-white text-center leading-relaxed">
        지금 당신의 의지력을<br />게이지로 표현하면?
      </h2>

      <div className="space-y-6 px-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>🥀 바닥</span>
          <span>💪 충만</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${getColor()} ${value}%, #374151 ${value}%)`,
            }}
          />
        </div>

        <div className="text-center">
          <span
            className="text-5xl font-bold tabular-nums"
            style={{ color: getColor() }}
          >
            {value}
          </span>
          <span className="text-gray-500 text-lg ml-1">/ 100</span>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={confirmed}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
      >
        확인
      </button>
    </motion.div>
  );
}
