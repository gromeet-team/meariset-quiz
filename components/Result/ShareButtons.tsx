'use client';

import { useState, useCallback } from 'react';
import { ResultType } from '@/data/results';
import { trackCopyLink, trackResultShare, trackSaveImage } from '@/lib/pixel';

interface ShareButtonsProps {
  result: ResultType;
}

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/result?type=${result.id}`
    : '';

  const flashStatus = useCallback((message: string) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(null), 2200);
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackResultShare('copy_link', result.id);
      trackCopyLink(result.id);
      flashStatus('링크 복사 완료. 친구한테 바로 붙여넣으면 됩니다.');
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
      trackResultShare('copy_link', result.id);
      trackCopyLink(result.id);
      flashStatus('링크 복사 완료. 복사가 안 보이면 길게 눌러 다시 확인해 주세요.');
      setTimeout(() => setCopied(false), 2000);
    }
  }, [flashStatus, result.id, shareUrl]);

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
      trackResultShare('save_image', result.id);
      trackSaveImage(result.id);
      flashStatus('스토리 올리기 좋은 이미지로 저장했어요.');
    } catch (err) {
      console.error('Failed to save image:', err);
      flashStatus('이미지 저장에 실패했어요. 링크 복사로 공유해 주세요.');
    }
  }, [flashStatus, result.id]);

  const handleKakaoShare = useCallback(() => {
    flashStatus('카카오 공유는 준비 중이에요. 아래 링크 복사로 바로 공유할 수 있어요.');
  }, [flashStatus]);

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-center">
        <p className="text-sm font-semibold text-white">
          친구한테 보내서 뭐 나오는지 같이 보세요
        </p>
        <p className="text-xs text-gray-500">
          링크 복사나 이미지 저장으로 바로 공유할 수 있어요.
        </p>
      </div>

      {statusMessage && (
        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-xs leading-relaxed text-white">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleKakaoShare}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#FEE500]/70 transition-all active:scale-95"
        >
          <span className="text-xl">💬</span>
          <span className="text-[10px] text-black font-medium">카카오 준비중</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all active:scale-95"
        >
          <span className="text-xl">{copied ? '✅' : '🔗'}</span>
          <span className="text-[10px] text-gray-300 font-medium">
            {copied ? '복사 완료' : '친구에게 링크'}
          </span>
        </button>

        <button
          onClick={handleSaveImage}
          className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all active:scale-95"
        >
          <span className="text-xl">📸</span>
          <span className="text-[10px] text-gray-300 font-medium">스토리용 저장</span>
        </button>
      </div>
    </div>
  );
}
