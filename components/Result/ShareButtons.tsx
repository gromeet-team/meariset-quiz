'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ResultType } from '@/data/results';
import {
  trackCompareClick,
  trackCopyLink,
  trackKakaoShare,
  trackResultShare,
  trackSaveImage,
  trackShareRewardReveal,
} from '@/lib/pixel';

interface ShareButtonsProps {
  result: ResultType;
}

interface KakaoSharePayload {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

interface KakaoSdk {
  isInitialized: () => boolean;
  init: (appKey: string) => void;
  Share: {
    sendDefault: (payload: KakaoSharePayload) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [shareUnlocked, setShareUnlocked] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/result?type=${result.id}`
      : '';
  const imageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/api/og?type=${result.id}`
      : '';

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flashStatus = useCallback((message: string) => {
    setStatusMessage(message);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setStatusMessage(null), 2200);
  }, []);

  const unlockShareReward = useCallback(
    (trigger: string) => {
      setShareUnlocked((current) => {
        if (!current) {
          trackShareRewardReveal(result.id, trigger);
        }
        return true;
      });
    },
    [result.id]
  );

  const copyText = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    await copyText(shareUrl);

    setCopied(true);
    trackResultShare('copy_link', result.id);
    trackCopyLink(result.id);
    unlockShareReward('copy_link');
    flashStatus('링크 복사 완료. 단톡방에 던지면 바로 비교 시작됩니다.');
    window.setTimeout(() => setCopied(false), 2000);
  }, [copyText, flashStatus, result.id, shareUrl, unlockShareReward]);

  const handleSaveImage = useCallback(async () => {
    const { toPng } = await import('html-to-image');
    const node = document.getElementById('result-card');
    if (!node) {
      flashStatus('결과 카드가 아직 준비되지 않았어요. 잠깐 뒤 다시 눌러주세요.');
      return;
    }

    try {
      const dataUrl = await toPng(node, {
        backgroundColor: '#080808',
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `meariset-${result.id}.png`;
      link.href = dataUrl;
      link.click();
      trackResultShare('save_image', result.id);
      trackSaveImage(result.id);
      unlockShareReward('save_image');
      flashStatus('결과 카드 저장 완료. 스토리 올리고 친구 결과 받아보세요.');
    } catch (error) {
      console.error('Failed to save image:', error);
      flashStatus('이미지 저장이 막혔어요. 링크 복사가 가장 빠릅니다.');
    }
  }, [flashStatus, result.id, unlockShareReward]);

  const tryNativeShare = useCallback(async () => {
    if (!navigator.share) {
      return false;
    }

    try {
      await navigator.share({
        title: `${result.name} | 메아리셋 결과`,
        text: `${result.subtype} · ${result.headline}`,
        url: shareUrl,
      });
      trackResultShare('native_share', result.id);
      unlockShareReward('native_share');
      flashStatus('공유 완료. 친구 결과 오면 바로 비교각입니다.');
      return true;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        flashStatus('공유가 취소됐어요. 다시 누르거나 링크 복사를 써보세요.');
      }
      return false;
    }
  }, [flashStatus, result.headline, result.id, result.name, result.subtype, shareUrl, unlockShareReward]);

  const handleKakaoShare = useCallback(async () => {
    const kakao = window.Kakao;

    if (kakao && KAKAO_JS_KEY) {
      try {
        if (!kakao.isInitialized()) {
          kakao.init(KAKAO_JS_KEY);
        }

        kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `${result.emoji} ${result.name}`,
            description: `${result.subtype} · ${result.headline}`,
            imageUrl,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          buttons: [
            {
              title: '내 결과 보기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
            {
              title: '나도 테스트하기',
              link: {
                mobileWebUrl: `${window.location.origin}/`,
                webUrl: `${window.location.origin}/`,
              },
            },
          ],
        });

        trackResultShare('kakao', result.id);
        trackKakaoShare(result.id);
        unlockShareReward('kakao');
        flashStatus('카카오로 보냈어요. 친구 결과 오면 비교 카드가 완성됩니다.');
        return;
      } catch (error) {
        console.error('Kakao share failed:', error);
      }
    }

    const nativeShared = await tryNativeShare();
    if (nativeShared) {
      return;
    }

    await handleCopyLink();
    flashStatus(
      KAKAO_JS_KEY
        ? '카카오 연결이 불안정해 링크를 복사했어요. 바로 붙여넣어 보내면 됩니다.'
        : '카카오 설정이 없어 링크를 복사했어요. 바로 붙여넣어 보내면 됩니다.'
    );
  }, [
    flashStatus,
    handleCopyLink,
    imageUrl,
    result.emoji,
    result.headline,
    result.id,
    result.name,
    result.subtype,
    shareUrl,
    tryNativeShare,
    unlockShareReward,
  ]);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#FEE500]/12 via-white/[0.04] to-white/[0.02] p-5">
        <div className="space-y-1 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FEE500]">
            Share Boost
          </p>
          <p className="text-lg font-bold text-white">
            이 결과는 혼자 보면 반쪽입니다
          </p>
          <p className="text-sm leading-relaxed text-gray-300">
            친구 1명만 보내도 더 재밌어요. 누가 더 미루는지 바로 비교됩니다.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onClick={handleKakaoShare}
            className="flex flex-col items-center gap-2 rounded-2xl bg-[#FEE500] px-3 py-4 transition-all active:scale-95"
          >
            <span className="text-xl">💬</span>
            <span className="text-[10px] font-bold text-black">카카오 공유</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-4 transition-all active:scale-95"
          >
            <span className="text-xl">{copied ? '✅' : '🔗'}</span>
            <span className="text-[10px] font-medium text-gray-200">
              {copied ? '복사 완료' : '링크 복사'}
            </span>
          </button>

          <button
            onClick={handleSaveImage}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-4 transition-all active:scale-95"
          >
            <span className="text-xl">📸</span>
            <span className="text-[10px] font-medium text-gray-200">카드 저장</span>
          </button>
        </div>

        {statusMessage && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-center text-xs leading-relaxed text-white">
            {statusMessage}
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-dashed border-white/12 bg-black/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-white">
                {shareUnlocked ? '비교 문구 열림' : '공유하면 비교 문구 열림'}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                {shareUnlocked
                  ? '친구에게 바로 던질 한 줄을 복사해서 비교 반응을 받아보세요.'
                  : '과한 리워드 대신, 친구 반응이 잘 오는 한 줄 문구를 열어드려요.'}
              </p>
            </div>
            <div
              className="rounded-full px-3 py-1 text-[11px] font-bold"
              style={{
                backgroundColor: shareUnlocked ? `${result.color}22` : 'rgba(255,255,255,0.06)',
                color: shareUnlocked ? result.color : '#9ca3af',
              }}
            >
              {shareUnlocked ? 'UNLOCKED' : 'LOCKED'}
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              친구한테 이렇게 보내기
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-100">
              {shareUnlocked
                ? `나 ${result.name} 나왔는데 너도 해봐. 우리 둘 중 누가 더 ${result.subtype}인지 보자.`
                : '공유나 저장을 한 번 하면 친구 반응이 잘 오는 비교 문구가 열립니다.'}
            </p>
          </div>

          {shareUnlocked && (
            <button
              onClick={async () => {
                trackCompareClick(result.id);
                await copyText(
                  `나 ${result.name} 나왔는데 너도 해봐. 우리 둘 중 누가 더 ${result.subtype}인지 보자. ${shareUrl}`
                );
                flashStatus('비교 문구까지 복사했어요. 바로 붙여넣어 보내면 됩니다.');
              }}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98]"
            >
              비교 문구까지 같이 복사
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
