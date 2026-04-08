import type { Metadata } from 'next';
import Script from 'next/script';
import MetaPixel from '@/components/common/MetaPixel';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://meariset-quiz.vercel.app'),
  title: '왜 시작 직전에 무너지는지 까발리는 테스트 | 메아리셋',
  description: '캡처하고 싶은 실행패턴 결과, 친구에게 던질 비교 문구, 오늘 바로 써먹는 처방까지 한 번에 보는 메아리셋 테스트.',
  openGraph: {
    title: '왜 시작 직전에 무너지는지 까발리는 테스트',
    description: '웃기기만 하지 않고, 실제로 도움 되는 실행패턴 결과 카드',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '왜 시작 직전에 무너지는지 까발리는 테스트',
    description: '웃기기만 하지 않고, 실제로 도움 되는 실행패턴 결과 카드',
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
