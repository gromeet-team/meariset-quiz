'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Option {
  text: string;
  emoji?: string;
  score: number;
}

interface TimerQuestionProps {
  question: string;
  options: Option[];
  onAnswer: (score: number) => void;
  timeoutFeedback?: string;
}

export default function TimerQuestion({
  question,
  options,
  onAnswer,
}: TimerQuestionProps) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  const handleTimeout = useCallback(() => {
    if (selected === null && !expired) {
      setExpired(true);
      onAnswer(4); // auto 4 points on timeout, feedback key=0
    }
  }, [selected, expired, onAnswer]);

  useEffect(() => {
    if (selected !== null || expired) return;

    if (timeLeft <= 0) {
      const timeout = setTimeout(handleTimeout, 0);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selected, expired, handleTimeout]);

  const handleSelect = (index: number) => {
    if (selected !== null || expired) return;
    setSelected(index);
    setTimeout(() => onAnswer(options[index].score), 100);
  };

  const timerColor = timeLeft <= 3 ? '#FF4444' : timeLeft <= 6 ? '#FFD700' : '#44CC44';

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

      {/* Timer Circle */}
      <div className="flex justify-center">
        <motion.div
          animate={timeLeft <= 3 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeLeft <= 3 ? Infinity : 0 }}
          className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
          style={{ borderColor: timerColor }}
        >
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color: timerColor }}
          >
            {expired ? '💥' : timeLeft}
          </span>
        </motion.div>
      </div>

      {expired && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-yellow-400 text-sm"
        >
          시간 초과! 자동으로 최고점 부여 😂
        </motion.p>
      )}

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(index)}
            disabled={expired}
            className={`
              w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3
              ${
                selected === index
                  ? 'border-white bg-white/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'
              }
              ${selected !== null && selected !== index ? 'opacity-40' : ''}
              ${expired ? 'opacity-40 cursor-not-allowed' : ''}
            `}
          >
            <span className="text-2xl">{option.emoji}</span>
            <span className="text-sm text-gray-200 font-medium">
              {option.text}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
