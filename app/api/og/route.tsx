import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const typeData: Record<
  string,
  { name: string; emoji: string; level: string; color: string }
> = {
  legend: { name: '전설의 미루기 장인', emoji: '👑', level: 'Lv.5', color: '#FF4444' },
  sofa: { name: '소파와 한 몸', emoji: '🛋️', level: 'Lv.4', color: '#FF4444' },
  midnight: { name: '새벽 3시 의지왕', emoji: '🌙', level: 'Lv.3', color: '#FF8C00' },
  planner: { name: '계획서만 A+', emoji: '📋', level: 'Lv.3', color: '#FF8C00' },
  threeweek: { name: '3주 반짝러', emoji: '✨', level: 'Lv.2', color: '#FFD700' },
  together: { name: '같이하면 되는 사람', emoji: '🤝', level: 'Lv.2', color: '#FFD700' },
  almost: { name: '거의 다 된 사람', emoji: '🔥', level: 'Lv.1', color: '#44CC44' },
  hidden: { name: '숨겨진 갓생러', emoji: '💎', level: 'Lv.1', color: '#44CC44' },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const data = type && typeData[type] ? typeData[type] : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111111',
          fontFamily: 'sans-serif',
        }}
      >
        {data ? (
          <>
            <div style={{ fontSize: 100, marginBottom: 20, display: 'flex' }}>{data.emoji}</div>
            <div
              style={{
                fontSize: 20,
                color: data.color,
                marginBottom: 16,
                padding: '6px 20px',
                borderRadius: 50,
                background: `${data.color}20`,
                display: 'flex',
              }}
            >
              {data.level}
            </div>
            <div
              style={{
                fontSize: 48,
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 16,
                display: 'flex',
              }}
            >
              {data.name}
            </div>
            <div style={{ fontSize: 20, color: '#888', display: 'flex' }}>
              나의 의지박약 레벨 테스트 | 메아리셋
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🧠</div>
            <div
              style={{
                fontSize: 48,
                color: 'white',
                fontWeight: 'bold',
                marginBottom: 16,
                display: 'flex',
              }}
            >
              나의 의지박약 레벨 테스트
            </div>
            <div style={{ fontSize: 24, color: '#888', display: 'flex' }}>
              뇌과학이 밝힌 당신의 실행력 유형은?
            </div>
            <div style={{ fontSize: 18, color: '#555', marginTop: 20, display: 'flex' }}>
              by 메아리셋
            </div>
          </>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
