export interface ResultArchetype {
  id: string;
  name: string;
  subtype: string;
  emoji: string;
  color: string;
  verdict: string;
  headline: string;
  summary: string;
  why: string;
  usefulTip: string;
  bestEnvironment: string;
  avoidTrap: string;
  actionTitle: string;
  actionBody: string;
  compareCopy: string;
  shareTemplate: string;
  offerTitle: string;
  offerFit: string;
  offerPrice: string;
  offerLink: string;
  ctaLabel: string;
}

export interface ResultMetric {
  key: string;
  label: string;
  score: number;
  scoreText: string;
  description: string;
}

export interface QuizResult {
  id: string;
  name: string;
  subtype: string;
  emoji: string;
  color: string;
  verdict: string;
  headline: string;
  summary: string;
  why: string;
  usefulTip: string;
  bestEnvironment: string;
  avoidTrap: string;
  actionTitle: string;
  actionBody: string;
  compareCopy: string;
  shareTemplate: string;
  offerTitle: string;
  offerFit: string;
  offerPrice: string;
  offerLink: string;
  ctaLabel: string;
  scoreCode: string;
  overallScore: number;
  riskLevel: string;
  roastLine: string;
  utilityHeadline: string;
  utilitySummary: string;
  cardTip: string;
  shareMessages: string[];
  metrics: ResultMetric[];
  triggers: string[];
  actionPlan: string[];
}

const MIN_CODE_LENGTH = 7;
const DEFAULT_CODE = '3333333';

