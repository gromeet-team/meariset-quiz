'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface HomeClientProps {
  isCompareMode: boolean;
}

export default function HomeClient({ isCompareMode }: HomeClientProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden px-4 pb-10 pt-5 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,122,0,0.3),_transparent_28%),radial-gradient(circle_at_84%_18%,_rgba(109,186,87,0.14),_transparent_20%),radial-gradient(circle_at_50%_68%,_rgba(255,255,255,0.06),_transparent_36%),linear-gradient(180deg,_rgba(255,255,255,0.04)_0%,_transparent_28%),linear-gradient(180deg,_#171717_0%,_#090909_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center">
        <motion.div
          aria-hidden
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="home-float pointer-events-none absolute left-0 top-18 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold text-white/55"
        >
          눌렀다가 공감
        </motion.div>
        <motion.div
          aria-hidden
          animate={{ y: [0, 9, 0], x: [0, -4, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="home-float pointer-events-none absolute right-2 top-30 rounded-full border border-[#FEE500]/20 bg-[#FEE500]/10 px-3 py-1 text-[11px] font-semibold text-[#FEE500]"
        >
          친구한테 보내기 좋음
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-6 shadow-[0_28px_100px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-6 sm:py-7"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/62">
              playful test
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#FFB27A]/20 bg-[#FFB27A]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFB27A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFB27A]" />
              meariset
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#FFB27A]">
              {isCompareMode ? '같이 하면 더 잘 놀릴 수 있는 비교 버전' : '시작 직전에 새는 사람용 미루기 테스트'}
            </p>
            <h1 className="mt-3 text-[42px] font-black leading-[0.86] tracking-[-0.07em] text-white sm:text-[54px]">
              {isCompareMode
                ? '누가 더 미루는지 말고 왜 그렇게 미루는지 바로 비교'
                : '의지박약 말고 내 미루기 캐릭터부터 보자'}
            </h1>
            <p className="mt-4 max-w-[26rem] text-[15px] leading-relaxed text-white/70 sm:text-base">
              {isCompareMode
                ? '같은 질문을 풀어도 결과 톤이 꽤 다릅니다. 풀자마자 비교 포인트가 튀어나옵니다.'
                : '읽는 화면 말고 누르는 화면으로 줄였습니다. 바로 풀고 별명 하나부터 확인하면 됩니다.'}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.985 }}
            whileHover={{ scale: 1.012 }}
            onClick={() => router.push('/quiz')}
            className="home-pulse mt-7 flex w-full items-center justify-between rounded-[26px] bg-white px-5 py-5 text-left text-black transition-transform"
          >
            <span>
              <span className="block text-[18px] font-black">
                {isCompareMode ? '친구랑 바로 시작하기' : '지금 바로 테스트 시작'}
              </span>
              <span className="mt-1 block text-[12px] font-semibold text-black/58">7문항 · 2분 컷 · 결과 저장 가능</span>
            </span>
            <span className="rounded-full bg-black px-3 py-2 text-[12px] font-black uppercase tracking-[0.18em] text-white">
              Tap
            </span>
          </motion.button>
          <p className="mt-3 text-center text-[12px] font-medium text-white/44">
            {isCompareMode ? '둘 다 끝나면 바로 비교 톤이 뜹니다.' : '끝나면 별명, 트리거, 오늘의 한 가지가 바로 뜹니다.'}
          </p>

          <div className="mt-6 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,178,122,0.2),rgba(255,255,255,0.05))] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/48">sample result</p>
                <div className="rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold text-white/72">공감형</div>
              </div>
              <div className="mt-3 rounded-[22px] bg-black/18 px-4 py-4">
                <p className="text-[23px] font-black leading-[1.04] tracking-[-0.05em] text-white">
                  “결심은 큰데
                  <br />
                  첫 버튼 앞에서 자꾸 샌다”
                </p>
                <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-white/64">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/78">오늘의 한 가지</span>
                  <span>시작 조건부터 10초 안에 줄이기</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3.5"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">mood</p>
                <p className="mt-1 text-sm font-semibold text-white/82">
                  {isCompareMode ? '비교하면서 웃기고 공감되는 테스트' : '가볍게 눌렀다가 꽤 정확하게 꽂히는 테스트'}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] font-semibold text-white/72">
                저장각 결과
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
