'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/* ============================================================
   DATA
   ============================================================ */

const QUESTIONS = [
  {
    id: 1,
    text: '새로운 목표를 세울 때 나는 주로…',
    options: [
      { text: '구체적인 계획과 마감일을 즉시 정한다', scores: { rabbit: 3, sheep: 1, squirrel: 0, bear: 0 } },
      { text: '큰 그림을 그리고 천천히 채워나간다', scores: { rabbit: 0, sheep: 0, squirrel: 1, bear: 3 } },
      { text: '마음이 맞는 사람과 함께 하고 싶어진다', scores: { rabbit: 0, sheep: 3, squirrel: 1, bear: 0 } },
      { text: '여러 방법을 조사하고 최선을 찾는다', scores: { rabbit: 1, sheep: 0, squirrel: 3, bear: 0 } },
    ],
  },
  {
    id: 2,
    text: '목표 달성 중 예상치 못한 장애물이 생기면?',
    options: [
      { text: '즉시 대안을 찾아 계속 앞으로 나간다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '주변에 도움을 구하고 같이 해결한다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 1 } },
      { text: '정보를 더 모으고 신중하게 대응한다', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '잠시 쉬고 에너지를 회복한 뒤 재도전한다', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 3,
    text: '하루 루틴 중 가장 잘 지켜지는 것은?',
    options: [
      { text: '아침 일찍 시작해 집중 시간을 확보한다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '팀이나 스터디와 함께하는 정기 모임', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '조용한 시간에 기록하고 분석하는 시간', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '충분한 수면 후 여유롭게 시작하는 하루', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 4,
    text: '동기부여가 가장 크게 올라갈 때는?',
    options: [
      { text: '구체적인 성과가 눈에 보일 때', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '주변 사람들이 응원하고 함께할 때', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 1 } },
      { text: '왜 이 목표가 중요한지 명확히 이해될 때', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '충분히 쉬고 여유가 생겼을 때', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 5,
    text: '90일 목표를 세운다면 첫 번째로 하는 일은?',
    options: [
      { text: '주간 마일스톤을 세분화해서 캘린더에 넣는다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '같이 도전할 파트너나 그룹을 찾는다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '유사한 목표를 달성한 사례를 찾아 연구한다', scores: { rabbit: 1, sheep: 0, squirrel: 3, bear: 0 } },
      { text: '목표가 내 삶에 맞는지 충분히 생각한다', scores: { rabbit: 0, sheep: 0, squirrel: 1, bear: 3 } },
    ],
  },
  {
    id: 6,
    text: '슬럼프가 왔을 때 나의 패턴은?',
    options: [
      { text: '작은 목표라도 하나씩 체크하며 리듬을 되찾는다', scores: { rabbit: 3, sheep: 1, squirrel: 0, bear: 0 } },
      { text: '비슷한 고민을 나눌 사람을 찾아 대화한다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '슬럼프의 원인을 분석하고 전략을 수정한다', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '완전히 멈추고 충분히 쉰 뒤 재출발한다', scores: { rabbit: 0, sheep: 0, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 7,
    text: '나의 가장 큰 에너지 누수 원인은?',
    options: [
      { text: '너무 많이 시작해서 집중력이 분산된다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '주변의 부정적인 반응에 쉽게 흔들린다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '완벽한 방법을 찾느라 시작이 늦어진다', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '억지로 무리해서 탈진 상태가 된다', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 8,
    text: '달성감이 가장 큰 순간은?',
    options: [
      { text: '체크리스트의 마지막 항목에 체크할 때', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '팀원 모두가 함께 완주했을 때', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '예측했던 방식대로 결과가 나왔을 때', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '무리 없이 지속하며 목표에 다가갔을 때', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 9,
    text: '새 습관을 만들 때 가장 중요하게 생각하는 것은?',
    options: [
      { text: '매일 빠짐없이 실행하는 일관성', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '같이 하는 사람이 있어야 지속 가능하다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '왜 해야 하는지 근거가 명확해야 한다', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '무리하지 않고 여유 있게 설계해야 한다', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 10,
    text: '목표 달성 후 나는 주로…',
    options: [
      { text: '다음 목표를 즉시 설정하고 달린다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '함께한 사람들과 축하 시간을 갖는다', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 1 } },
      { text: '회고록을 작성하고 다음 전략을 짠다', scores: { rabbit: 1, sheep: 0, squirrel: 3, bear: 0 } },
      { text: '충분히 쉬고 재충전의 시간을 갖는다', scores: { rabbit: 0, sheep: 0, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 11,
    text: '나에게 가장 잘 맞는 환경은?',
    options: [
      { text: '명확한 목표와 데드라인이 있는 구조적 환경', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '서로 응원하는 커뮤니티나 소그룹', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '혼자 깊이 생각하고 연구할 수 있는 공간', scores: { rabbit: 0, sheep: 0, squirrel: 3, bear: 1 } },
      { text: '압박 없이 자신의 속도로 할 수 있는 환경', scores: { rabbit: 0, sheep: 1, squirrel: 0, bear: 3 } },
    ],
  },
  {
    id: 12,
    text: '"90일 챌린지"라는 말을 들었을 때 첫 느낌은?',
    options: [
      { text: '흥미롭다! 당장 플랜을 짜고 싶다', scores: { rabbit: 3, sheep: 0, squirrel: 1, bear: 0 } },
      { text: '같이 하면 재미있겠다, 모집해야지', scores: { rabbit: 0, sheep: 3, squirrel: 0, bear: 0 } },
      { text: '어떤 방식이 효과적인지 먼저 알아봐야지', scores: { rabbit: 1, sheep: 0, squirrel: 3, bear: 0 } },
      { text: '90일이 무리는 아닐지 먼저 고민된다', scores: { rabbit: 0, sheep: 0, squirrel: 0, bear: 3 } },
    ],
  },
];

type AnimalType = 'rabbit' | 'sheep' | 'squirrel' | 'bear';

const RESULTS: Record<AnimalType, {
  emoji: string;
  typeName: string;
  title: string;
  tagline: string;
  color: string;
  bgColor: string;
  description: string;
  traits: string[];
  prescriptions: Array<{ icon: string; text: string }>;
  shareText: string;
}> = {
  rabbit: {
    emoji: '🐇',
    typeName: '질주형 토끼',
    title: '빠르게 달리는\n실행력의 토끼',
    tagline: '일단 시작하고 보는 행동파. 속도는 최고지만 번아웃 주의보가 켜집니다.',
    color: '#C8454A',
    bgColor: '#FDEAEA',
    description: '당신은 목표를 세우면 즉시 행동으로 옮기는 실행력의 달인입니다. 계획을 빠르게 짜고, 체크리스트를 채워나가며 성취감을 얻죠. 다만 너무 많은 목표를 동시에 달리다 에너지가 분산되거나 완주 직전에 탈진할 위험이 있습니다.',
    traits: [
      '빠른 실행력과 강한 추진력',
      '명확한 계획과 체크리스트 선호',
      '단기 목표에서 높은 성과',
      '과부하 시 번아웃 위험',
    ],
    prescriptions: [
      { icon: '🎯', text: '목표는 3개 이하로 압축하세요. 많은 것보다 깊은 것이 90일을 완주합니다.' },
      { icon: '🛑', text: '매주 금요일 "회복 루틴" 1시간을 캘린더에 먼저 블록하세요.' },
      { icon: '📊', text: '주간 진도보다 월간 에너지 잔량을 체크하는 습관을 들이세요.' },
    ],
    shareText: '나는 🐇 질주형 토끼! 빠른 실행력이 강점이지만 번아웃 주의가 필요해요.',
  },
  sheep: {
    emoji: '🐑',
    typeName: '연대형 양',
    title: '함께일 때 빛나는\n연대의 양',
    tagline: '혼자보다 같이. 공동체 에너지로 90일을 완주하는 타입입니다.',
    color: '#4A6FA5',
    bgColor: '#EAF0FA',
    description: '당신은 혼자보다 함께할 때 훨씬 강한 힘을 발휘합니다. 팀원의 응원이 곧 연료이고, 커뮤니티가 동기부여의 핵심입니다. 하지만 주변 분위기나 반응에 영향을 많이 받아 혼자 남겨지면 동력을 잃기 쉽습니다.',
    traits: [
      '그룹 환경에서 높은 지속력',
      '타인의 응원이 강력한 연료',
      '협력과 소통 능력 우수',
      '혼자일 때 동기 저하 위험',
    ],
    prescriptions: [
      { icon: '👥', text: '90일 파트너를 최소 1명 정하세요. 매주 진행 상황을 공유하면 완주율이 3배 높아집니다.' },
      { icon: '📢', text: '공개 선언을 활용하세요. SNS나 카톡 방에 목표를 공표하는 것이 효과적입니다.' },
      { icon: '🔋', text: '혼자 하는 날의 미니 루틴을 별도로 준비해두세요.' },
    ],
    shareText: '나는 🐑 연대형 양! 함께할 때 가장 강하고 커뮤니티가 핵심 동력이에요.',
  },
  squirrel: {
    emoji: '🐿️',
    typeName: '분석형 다람쥐',
    title: '철저하게 준비하는\n분석의 다람쥐',
    tagline: '데이터와 근거로 무장. 완벽한 준비가 때론 시작을 늦게 합니다.',
    color: '#8B5E3C',
    bgColor: '#F9F0E6',
    description: '당신은 목표를 실행하기 전에 충분한 정보와 근거를 수집합니다. 체계적인 분석과 전략 수립이 강점이죠. 하지만 완벽한 방법을 찾다 시작이 늦어지거나, 과도한 준비로 실행 단계에서 에너지가 부족해질 수 있습니다.',
    traits: [
      '철저한 사전 조사와 전략 수립',
      '데이터 기반의 의사결정',
      '체계적인 기록과 분석 능력',
      '완벽주의로 인한 시작 지연 위험',
    ],
    prescriptions: [
      { icon: '⏰', text: '"준비 기간"에 데드라인을 설정하세요. "3일 안에 시작" 규칙이 분석 마비를 막습니다.' },
      { icon: '🧪', text: '완벽한 플랜 대신 "실험"으로 접근하세요. 테스트하고 수정하는 것이 최선입니다.' },
      { icon: '📝', text: '주 1회 회고는 유지하되, 일일 분석은 줄이고 실행 시간을 늘리세요.' },
    ],
    shareText: '나는 🐿️ 분석형 다람쥐! 철저한 준비가 강점이지만 완벽주의 함정을 조심해야 해요.',
  },
  bear: {
    emoji: '🐻',
    typeName: '지속형 곰',
    title: '천천히 그러나 끝까지\n지속의 곰',
    tagline: '느리지만 안전하게. 번아웃 없이 90일 전체를 완주하는 타입입니다.',
    color: '#6B5344',
    bgColor: '#F2EDE6',
    description: '당신은 빠르게 달리기보다 꾸준하고 지속 가능하게 나아가는 타입입니다. 충분한 휴식과 재충전이 전제될 때 놀라운 지속력을 발휘하죠. 무리한 속도보다 자신의 페이스를 지키는 것이 최대 강점입니다.',
    traits: [
      '높은 지속 가능성과 장기 완주력',
      '번아웃 없는 안정적인 실행 패턴',
      '자기 페이스에 대한 높은 인식',
      '느린 시작으로 초기 동력 부족 위험',
    ],
    prescriptions: [
      { icon: '🗓️', text: '"쉬는 날"을 계획에 포함하세요. 회복일이 있는 플랜이 더 오래 갑니다.' },
      { icon: '🌱', text: '첫 2주는 50% 강도로 시작하세요. 속도보다 리듬을 만드는 것이 우선입니다.' },
      { icon: '🏁', text: '90일 완주 자체를 가장 큰 지표로 설정하세요. 속도 경쟁은 당신의 게임이 아닙니다.' },
    ],
    shareText: '나는 🐻 지속형 곰! 번아웃 없이 꾸준하게 90일을 완주하는 타입이에요.',
  },
};

/* ============================================================
   STORY IMAGES
   ============================================================ */

const STORY_IMAGES = Array.from({ length: 28 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/stories/story-${num}.webp`;
});

/* ============================================================
   COMPONENT
   ============================================================ */

type Scene = 'landing' | 'quiz' | 'loading' | 'result';
type Scores = Record<AnimalType, number>;

export default function HomePage() {
  const [scene, setScene] = useState<Scene>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ rabbit: 0, sheep: 0, squirrel: 0, bear: 0 });
  const [result, setResult] = useState<AnimalType | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const handleStart = () => {
    setCurrentQ(0);
    setScores({ rabbit: 0, sheep: 0, squirrel: 0, bear: 0 });
    setScene('quiz');
  };

  const handleAnswer = (optionScores: Record<AnimalType, number>) => {
    const newScores: Scores = {
      rabbit: scores.rabbit + optionScores.rabbit,
      sheep: scores.sheep + optionScores.sheep,
      squirrel: scores.squirrel + optionScores.squirrel,
      bear: scores.bear + optionScores.bear,
    };

    if (currentQ < QUESTIONS.length - 1) {
      setScores(newScores);
      setCurrentQ((q) => q + 1);
    } else {
      // Last question — compute result
      const winner = (Object.keys(newScores) as AnimalType[]).reduce((a, b) =>
        newScores[a] >= newScores[b] ? a : b
      );
      setResult(winner);
      setScene('loading');
      setTimeout(() => setScene('result'), 2200);
    }
  };

  const handleRetry = () => {
    setScene('landing');
    setCurrentQ(0);
    setScores({ rabbit: 0, sheep: 0, squirrel: 0, bear: 0 });
    setResult(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('링크가 복사되었습니다!');
    } catch {
      showToast('복사에 실패했습니다.');
    }
  };

  const handleKakaoShare = () => {
    if (result) {
      const text = RESULTS[result].shareText;
      const url = `https://sharer.kakao.com/talk/friends/picker/link?app_key=&text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'width=400,height=500');
    }
  };

  // Scroll to top on scene change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [scene]);

  const progress = scene === 'quiz' ? Math.round(((currentQ) / QUESTIONS.length) * 100) : 0;
  const q = QUESTIONS[currentQ];
  const res = result ? RESULTS[result] : null;

  return (
    <div className="app">
      {/* ── LANDING ── */}
      {scene === 'landing' && (
        <section className="scene active">
          <span className="landing-badge">메아리셋 패턴 진단</span>

          <h1 className="landing-title">
            내가 목표를<br />
            <em>이룰 수 있을까?</em>
          </h1>

          <p className="landing-sub">
            12가지 질문으로 알아보는<br />
            나의 <strong>90일 실행 패턴</strong>.<br />
            토끼·양·다람쥐·곰 중 나는 어떤 타입?
          </p>

          <div className="landing-meta">
            <div className="meta-item"><span>⏱</span><span>90초</span></div>
            <div className="meta-item"><span>📋</span><span>12문항</span></div>
            <div className="meta-item"><span>🎯</span><span>4가지 패턴</span></div>
          </div>

          {/* Social Proof Strip */}
          <div className="story-strip">
            <p className="strip-label">90일 챌린저들의 기록 ✦ 28명</p>
            <div className="strip-scroll">
              {STORY_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`챌린저 ${i + 1}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0, width: 80, height: 80 }}
                />
              ))}
            </div>
          </div>

          <div className="landing-cta">
            <button className="btn-cta" onClick={handleStart}>
              나의 패턴 알아보기 →
            </button>
            <p className="cta-note">무료 · 90초 · 결과 즉시 확인</p>
          </div>
        </section>
      )}

      {/* ── QUIZ ── */}
      {scene === 'quiz' && (
        <section className="scene active">
          <div className="quiz-header">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-label">{currentQ + 1} / {QUESTIONS.length}</p>
          </div>

          <p className="question-num">Q{q.id}</p>
          <h2 className="question-text">{q.text}</h2>

          <div className="options-list">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                className="option-btn"
                onClick={() => handleAnswer(opt.scores as Record<AnimalType, number>)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── LOADING ── */}
      {scene === 'loading' && (
        <section className="scene active loading-scene">
          <div className="loading-animal">
            {result === 'rabbit' && '🐇'}
            {result === 'sheep' && '🐑'}
            {result === 'squirrel' && '🐿️'}
            {result === 'bear' && '🐻'}
            {!result && '✨'}
          </div>
          <p className="loading-title">패턴을 분석하고 있어요</p>
          <p className="loading-sub">90일 실행 패턴 결과를<br />정리하고 있습니다...</p>
        </section>
      )}

      {/* ── RESULT ── */}
      {scene === 'result' && res && (
        <section className="scene active result-scene">
          <span
            className="result-badge"
            style={{ background: res.bgColor, color: res.color }}
          >
            {res.typeName}
          </span>

          <div className="result-animal-icon">{res.emoji}</div>

          <p className="result-type-label">당신의 90일 패턴</p>
          <h2 className="result-title" style={{ whiteSpace: 'pre-line' }}>{res.title}</h2>
          <p className="result-tagline">{res.tagline}</p>

          <div className="result-divider" />

          <p className="result-section-title">패턴 분석</p>
          <p className="result-description">{res.description}</p>

          <div className="result-divider" />

          <p className="result-section-title">주요 특징</p>
          <div className="result-traits">
            {res.traits.map((trait, i) => (
              <div key={i} className="trait-item">
                <div className="trait-dot" style={{ background: res.color }} />
                <span>{trait}</span>
              </div>
            ))}
          </div>

          <div className="result-divider" />

          <p className="result-section-title">90일 처방전</p>
          <div className="result-prescription">
            {res.prescriptions.map((p, i) => (
              <div key={i} className="prescription-item">
                <span className="prescription-icon">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <div className="result-share-area">
            <button className="btn-share btn-copy" onClick={handleCopyLink}>
              <span>🔗</span>
              <span>링크 복사하기</span>
            </button>
            <button className="btn-share btn-retry" onClick={handleRetry}>
              다시 테스트하기
            </button>
          </div>
        </section>
      )}

      {/* ── TOAST ── */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>{toastMsg}</div>
    </div>
  );
}