const resultArchetypes: ResultArchetype[] = [
  {
    id: 'trailer-only',
    name: '예고편만 화려한 사람',
    subtype: '비장한 오프너',
    emoji: '🎬',
    color: '#FF5A36',
    verdict: '결심은 블록버스터인데 첫 장면 촬영이 자꾸 밀립니다.',
    headline: '시작 전 기준이 너무 높아서, 진짜 해야 할 10분이 거대한 프로젝트처럼 느껴지는 타입.',
    summary: '해야 한다는 마음은 충분합니다. 문제는 의지가 아니라 첫 칸의 크기예요. “제대로 해야지”가 강할수록 실제 시작은 늦어집니다.',
    why: '준비와 각오가 커질수록 시작 장벽도 같이 올라갑니다. 그래서 자꾸 미루는 것처럼 보여도, 실은 시작 단위를 못 줄여서 멈추는 경우가 많습니다.',
    usefulTip: '오늘 할 일을 줄이지 말고, 시작 단위만 줄이세요. 할 일 1개보다 시작 행동 1개가 먼저 보여야 움직입니다.',
    bestEnvironment: '준비물이 이미 꺼내져 있고, 10분 안에 끝나는 첫 동작이 적혀 있을 때 가장 강합니다.',
    avoidTrap: '새 플랜, 새 다짐, 새 규칙부터 세우는 순간 다시 예고편 모드로 돌아갑니다.',
    actionTitle: '오늘 필요한 건 결심이 아니라 착수 신호',
    actionBody: '가장 미루는 일 하나만 고른 뒤, “문서 열기 / 운동복 꺼내기 / 문자 보내기”처럼 3분 안에 끝나는 첫 행동으로 바꿔 적으세요.',
    compareCopy: '겉보기엔 의욕 만렙인데 실제 스타트는 제일 늦을 수 있는 타입',
    shareTemplate: '나 {name} 나왔음. 결심은 큰데 첫 장면 촬영이 맨날 밀린대. 너도 해보고 누가 더 예고편형인지 보자.',
    offerTitle: '4권 풀 리셋 세트',
    offerFit: '이 타입은 거창한 목표보다 오늘 핵심 3칸이 먼저 보여야 움직입니다. 메아리셋의 짧은 단위 구조가 특히 잘 맞습니다.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '첫 칸부터 작게 시작하기',
  },
  {
    id: 'scroll-snare',
    name: '탭 27개 열어둔 사람',
    subtype: '주의력 유실형',
    emoji: '🫠',
    color: '#FF7A00',
    verdict: '의지가 없는 게 아니라, 시작 직전의 5분을 자꾸 폰에게 뺏깁니다.',
    headline: '할 일 앞에서 마음이 흔들리는 게 아니라 시선이 먼저 새는 타입.',
    summary: '집중력이 약하다기보다, 시작 직전 전환 장치가 약합니다. “잠깐만”이 길어지면서 오늘 리듬이 무너지는 패턴이 반복됩니다.',
    why: '사람은 가장 쉬운 자극으로 먼저 흘러갑니다. 시작 전 폰, 침대, 영상 같은 즉각 보상이 옆에 있으면 의지보다 그쪽이 이기기 쉽습니다.',
    usefulTip: '집중 의지보다 환경 차단이 먼저입니다. 손보다 눈앞의 화면을 먼저 바꾸면 시작 확률이 훨씬 올라갑니다.',
    bestEnvironment: '폰이 손 닿지 않는 곳에 있고, 시작 직후 할 화면이나 도구가 이미 열려 있을 때 강합니다.',
    avoidTrap: '할 일 시작 전에 알림 확인, 쇼츠 한 번, 침대 5분이 가장 위험합니다.',
    actionTitle: '당장 필요한 건 차단 1개 + 착수 1개',
    actionBody: '오늘 할 일 시작 전에 폰을 다른 방에 두고, 시작 화면 하나만 먼저 열어두세요. 의지보다 세팅이 먼저 먹힙니다.',
    compareCopy: '미루는 이유가 게으름이 아니라 탭 전환 속도에 있는 타입',
    shareTemplate: '나 {name} 나왔는데 “잠깐만 폰 본다”가 오늘을 먹어버리는 타입이래. 너도 해봐. 우리 둘 중 누가 더 탭 수집가냐.',
    offerTitle: '3권 실행 리듬 세트',
    offerFit: '이 타입은 “생각날 때 적기”보다 바로 눈앞에 흐름을 다시 붙여주는 구조가 필요합니다. 메아리셋의 주간-하루 연결이 도움됩니다.',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '시작 전 분산부터 끊기',
  },
  {
    id: 'sofa-cut',
    name: '귀가 후 자동 종료형',
    subtype: '소파 전원오프형',
    emoji: '🛋️',
    color: '#FF8F4A',
    verdict: '밖에서는 버티는데 문 열고 들어오는 순간 오늘이 종료됩니다.',
    headline: '피곤해서 쉬는 게 아니라, 쉬기 시작한 뒤 다시 올라오는 루트가 약한 타입.',
    summary: '체력이 없어서만은 아닙니다. 문제는 집 도착 직후 전환 신호예요. 한번 눕고 나면 해야 할 일들이 갑자기 너무 크게 느껴집니다.',
    why: '행동은 시작 타이밍의 마찰에 크게 좌우됩니다. 귀가 직후 아무 신호가 없으면 가장 편한 선택으로 흐르기 쉽습니다.',
    usefulTip: '집에 들어간 뒤 3분 루틴 하나만 고정하세요. 눕기 전에 물, 세안, 책상 착석 중 하나라도 먼저 박으면 결과가 달라집니다.',
    bestEnvironment: '귀가 직후 해야 할 첫 행동이 고정돼 있고, 소파보다 책상이나 테이블이 먼저 눈에 들어올 때 강합니다.',
    avoidTrap: '가방 놓고 눕기, 옷 갈아입기 전에 영상 틀기, 저녁 먹으며 폰 보기.',
    actionTitle: '퇴근 후 리셋 스위치를 따로 만들어야 합니다',
    actionBody: '오늘 집에 들어가면 바로 물 한 잔 마시고, 5분짜리 일 하나만 적으세요. 핵심은 많이 하기보다 꺼지지 않는 겁니다.',
    compareCopy: '밖에선 멀쩡한데 집 문 열면 게임 종료되는 타입',
    shareTemplate: '나 {name} 나왔음. 밖에서는 인간인데 집 가면 자동 종료된대. 너도 해봐. 우리 둘 중 누가 더 소파한테 지는지 보자.',
    offerTitle: '4권 풀 리셋 세트',
    offerFit: '흐름이 자주 끊기는 사람일수록 다시 붙는 구조가 필요합니다. 메아리셋은 하루를 다시 여는 기준을 짧게 잡기 좋습니다.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '귀가 후 꺼지지 않기',
  },
  {
    id: 'three-week',
    name: '3주 반짝 부스터',
    subtype: '유지력 누수형',
    emoji: '✨',
    color: '#F2B100',
    verdict: '불 붙는 속도는 빠른데 유지 장치가 약해서, 늘 비슷한 구간에서 조용해집니다.',
    headline: '못하는 사람이 아니라 초반 돌진 뒤 중반 유지가 비는 타입.',
    summary: '시작 에너지는 충분합니다. 다만 한 번 어긋났을 때 복구 규칙이 없어서 흐름이 통째로 끊기곤 합니다.',
    why: '습관은 열정보다 재시작 구조에 더 크게 좌우됩니다. 하루 놓쳤을 때 바로 돌아오는 장치가 없으면 초반 속도도 오래 못 갑니다.',
    usefulTip: '유지의 핵심은 완벽 수행이 아니라 끊겨도 24시간 안에 복귀하는 규칙입니다.',
    bestEnvironment: '주간 기준이 명확하고, 놓친 날이 생겨도 다시 체크할 자리가 남아 있을 때 오래 갑니다.',
    avoidTrap: '초반 과몰입, 하루 놓치면 올스톱, “다음 주부터 다시” 선언.',
    actionTitle: '이 타입은 잘하기보다 끊기지 않기가 먼저입니다',
    actionBody: '이번 주 목표를 성과가 아니라 복귀 속도로 잡으세요. 하루 놓치면 다음 날 가장 작은 버전으로 다시 붙는 규칙을 먼저 만드세요.',
    compareCopy: '처음엔 제일 열심히 하는데 4주차에 흔적이 사라지기 쉬운 타입',
    shareTemplate: '나 {name} 나왔음. 초반은 미친 듯이 달리는데 4주차에 증발하는 타입이래. 너도 해봐. 우리 둘 중 누가 더 반짝 부스터냐.',
    offerTitle: '2권 유지 부스터',
    offerFit: '이 타입은 새 계획보다 재시작 장치가 중요합니다. 메아리셋은 끊겨도 다시 이어가는 구조가 보여서 잘 맞습니다.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '유지 장치 붙이기',
  },
  {
    id: 'duo-engine',
    name: '약속 잡히면 살아나는 사람',
    subtype: '함께 선명형',
    emoji: '🤝',
    color: '#6DBA57',
    verdict: '혼자선 흐릿해도 누가 같이 보기 시작하면 바로 속도가 붙습니다.',
    headline: '의지가 약한 게 아니라 외부 체크포인트가 있어야 선명해지는 타입.',
    summary: '누가 보느냐, 같이 하느냐에 따라 실행력이 크게 달라집니다. 이건 약점이라기보다 당신이 잘 움직이는 조건을 아는 문제에 가깝습니다.',
    why: '사람은 누군가와 약속하거나 결과를 보여줄 상황에서 실행률이 확실히 올라갑니다. 혼자 버티는 방식이 안 맞을 뿐입니다.',
    usefulTip: '이 타입은 비밀 결심보다 공개 일정이 훨씬 강합니다. 공유 가능한 체크포인트를 일부러 만들수록 성과가 납니다.',
    bestEnvironment: '약속, 공동 체크, 데드라인 공유, 결과 캡처처럼 외부 반응이 붙는 환경.',
    avoidTrap: '혼자 조용히 버티기, 애매한 일정, “나중에 답할게” 상태로 두기.',
    actionTitle: '당신은 의지가 아니라 공개성이 먹히는 타입입니다',
    actionBody: '오늘 안에 한 명에게 “이번 주 이거 하나만 서로 체크하자”라고 보내세요. 혼자만의 결심보다 바로 효과가 납니다.',
    compareCopy: '혼자선 안 되는데 같이 보기 시작하면 갑자기 잘하는 타입',
    shareTemplate: '나 {name} 나왔음. 혼자선 흐릿한데 같이 하면 갑자기 잘하는 타입이래. 너도 해봐. 우리 둘이 같이 하면 누가 더 오래 가는지 보자.',
    offerTitle: '2권 유지 부스터',
    offerFit: '서로 같은 구조를 보면서 체크하기 좋은 방식이 이 타입에 맞습니다. 메아리셋은 함께 보기 쉬운 주간 흐름이 강점입니다.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '같이 보는 구조 만들기',
  },
  {
    id: 'steady-core',
    name: '은근히 시스템 있는 사람',
    subtype: '조용한 유지형',
    emoji: '💎',
    color: '#58C4DD',
    verdict: '이미 꽤 잘하고 있고, 교정보다 확장이 필요한 쪽에 가깝습니다.',
    headline: '무작정 열심히 하기보다 되는 루트를 슬쩍 알고 있는 상위권 타입.',
    summary: '기본 루틴과 자기 조절 감각이 있습니다. 문제를 새로 고치기보다 잘되는 패턴을 오래 남기는 편이 훨씬 중요합니다.',
    why: '이미 돌아가는 구조가 있는 사람은 더 세게 다잡는 것보다 기록과 회고 밀도를 높일 때 효율이 큽니다.',
    usefulTip: '새 규칙을 추가하기보다, 이미 잘되는 루틴을 눈에 보이게 남기세요. 유지의 복리가 붙습니다.',
    bestEnvironment: '주간 기준, 완료 체크, 짧은 복기가 있는 환경. 이미 있는 루틴을 더 선명하게 볼수록 강해집니다.',
    avoidTrap: '욕심 때문에 루틴을 과하게 늘리기, 잘하고도 체감 못 해서 방향을 바꾸기.',
    actionTitle: '지금 필요한 건 교정이 아니라 축적입니다',
    actionBody: '이번 주 유지할 루틴 1개와 더 키울 루틴 1개만 나란히 적어보세요. 새로운 결심보다 지금 흐름을 확장하는 쪽이 맞습니다.',
    compareCopy: '겉으로 티는 안 나는데 시스템이 이미 조금 깔려 있는 타입',
    shareTemplate: '나 {name} 나왔음. 의지로 버티는 사람보다 시스템 살짝 깔린 타입이래. 너도 해봐. 우리 둘 중 누가 더 조용한 실전파인지 보자.',
    offerTitle: '1권 스타트 에디션',
    offerFit: '이미 기본기가 있는 사람은 기록 밀도만 높여도 체감이 큽니다. 메아리셋이 흐름을 더 또렷하게 남겨줍니다.',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '잘되는 흐름 확장하기',
  },
];

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clampScore(score: number) {
  return Math.max(1, Math.min(4, score));
}

