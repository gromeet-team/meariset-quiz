'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface HomeClientProps {
  isCompareMode: boolean;
}

export default function HomeClient({ isCompareMode }: HomeClientProps) {
  const router = useRouter();

  const handleStart = () => {
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
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl"
        >
          🧠
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white leading-tight">
            {isCompareMode ? '친구랑 붙는' : '내 의지박약'}
            <br />
            {isCompareMode ? '실행력 비교 테스트' : '레벨 테스트'}
          </h1>
          <p className="text-sm leading-relaxed text-gray-400">
            {isCompareMode ? '같은 테스트인데 결과 결이 꽤 달라요.' : '알람, 미루기, 기록 습관으로 보는'}
            <br />
            {isCompareMode ? '누가 더 미루는지 바로 비교해보세요.' : '내 실행 패턴'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>📊</span>
            <span>7문항</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>⏱️</span>
            <span>2분 소요</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>🧬</span>
            <span>8유형</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
          <p className="text-xs leading-relaxed text-gray-300">
            {isCompareMode
              ? '결과 나오면 바로 친구랑 캡처 비교하기 좋게 붙습니다.'
              : '웃자고 시작해도 결과는 꽤 현실적이에요.'}
            <br />
            {isCompareMode
              ? '같은 테스트인데 누가 더 시작을 미루는지 결이 선명하게 갈려요.'
              : '왜 자꾸 끊기는지, 메아리셋이 어디서 도와줄지 같이 보여드릴게요.'}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleStart}
          className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black shadow-lg shadow-white/10 transition-all"
        >
          {isCompareMode ? '친구랑 결과 비교 시작하기' : '내 실행 패턴 확인하기'}
        </motion.button>

        <p className="text-xs leading-relaxed text-gray-700">
          by <span className="text-gray-500">메아리셋</span>
          <br />
          의지보다 구조가 필요한 사람을 위한 90일 리셋 플래너
        </p>
      </motion.div>
    </div>
  );
}
