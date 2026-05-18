import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://meariset-quiz.vercel.app'),
  title: '내가 목표를 이룰 수 있을까? — 메아리셋 심리테스트',
  description: '12문항으로 알아보는 나의 90일 패턴 진단. 토끼·양·다람쥐·곰 중 나는 어떤 실행 패턴일까?',
  openGraph: {
    title: '내가 목표를 이룰 수 있을까? — 메아리셋 심리테스트',
    description: '12문항으로 알아보는 나의 90일 패턴 진단',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '내가 목표를 이룰 수 있을까? — 메아리셋 심리테스트',
    description: '12문항으로 알아보는 나의 90일 패턴 진단',
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
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body style={{ background: '#FAF7F2' }}>
        {children}
      </body>
    </html>
  );
}
