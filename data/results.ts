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
    description: '"내일의 나는 분명 다를 거야" (매일 반복)',
    detail: '"내일부터 한다"가 인생 좌우명. 근데 그 내일은 절대 안 와요. 하지만 당신은 전설이니까 괜찮아요. 전설은 원래 남다르거든요.',
    science: '목표를 손으로 적으면 달성률이 42% 올라가요. 적기만 하면 돼요, 진짜로.',
    percentage: 8,
    challenge: '이번 주 미션 — 매일 아침 "오늘 할 일" 딱 1개만 적기',
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
    description: '"일어나야 하는 건 아는데... 쿠션이 너무 좋아"',
    detail: '당신과 소파 사이엔 만유인력 이상의 힘이 작용합니다. 리모컨이 손에 착 감기는 건 운명이에요. 일단 앉으면 끝.',
    science: '운동복을 베개 옆에 두면 운동 시작 확률이 3배! 환경이 의지를 이겨요.',
    percentage: 15,
    challenge: '이번 주 미션 — 소파 앉기 전에 스트레칭 딱 1분만',
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
    description: '"밤엔 뭐든 할 수 있을 것 같은데... 아침엔 기억이 없음"',
    detail: '밤 12시만 되면 갑자기 인생 계획 세우고, 운동 앱 깔고, 영어 공부 시작해요. 근데 아침 되면 전부 리셋. 매일 밤 새 인생 시작하는 사람.',
    science: '의지력은 아침에 가장 높아요. 새벽 결심은 메모만 하고, 실행은 아침에!',
    percentage: 18,
    challenge: '이번 주 미션 — 새벽 계획은 메모만, 실행은 내일 아침에',
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
    description: '"계획 세우는 거까지가 내 일이고, 실행은 미래의 내 일"',
    detail: '색깔별 형광펜, 타임라인, 마일스톤까지 완벽. 근데 실행률 0%. 계획 세우는 것 자체가 너무 만족스러운 거예요. 그게 함정.',
    science: '2분 안에 끝나는 일은 바로 하세요. 작은 실행 1개가 완벽한 계획 100개보다 나아요.',
    percentage: 20,
    challenge: '이번 주 미션 — 계획 세우는 시간의 반을 실행에 쓰기',
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
    description: '"시작은 항상 화려한데... 3주차에 증발함"',
    detail: '새해 다짐, 월요일 리셋, 생일 각오... 매번 열정 폭발하다가 3주쯤 사라져요. 근데 3주나 한 거 대단한 거예요, 진짜로.',
    science: '습관이 만들어지려면 평균 66일 걸려요. 3주는 시작일 뿐! 포기하기엔 이르다.',
    percentage: 18,
    challenge: '이번 주 미션 — 뭐든 하나 골라서 4주차까지 버텨보기',
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
    description: '"혼자 = 불가능, 같이 = 왜 되지?"',
    detail: '혼자면 소파에 흡수되는데, 누군가랑 약속 잡으면 의외로 해내요. 약속 어기는 게 귀찮아서 하는 거지만, 어쨌든 하긴 하잖아요.',
    science: '같이 운동하면 지속률이 95% 올라가요. 혼자 하지 마세요!',
    percentage: 12,
    challenge: '이번 주 미션 — 친구 1명한테 "같이 뭐 하자" 보내기',
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
    description: '"95%까지 갔는데 마무리가 늘 아쉬움"',
    detail: '거의 다 해내는데 마지막 5%에서 흐지부지. 가끔 넘어지지만 다시 일어나요. 시스템 하나만 잡으면 완벽해질 사람.',
    science: '체크리스트 쓰면 완수율이 25% 올라가요. 적고 체크하는 것만으로 달라져요.',
    percentage: 6,
    challenge: '이번 주 미션 — 매일 밤 내일 할 일 3개 적고, 다 하면 체크!',
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
    description: '"잘 하고 있으면서 불안한 사람 = 당신"',
    detail: '이 결과 나올 확률 3%. 의지력이 아니라 시스템으로 움직이는 사람이에요. 이미 충분히 잘하고 있어요. 본인만 모를 뿐.',
    science: '자기 효능감 높은 사람은 새 도전 성공률이 2배예요. 자신감 가지세요!',
    percentage: 3,
    challenge: '이번 주 미션 — 내 루틴을 누군가한테 자랑하기',
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
