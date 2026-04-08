import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { buildResultFromCode } from '@/data/results';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  const code = request.nextUrl.searchParams.get('code');
  const result = buildResultFromCode(code, type);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(160deg, #1d1d1d 0%, #111111 50%, #090909 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 18% 18%, ${result.color}44, transparent 34%), radial-gradient(circle at 82% 24%, rgba(255,255,255,0.12), transparent 24%), radial-gradient(circle at 80% 85%, ${result.color}22, transparent 22%)`,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '52px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, color: '#c8c8c8' }}>
              MEARISET PATTERN TEST
            </div>
            <div
              style={{
                display: 'flex',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                padding: '10px 16px',
                fontSize: 18,
                color: '#f5f5f5',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              {result.riskLevel}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 970 }}>
            <div
              style={{
                display: 'flex',
                width: 128,
                height: 128,
                borderRadius: 34,
                border: `2px solid ${result.color}66`,
                background: `${result.color}18`,
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 76,
                marginBottom: 26,
              }}
            >
              {result.emoji}
            </div>

            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                borderRadius: 999,
                padding: '10px 18px',
                border: `1px solid ${result.color}55`,
                background: `${result.color}18`,
                color: result.color,
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 18,
              }}
            >
              {result.subtype}
            </div>

            <div style={{ display: 'flex', fontSize: 62, fontWeight: 800, lineHeight: 1.05 }}>
              {result.name}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 18,
                fontSize: 30,
                lineHeight: 1.3,
                color: '#f1f1f1',
              }}
            >
              {result.verdict}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                borderRadius: 28,
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', fontSize: 18, color: '#9ca3af', marginBottom: 8 }}>
                캡처 포인트
              </div>
              <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}>
                {result.cardTip}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                borderRadius: 28,
                border: '1px solid rgba(255,255,255,0.09)',
                background: 'rgba(255,255,255,0.05)',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', fontSize: 18, color: '#9ca3af', marginBottom: 8 }}>
                친구 반응 포인트
              </div>
              <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}>
                {result.compareCopy}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
