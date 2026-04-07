'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { getButtonMashScore } from '@/lib/scoring';

interface ButtonMashQuestionProps {
  question: string;
  onAnswer: (score: number) => void;
}

export default function ButtonMashQuestion({ question, onAnswer }: ButtonMashQuestionProps) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const countRef = useRef(0);

  const handleFinish = useCallback(() => {
    setFinished(true);
    const score = getButtonMashScore(countRef.current);
    setTimeout(() => onAnswer(score), 500);
  }, [onAnswer]);

  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      const timeout = setTimeout(handleFinish, 0);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, finished, handleFinish]);

  const handlePress = () => {
    if (finished) return;
    if (!started) setStarted(true);
    countRef.current += 1;
    setCount(countRef.current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-white text-center leading-relaxed">
        {question}
      </h2>

      <p className="text-center text-gray-500 text-sm">
        {!started
          ? '누르는 순간 3초 시작. 결심 과열도 결과에 반영됩니다.'
          : finished
          ? '체크 완료!'
          : `남은 시간: ${timeLeft}초`}
      </p>

      <div className="text-center">
        <motion.span
          key={count}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-white tabular-nums"
        >
          {count}
        </motion.span>
        <p className="text-gray-500 text-sm mt-1">회</p>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileTap={!finished ? { scale: 0.9, rotate: -4 } : {}}
          animate={count > 0 && !finished ? { x: [0, 2, -2, 0] } : {}}
          onClick={handlePress}
          disabled={finished}
          className={`
            w-40 h-40 rounded-full text-2xl font-bold shadow-2xl transition-all whitespace-pre-line
            ${
              finished
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 cursor-pointer'
            }
          `}
          style={
            !finished
              ? {
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
                }
              : {}
          }
        >
          {finished ? '끝!' : '이번엔\n진짜 간다'}
        </motion.button>
      </div>
    </motion.div>
  );
}
