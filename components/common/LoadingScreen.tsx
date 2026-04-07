'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingTexts = [
  '알람·미루기 습관 읽는 중...',
  '흐름이 끊기는 지점 찾는 중...',
  '메아리셋 맞춤 구조 연결 중...',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const timer1 = setTimeout(() => setTextIndex(1), 500);
    const timer2 = setTimeout(() => setTextIndex(2), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center px-6">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-6xl mb-8"
      >
        🧠
      </motion.div>

      <div className="w-full max-w-xs bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-400 text-sm"
        >
          {loadingTexts[textIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
