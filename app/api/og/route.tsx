import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getResultTypeById } from '@/data/results';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  const result = type ? getResultTypeById(type) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#080808',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: result
              ? `radial-gradient(circle at 20% 20%, ${result.color}55, transparent 35%), radial-gradient(circle at 85% 80%, ${result.color}30, transparent 30%), linear-gradient(155deg, #181818 0%, #0d0d0d 60%, #050505 100%)`
              : 'linear-gradient(155deg, #181818 0%, #0d0d0d 60%, #050505 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '56px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 24, color: '#d4d4d4', letterSpacing: 2 }}>
              MEARISET QUIZ
            </div>
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                fontSize: 18,
                color: '#f5f5f5',
              }}
            >
              결과 카드
            </div>
          </div>

          {result ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  width: 124,
                  height: 124,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 32,
                  background: `${result.color}22`,
                  border: `2px solid ${result.color}55`,
                  fontSize: 72,
                  marginBottom: 28,
                }}
              >
                {result.emoji}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: `${result.color}18`,
                  border: `1px solid ${result.color}55`,
                  color: result.color,
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 22,
                }}
              >
                {result.subtype}
              </div>

              <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
                {result.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  maxWidth: 960,
                  marginTop: 18,
                  fontSize: 30,
                  color: '#f1f1f1',
                  lineHeight: 1.35,
                }}
              >
                {result.headline}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 84, marginBottom: 28 }}>🧠</div>
              <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
                내 의지박약
                <br />
                레벨 테스트
              </div>
              <div
                style={{
                  display: 'flex',
                  maxWidth: 840,
                  marginTop: 18,
                  fontSize: 30,
                  color: '#d4d4d4',
                  lineHeight: 1.35,
                }}
              >
                알람, 미루기, 기록 습관으로 보는 내 실행 패턴
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 28px',
              borderRadius: 28,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 18, color: '#a3a3a3', marginBottom: 6 }}>
                친구랑 비교해보면 더 재밌는 유형 테스트
              </div>
              <div style={{ display: 'flex', fontSize: 28, color: '#ffffff', fontWeight: 700 }}>
                메아리셋으로 이어지는 실행 패턴 진단
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                padding: '14px 22px',
                borderRadius: 999,
                background: result?.color ?? '#FEE500',
                color: '#000',
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              공유각 완료
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