function scoreText(score: number) {
  if (score >= 3.5) return '매우 높음';
  if (score >= 2.8) return '높음';
  if (score >= 2.1) return '보통';
  return '낮음';
}

function getArchetypeById(typeId?: string | null) {
  return resultArchetypes.find((item) => item.id === typeId) ?? resultArchetypes[0];
}

function getFallbackAnswersFromArchetype(typeId?: string | null) {
  switch (typeId) {
    case 'scroll-snare':
      return [3, 4, 4, 3, 3, 3, 2];
    case 'sofa-cut':
      return [3, 3, 2, 3, 3, 4, 2];
    case 'three-week':
      return [2, 2, 2, 2, 2, 4, 3];
    case 'duo-engine':
      return [2, 2, 2, 2, 1, 2, 2];
    case 'steady-core':
      return [1, 1, 1, 1, 2, 1, 2];
    case 'trailer-only':
    default:
      return [4, 3, 3, 4, 3, 3, 4];
  }
}

export function encodeAnswerCode(answers: number[]) {
  return answers
    .slice(0, MIN_CODE_LENGTH)
    .map((value) => String(clampScore(value)))
    .join('');
}

export function decodeAnswerCode(code?: string | null) {
  if (!code) return null;
  if (!/^[1-4]+$/.test(code)) return null;
  if (code.length < MIN_CODE_LENGTH) return null;
  return code
    .slice(0, MIN_CODE_LENGTH)
    .split('')
    .map((char) => Number(char));
}

