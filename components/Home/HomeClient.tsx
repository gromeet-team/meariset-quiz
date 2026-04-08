'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface HomeClientProps {
  isCompareMode: boolean;
}

const proofItems = [
  '결과 한 줄만 캡처해도 반응 오는 타입',
  '웃기기만 하지 않고 실제 패턴 처방까지 제공',
  '친구한테 바로 던질 비교 문구 포함',
];

export default function HomeClient({ isCompareMode }: HomeClientProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,122,0,0.22),_transparent_30%),radial-gradient(circle_at_80%_25%,_rgba(109,186,87,0.18),_transparent_24%),linear-gradient(180deg,_#171717_0%,_#0c0c0c_100%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-[40px] border border-white/10 bg-black/20 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              meariset viral rebuild
            </div>
            <div className="text-4xl">🧠</div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-[#FFB27A]">
              {isCompareMode ? '친구랑 바로 붙는 모드' : '왜 시작 직전에 무너지는지 까발리는 테스트'}
            </p>
            <h1 className="mt-3 text-[38px] font-black leading-[0.96] text-white">
              {isCompareMode
                ? '누가 더 미루는지 말고, 왜 그렇게 되는지 비교합니다'
                : '의지박약이 아니라 내 실행패턴이 문제였는지 확인하세요'}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/72">
              {isCompareMode
                ? '같은 7문항인데도 결과가 꽤 다르게 갈립니다. 친구 결과까지 오면 바로 비교하고 놀리기 좋은 판결이 나옵니다.'
                : '테스트 끝나면 “이거 완전 나다” 싶은 별명, 망하는 트리거, 오늘 바로 써먹는 처방, 캡처용 카드까지 한 번에 나옵니다.'}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">문항</p>
              <p className="mt-2 text-2xl font-black text-white">7개</p>
              <p className="mt-1 text-xs text-white/55">2분 안쪽</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">결과</p>
              <p className="mt-2 text-2xl font-black text-white">6개</p>
              <p className="mt-1 text-xs text-white/55">행동 프로필</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">산출물</p>
              <p className="mt-2 text-2xl font-black text-white">캡처각</p>
              <p className="mt-1 text-xs text-white/55">공유용 카드 제공</p>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              왜 이 버전이 더 재밌냐면
            </p>
            <div className="mt-3 space-y-2">
              {proofItems.map((item) => (
                <p key={item} className="text-sm leading-relaxed text-white/80">
                  • {item}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-[#FEE500]/20 bg-[#FEE500]/10 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FEE500]">
              미리 보는 결과 톤
            </p>
            <p className="mt-2 text-lg font-black leading-snug text-white">
              “결심은 블록버스터인데 첫 장면 촬영이 맨날 밀립니다.”
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/72">
              이런 식으로 웃기면서도, 왜 그러는지와 오늘 뭘 바꾸면 되는지까지 같이 보여줍니다.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.985 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => router.push('/quiz')}
            className="mt-6 w-full rounded-[26px] bg-white px-5 py-5 text-lg font-black text-black transition-transform"
          >
            {isCompareMode ? '친구랑 비교 결과 받기' : '내 실행패턴 까보기'}
          </motion.button>

          <p className="mt-4 text-center text-xs leading-relaxed text-white/35">
            by 메아리셋
            <br />
            의지를 탓하기 전에 구조부터 바꾸는 사람들을 위한 90일 리셋 플래너
          </p>
        </motion.div>
      </div>
    </div>
  );
}
