'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { QuizResult } from '@/data/results';
import {
  trackCompareClick,
  trackCopyLink,
  trackKakaoShare,
  trackResultShare,
  trackSaveImage,
} from '@/lib/pixel';

interface ShareButtonsProps {
  result: QuizResult;
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
  const [status, setStatus] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/result?type=${result.id}&code=${result.scoreCode}`;
  }, [result.id, result.scoreCode]);

  const imageUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/api/og?type=${result.id}&code=${result.scoreCode}`;
  }, [result.id, result.scoreCode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flash = useCallback((message: string) => {
    setStatus(message);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setStatus(null), 2200);
  }, []);

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
    trackResultShare('copy_link', result.id);
    trackCopyLink(result.id);
    flash('링크 복사 완료. 단톡에 던지면 바로 결과 비교가 됩니다.');
  }, [copyText, flash, result.id, shareUrl]);

  const handleCopyMessage = useCallback(async (message: string) => {
    await copyText(`${message} ${shareUrl}`);
    trackCompareClick(result.id);
    flash('도발 문구까지 같이 복사했습니다. 바로 붙여넣으면 됩니다.');
  }, [copyText, flash, result.id, shareUrl]);

  const handleSaveImage = useCallback(async () => {
    const { toPng } = await import('html-to-image');
    const node = document.getElementById('result-card');

    if (!node) {
      flash('결과 카드가 아직 준비되지 않았습니다. 잠깐 뒤 다시 시도해 주세요.');
      return;
    }

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#0a0a0a',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `meariset-${result.id}.png`;
      link.href = dataUrl;
      link.click();

      trackResultShare('save_image', result.id);
      trackSaveImage(result.id);
      flash('카드 저장 완료. 스토리나 단톡에 바로 올릴 수 있습니다.');
    } catch {
      flash('이미지 저장이 막혔습니다. 대신 링크 공유가 가장 안정적입니다.');
    }
  }, [flash, result.id]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) {
      return false;
    }

    try {
      await navigator.share({
        title: `${result.name} | 메아리셋`,
        text: `${result.verdict} ${result.cardTip}`,
        url: shareUrl,
      });
      trackResultShare('native_share', result.id);
      flash('공유 완료. 친구 결과가 돌아오면 비교가 더 재밌어집니다.');
      return true;
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        flash('기기 공유가 실패해서 다른 방식이 더 안정적입니다.');
      }
      return false;
    }
  }, [flash, result.cardTip, result.id, result.name, result.verdict, shareUrl]);

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
            description: `${result.verdict} ${result.cardTip}`,
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
              title: '나도 해보기',
              link: {
                mobileWebUrl: `${window.location.origin}/`,
                webUrl: `${window.location.origin}/`,
              },
            },
          ],
        });

        trackResultShare('kakao', result.id);
        trackKakaoShare(result.id);
        flash('카카오 공유 완료. 친구가 바로 테스트 타고 들어갈 수 있습니다.');
        return;
      } catch {
        // Fallback handled below.
      }
    }

    const nativeShared = await handleNativeShare();
    if (!nativeShared) {
      await handleCopyLink();
    }
  }, [flash, handleCopyLink, handleNativeShare, imageUrl, result.cardTip, result.emoji, result.id, result.name, result.verdict, shareUrl]);

  return (
    <section className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
        공유하면 재밌어지는 구간
      </p>
      <h3 className="mt-2 text-xl font-black text-white">
        이 결과는 혼자 보면 절반입니다
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/72">
        친구한테 보내면 바로 반응 오는 문구까지 준비했습니다. 저장하거나 복사해서 바로 써도 됩니다.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <button
          onClick={handleKakaoShare}
          className="rounded-[22px] bg-[#FEE500] px-3 py-4 text-center text-xs font-black text-black transition-transform active:scale-[0.98]"
        >
          카카오 공유
        </button>
        <button
          onClick={handleCopyLink}
          className="rounded-[22px] bg-white/[0.06] px-3 py-4 text-center text-xs font-black text-white transition-transform active:scale-[0.98]"
        >
          링크 복사
        </button>
        <button
          onClick={handleSaveImage}
          className="rounded-[22px] bg-white/[0.06] px-3 py-4 text-center text-xs font-black text-white transition-transform active:scale-[0.98]"
        >
          카드 저장
        </button>
      </div>

      {status && (
        <div className="mt-4 rounded-[22px] border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-white">
          {status}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {result.shareMessages.map((message) => (
          <button
            key={message}
            onClick={() => handleCopyMessage(message)}
            className="w-full rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-left transition-colors hover:bg-black/30"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              복사해서 바로 보내기
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/88">
              {message}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