function buildMetrics(answers: number[]): ResultMetric[] {
  const [mind, morning, start, prep, social, planner, heat] = answers;

  const startThreshold = average([mind, prep, heat]);
  const distractionRisk = average([morning, start]);
  const consistencyDrop = average([planner, heat]);
  const socialBoost = 5 - social;

  return [
    {
      key: 'start',
      label: '시작 장벽',
      score: startThreshold,
      scoreText: scoreText(startThreshold),
      description: startThreshold >= 3
        ? '첫 칸이 커 보이면 바로 멈추는 편입니다.'
        : '첫 칸만 보이면 꽤 잘 들어가는 편입니다.',
    },
    {
      key: 'focus',
      label: '주의 분산',
      score: distractionRisk,
      scoreText: scoreText(distractionRisk),
      description: distractionRisk >= 3
        ? '폰, 침대, 딴짓이 시작 직전 시간을 자주 뺏습니다.'
        : '분산보다 착수 흐름이 비교적 안정적인 편입니다.',
    },
    {
      key: 'consistency',
      label: '유지력 누수',
      score: consistencyDrop,
      scoreText: scoreText(consistencyDrop),
      description: consistencyDrop >= 3
        ? '초반엔 해도 유지 구간에서 흐려질 위험이 큽니다.'
        : '유지 구간도 비교적 버티는 편입니다.',
    },
    {
      key: 'social',
      label: '외부 자극 효율',
      score: socialBoost,
      scoreText: scoreText(socialBoost),
      description: socialBoost >= 3
        ? '혼자보다 같이 보거나 약속 잡힐 때 훨씬 잘 움직입니다.'
        : '외부 자극 없이도 혼자 진행하는 힘이 있습니다.',
    },
  ];
}

