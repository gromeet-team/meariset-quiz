import type { Metadata } from 'next';
import MetaPixel from '@/components/common/MetaPixel';
import './globals.css';

export const metadata: Metadata = {
  title: '나의 의지박약 레벨 테스트 | 메아리셋',
  description: '뇌과학이 밝힌 당신의 실행력 유형은? 7문항으로 알아보는 나의 의지박약 레벨!',
  openGraph: {
    title: '나의 의지박약 레벨 테스트',
    description: '뇌과학이 밝힌 당신의 실행력 유형은?',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나의 의지박약 레벨 테스트',
    description: '뇌과학이 밝힌 당신의 실행력 유형은?',
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
        <MetaPixel />
        <main className="min-h-screen bg-[#111]">
          {children}
        </main>
      </body>
    </html>
  );
}
