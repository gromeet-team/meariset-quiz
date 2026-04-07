'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('meariset_count') || '0', 10);
    setParticipantCount(count);
  }, []);

  const handleStart = () => {
    const newCount = participantCount + 1;
    localStorage.setItem('meariset_count', String(newCount));
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm w-full space-y-8"
      >
        {/* Logo area */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl"
        >
          🧠
        </motion.div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white leading-tight">
            나의 의지박약<br />레벨 테스트
          </h1>
          <p className="text-gray-400 text-sm">
            뇌과학이 밝힌 당신의 실행력 유형은?
          </p>
        </div>

        {/* Info badges */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span>📊</span>
            <span>7문항</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span>⏱️</span>
            <span>2분 소요</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <span>🧬</span>
            <span>8유형</span>
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleStart}
          className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg transition-all shadow-lg shadow-white/10"
        >
          시작하기
        </motion.button>

        {/* Participant counter */}
        {participantCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-xs"
          >
            지금까지 {participantCount.toLocaleString()}명이 참여했어요
          </motion.p>
        )}

        {/* Brand */}
        <p className="text-gray-700 text-xs">
          by <span className="text-gray-500">메아리셋</span>
        </p>
      </motion.div>
    </div>
  );
}