function selectArchetype(answers: number[]) {
  const [mind, morning, start, prep, social, planner, heat] = answers;

  const overallRisk = average(answers);
  const startRisk = average([mind, prep, heat]);
  const distractionRisk = average([morning, start]);
  const consistencyRisk = average([planner, heat]);
  const socialBoost = 5 - social;

  if (overallRisk <= 1.8) {
    return getArchetypeById('steady-core');
  }

  if (socialBoost >= 3.6 && overallRisk <= 3.1) {
    return getArchetypeById('duo-engine');
  }

  if (startRisk >= 3.35 && heat >= 3) {
    return getArchetypeById('trailer-only');
  }

  if (distractionRisk >= 3.2) {
    return getArchetypeById('scroll-snare');
  }

  if (morning >= 3 && planner >= 3) {
    return getArchetypeById('sofa-cut');
  }

  if (consistencyRisk >= 3) {
    return getArchetypeById('three-week');
  }

  if (overallRisk <= 2.3) {
    return getArchetypeById('steady-core');
  }

  if (socialBoost >= 3.1) {
    return getArchetypeById('duo-engine');
  }

  return getArchetypeById('sofa-cut');
}

function getRiskLevel(overallRisk: number) {
  if (overallRisk >= 3.4) return '리셋 시급';
  if (overallRisk >= 2.7) return '패턴 교정 필요';
  if (overallRisk >= 2.1) return '조정하면 확 달라짐';
  return '이미 기반 있음';
}

function buildRoastLine(archetype: ResultArchetype, metrics: ResultMetric[]) {
  const topMetric = [...metrics].sort((a, b) => b.score - a.score)[0];

  switch (topMetric.key) {
    case 'start':
      return `한 줄 요약: ${archetype.name}의 문제는 의지 부족보다 첫 칸이 거대한 척하는 데 있습니다.`;
    case 'focus':
      return `한 줄 요약: 당신의 하루는 대형 실패보다 “잠깐만” 한 번에 더 자주 무너집니다.`;
    case 'consistency':
      return `한 줄 요약: 초반 에너지보다 중간 복귀 규칙이 지금 더 중요합니다.`;
    case 'social':
      return `한 줄 요약: 혼자 버티는 법보다 같이 보이게 만드는 법이 더 잘 먹히는 타입입니다.`;
    default:
      return `한 줄 요약: ${archetype.verdict}`;
  }
}

function buildUtilityHeadline(metrics: ResultMetric[]) {
  const topMetric = [...metrics].sort((a, b) => b.score - a.score)[0];

  switch (topMetric.key) {
    case 'start':
      return '오늘 바꿔야 할 핵심은 목표가 아니라 시작 단위입니다';
    case 'focus':
      return '오늘 결과를 바꾸는 건 의지가 아니라 전환 환경입니다';
    case 'consistency':
      return '지금 필요한 건 몰입보다 복귀 장치입니다';
    case 'social':
      return '이 타입은 공개된 약속이 조용한 결심보다 강합니다';
    default:
      return '결과를 바꾸는 건 거창한 결심보다 작은 구조입니다';
  }
}

function buildUtilitySummary(archetype: ResultArchetype, metrics: ResultMetric[]) {
  const topMetric = [...metrics].sort((a, b) => b.score - a.score)[0];

  return `${topMetric.label}이(가) 가장 크게 잡혔습니다. ${archetype.usefulTip}`;
}

function buildCardTip(metrics: ResultMetric[]) {
  const urgent = metrics.find((metric) => metric.score >= 3.2);
  if (urgent) {
    return `${urgent.label}만 먼저 손보면 체감이 가장 빨리 옵니다.`;
  }
  return '전체적으로 나쁘지 않습니다. 잘되는 패턴을 더 선명하게 남기는 쪽이 맞습니다.';
}

