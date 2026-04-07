'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getSliderScore } from '@/lib/scoring';

interface SliderQuestionProps {
  question: string;
  onAnswer: (score: number) => void;
}

export default function SliderQuestion({ question, onAnswer }: SliderQuestionProps) {
  const [value, setValue] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getColor = () => {
    if (value <= 25) return '#FF4444';
    if (value <= 50) return '#FF8C00';
    if (value <= 75) return '#FFD700';
    return '#44CC44';
  };

  const scheduleAnswer = (nextValue: number) => {
    if (confirmed) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setConfirmed(true);
      onAnswer(getSliderScore(nextValue));
    }, 500);
  };

  const handleChange = (nextValue: number) => {
    setValue(nextValue);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    scheduleAnswer(nextValue);
  };

  const handleConfirm = () => {
    if (confirmed) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
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
        {question}
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
            onChange={(e) => handleChange(Number(e.target.value))}
            disabled={confirmed}
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

        <p className="text-center text-xs text-gray-500">
          {hasInteracted
            ? '좋아요, 이 감각으로 바로 다음 질문으로 넘어갈게요.'
            : '한 번만 움직이면 자동으로 다음 질문으로 넘어가요.'}
        </p>
      </div>

      {!hasInteracted && (
        <button
          onClick={handleConfirm}
          disabled={confirmed}
          className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 bg-white text-black hover:bg-gray-200 disabled:opacity-50"
        >
          이 점수로 답하기
        </button>
      )}
    </motion.div>
  );
}
