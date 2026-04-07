'use client';

import { useState, useCallback } from 'react';
import { ResultType } from '@/data/results';

interface ShareButtonsProps {
  result: ResultType;
}

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/result?type=${result.id}`
    : '';

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleSaveImage = useCallback(async () => {
    const { toPng } = await import('html-to-image');
    const node = document.getElementById('result-card');
    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        backgroundColor: '#111111',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `meariset-${result.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image:', err);
    }
  }, [result.id]);

  const handleKakaoShare = useCallback(() => {
    // Kakao SDK placeholder - requires JavaScript key
    if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).Kakao) {
      // Kakao share implementation would go here
      alert('카카오톡 공유 기능은 준비 중입니다');
    } else {
      // Fallback: copy link
      handleCopyLink();
    }
  }, [handleCopyLink]);

  return (
    <div className="space-y-3">
      <p className="text-gray-500 text-xs text-center">결과 공유하기</p>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleKakaoShare}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] transition-all active:scale-95"
        >
          <span className="text-xl">💬</span>
          <span className="text-[10px] text-black font-medium">카카오톡</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all active:scale-95"
        >
          <span className="text-xl">{copied ? '✅' : '🔗'}</span>
          <span className="text-[10px] text-gray-300 font-medium">
            {copied ? '복사됨!' : '링크 복사'}
          </span>
        </button>

        <button
          onClick={handleSaveImage}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all active:scale-95"
        >
          <span className="text-xl">📸</span>
          <span className="text-[10px] text-gray-300 font-medium">이미지 저장</span>
        </button>
      </div>
    </div>
  );
}