function buildTriggers(archetype: ResultArchetype, answers: number[]) {
  const [mind, morning, start, , social, planner] = answers;
  const base = [archetype.avoidTrap];

  if (mind >= 3) base.push('일 시작 전에 기준부터 높여 잡는 순간');
  if (morning >= 3 || start >= 3) base.push('폰 확인이나 침대 5분이 끼어드는 순간');
  if (planner >= 3) base.push('하루 빠졌다고 통째로 다음 주로 넘기는 순간');
  if (social >= 3) base.push('답장을 미뤄서 일정이 흐려지는 순간');

  return Array.from(new Set(base)).slice(0, 4);
}

function buildActionPlan(archetype: ResultArchetype, metrics: ResultMetric[]) {
  const topMetric = [...metrics].sort((a, b) => b.score - a.score)[0];

  const basePlan = [
    `1단계. ${archetype.actionBody}`,
    `2단계. ${topMetric.label}이 흔들리는 시간대를 하나 정해서 미리 방어하세요.`,
    `3단계. 오늘 밤에는 결과를 복기하지 말고, 내일 첫 행동 한 줄만 남기세요.`,
  ];

  if (topMetric.key === 'social') {
    basePlan[1] = '2단계. 혼자 하려 하지 말고 오늘 안에 한 명에게 체크 메시지를 보내세요.';
  }

  return basePlan;
}

export function analyzeAnswers(answers: number[]): QuizResult {
  const normalizedAnswers =
    answers.length >= MIN_CODE_LENGTH
      ? answers.slice(0, MIN_CODE_LENGTH).map(clampScore)
      : getFallbackAnswersFromArchetype();

  const archetype = selectArchetype(normalizedAnswers);
  const metrics = buildMetrics(normalizedAnswers);
  const overallScore = average(normalizedAnswers);
  const shareTemplate = archetype.shareTemplate.replace('{name}', archetype.name);

  return {
    id: archetype.id,
    name: archetype.name,
    subtype: archetype.subtype,
    emoji: archetype.emoji,
    color: archetype.color,
    verdict: archetype.verdict,
    headline: archetype.headline,
    summary: archetype.summary,
    why: archetype.why,
    usefulTip: archetype.usefulTip,
    bestEnvironment: archetype.bestEnvironment,
    avoidTrap: archetype.avoidTrap,
    actionTitle: archetype.actionTitle,
    actionBody: archetype.actionBody,
    compareCopy: archetype.compareCopy,
    shareTemplate,
    offerTitle: archetype.offerTitle,
    offerFit: archetype.offerFit,
    offerPrice: archetype.offerPrice,
    offerLink: archetype.offerLink,
    ctaLabel: archetype.ctaLabel,
    scoreCode: encodeAnswerCode(normalizedAnswers),
    overallScore,
    riskLevel: getRiskLevel(overallScore),
    roastLine: buildRoastLine(archetype, metrics),
    utilityHeadline: buildUtilityHeadline(metrics),
    utilitySummary: buildUtilitySummary(archetype, metrics),
    cardTip: buildCardTip(metrics),
    shareMessages: [
      shareTemplate,
      `${archetype.compareCopy}. 난 ${archetype.name} 나왔음. 너도 해봐.`,
      `${archetype.actionTitle}. 근데 결과가 너무 웃겨서 공유함. 난 ${archetype.name}.`,
    ],
    metrics,
    triggers: buildTriggers(archetype, normalizedAnswers),
    actionPlan: buildActionPlan(archetype, metrics),
  };
}

export function buildResultFromCode(code?: string | null, typeId?: string | null) {
  const decoded = decodeAnswerCode(code);
  if (decoded) {
    return analyzeAnswers(decoded);
  }

  return analyzeAnswers(getFallbackAnswersFromArchetype(typeId));
}

export function getResultTypeById(typeId?: string | null) {
  return buildResultFromCode(null, typeId);
}

export function getResultType(score: number) {
  if (score >= 24) return getResultTypeById('trailer-only');
  if (score >= 20) return getResultTypeById('scroll-snare');
  if (score >= 17) return getResultTypeById('sofa-cut');
  if (score >= 14) return getResultTypeById('three-week');
  if (score >= 11) return getResultTypeById('duo-engine');
  return getResultTypeById('steady-core');
}

export const defaultResultCode = DEFAULT_CODE;
