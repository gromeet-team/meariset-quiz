export interface ResultType {
  id: string;
  name: string;
  level: string;
  emoji: string;
  description: string;
  detail: string;
  science: string;
  percentage: number;
  challenge: string;
  offerTitle: string;
  offerPrice: string;
  offerLink: string;
  color: string;
  minScore: number;
  maxScore: number;
}

export const resultTypes: ResultType[] = [
  {
    id: 'legend',
    name: '전설의 미루기 장인',
    level: 'Lv.5',
    emoji: '👑',
    description: '미루기계의 끝판왕. 당신은 이미 전설입니다.',
    detail: '당신의 전두엽은 현재 장기 휴가 중입니다. "내일부터 한다"가 당신의 인생 좌우명이며, 그 내일은 영원히 오지 않습니다. 하지만 괜찮아요. 전설은 원래 좀 다르니까요.',
    science: '연구에 따르면, 목표를 손으로 적으면 달성률이 42% 올라갑니다. 적기만 하면 돼요!',
    percentage: 8,
    challenge: '이번 주 딱 하나만 — 매일 아침 오늘 할 일 딱 1개만 적기',
    offerTitle: '4시즌 풀 리셋',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FF4444',
    minScore: 27,
    maxScore: 28,
  },
  {
    id: 'sofa',
    name: '소파와 한 몸',
    level: 'Lv.4',
    emoji: '🛋️',
    description: '소파가 당신의 안식처이자 왕좌입니다.',
    detail: '당신과 소파 사이에는 만유인력 이상의 힘이 작용합니다. 일어나야 한다는 건 알지만, 쿠션이 너무 편합니다. TV 리모컨이 손에 착 감기는 건 운명이에요.',
    science: '환경 설계가 의지력보다 3배 효과적입니다. 운동복을 베개 옆에 놓아보세요.',
    percentage: 15,
    challenge: '이번 주 딱 하나만 — 소파에 앉기 전 스트레칭 1분',
    offerTitle: '4시즌 풀 리셋',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FF4444',
    minScore: 24,
    maxScore: 26,
  },
  {
    id: 'midnight',
    name: '새벽 3시 의지왕',
    level: 'Lv.3',
    emoji: '🌙',
    description: '밤에만 의지가 불타오르는 야행성 파이터.',
    detail: '낮에는 게으르지만 새벽에는 갑자기 인생 계획을 세우고, 운동 앱을 다운받고, 외국어 공부를 시작합니다. 물론 아침이 오면 모든 건 리셋.',
    science: '의지력은 아침에 가장 높고 밤에 가장 낮습니다. 중요한 결정은 오전에 하세요.',
    percentage: 18,
    challenge: '이번 주 딱 하나만 — 새벽 계획은 메모만, 실행은 아침에',
    offerTitle: '3시즌 세트',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FF8C00',
    minScore: 21,
    maxScore: 23,
  },
  {
    id: 'planner',
    name: '계획서만 A+',
    level: 'Lv.3',
    emoji: '📋',
    description: '계획은 완벽한데 실행은 어디 갔나요.',
    detail: '당신의 계획서는 아름답습니다. 색깔별 형광펜, 타임라인, 마일스톤까지. 다만 실행률이 0%에 수렴하는 게 유일한 단점. 계획을 세우는 것 자체가 만족감을 주거든요.',
    science: '작은 행동 하나가 완벽한 계획 100개보다 낫습니다. 2분 규칙을 시도해보세요.',
    percentage: 20,
    challenge: '이번 주 딱 하나만 — 계획 세우는 시간의 반만 실행에 쓰기',
    offerTitle: '3시즌 세트',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FF8C00',
    minScore: 18,
    maxScore: 20,
  },
  {
    id: 'threeweek',
    name: '3주 반짝러',
    level: 'Lv.2',
    emoji: '✨',
    description: '시작은 화려하지만 3주가 고비.',
    detail: '새해 다짐, 월요일 시작, 생일 리셋... 매번 열정적으로 시작하지만 3주차쯤 열정이 식습니다. 근데 3주나 하신 거 대단한 거예요. 진짜로.',
    science: '습관 형성에는 평균 66일이 걸립니다. 3주는 시작일 뿐이에요. 포기하지 마세요!',
    percentage: 18,
    challenge: '이번 주 딱 하나만 — 작심 3주 넘기기 도전 (아무거나 하나)',
    offerTitle: '2시즌 세트',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FFD700',
    minScore: 15,
    maxScore: 17,
  },
  {
    id: 'together',
    name: '같이하면 되는 사람',
    level: 'Lv.2',
    emoji: '🤝',
    description: '혼자는 어렵지만 같이하면 해내는 팀플레이어.',
    detail: '당신에게는 함께하는 동료가 필요합니다. 혼자서는 소파로 흡수되지만, 누군가와 약속을 잡으면 의외로 해냅니다. 사회적 의지력이 강한 유형이에요.',
    science: '운동을 함께할 때 지속률이 95% 증가합니다. 파트너를 찾으세요!',
    percentage: 12,
    challenge: '이번 주 딱 하나만 — 친구 한 명과 작은 약속 잡기',
    offerTitle: '2시즌 세트',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#FFD700',
    minScore: 12,
    maxScore: 14,
  },
  {
    id: 'almost',
    name: '거의 다 된 사람',
    level: 'Lv.1',
    emoji: '🔥',
    description: '조금만 더 하면 갓생러. 거의 다 왔어요!',
    detail: '당신은 이미 80%쯤 왔습니다. 가끔 넘어지지만 다시 일어나는 회복탄력성이 있어요. 작은 시스템만 갖추면 완전한 갓생러로 진화할 수 있습니다.',
    science: '체크리스트를 사용하면 목표 완수율이 25% 향상됩니다. 매일 체크해보세요.',
    percentage: 6,
    challenge: '이번 주 딱 하나만 — 매일 밤 내일 할 일 3개 체크리스트 작성',
    offerTitle: '1시즌 체험',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#44CC44',
    minScore: 9,
    maxScore: 11,
  },
  {
    id: 'hidden',
    name: '숨겨진 갓생러',
    level: 'Lv.1',
    emoji: '💎',
    description: '의지박약? 당신은 이미 갓생러입니다.',
    detail: '이 테스트에서 이 결과가 나올 확률은 3%입니다. 당신은 의지력이 아니라 시스템으로 움직이는 사람이에요. 이미 충분히 잘하고 있습니다. 본인만 모르고 있을 뿐.',
    science: '자기 효능감이 높은 사람은 새로운 도전에 성공할 확률이 2배입니다.',
    percentage: 3,
    challenge: '이번 주 딱 하나만 — 누군가에게 당신의 루틴 공유하기',
    offerTitle: '1시즌 체험',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    color: '#44CC44',
    minScore: 7,
    maxScore: 8,
  },
];

export function getResultType(score: number): ResultType {
  const clamped = Math.max(7, Math.min(28, score));
  const result = resultTypes.find(
    (r) => clamped >= r.minScore && clamped <= r.maxScore
  );
  return result || resultTypes[resultTypes.length - 1];
}
