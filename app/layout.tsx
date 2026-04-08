import type { Metadata } from 'next';
import Script from 'next/script';
import MetaPixel from '@/components/common/MetaPixel';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://meariset-quiz.vercel.app'),
  title: '나의 의지박약 레벨 테스트 | 메아리셋',
  description: '알람·미루기·기록 습관으로 보는 당신의 실행 패턴. 결과와 함께 메아리셋 맞춤 구조까지 확인해보세요.',
  openGraph: {
    title: '나의 의지박약 레벨 테스트',
    description: '알람·미루기·기록 습관으로 보는 당신의 실행 패턴',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나의 의지박약 레벨 테스트',
    description: '알람·미루기·기록 습관으로 보는 당신의 실행 패턴',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif' }}
      >
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="afterInteractive"
        />
        <MetaPixel />
        <main className="min-h-screen bg-[#111]">
          {children}
        </main>
      </body>
    </html>
  );
}
