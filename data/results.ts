export interface ResultType {
  id: string;
  name: string;
  level: string;
  emoji: string;
  description: string;
  detail: string;
  science: string;
  bridge: string;
  challenge: string;
  offerTitle: string;
  offerFit: string;
  offerPrice: string;
  offerLink: string;
  ctaLabel: string;
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
    bridge: '당신은 의지를 더 쥐어짜기보다, 시작 장벽을 낮춰주는 구조가 먼저 필요한 타입이에요.',
    challenge: '이번 주 미션 — 매일 아침 "오늘 할 일" 딱 1개만 적기',
    offerTitle: '4시즌 풀 리셋',
    offerFit: '한 번에 다 바꾸려다 무너지는 편이라면, 크게 흔들리지 않게 루틴 틀부터 깔아주는 구성이 더 잘 맞아요.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '내 루틴 틀부터 깔기',
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
    bridge: '당신은 결심의 세기보다, 몸이 먼저 움직이게 만드는 배치와 흐름이 중요한 타입이에요.',
    challenge: '이번 주 미션 — 소파 앉기 전에 스트레칭 딱 1분만',
    offerTitle: '4시즌 풀 리셋',
    offerFit: '앉아버리면 멈추기 어려운 타입이라서, 행동 전환 포인트를 자주 만들어주는 구성이 잘 맞아요.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '움직이게 만드는 플래너 보기',
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
    bridge: '당신은 동기 폭발 순간을 붙잡기보다, 다음 날 아침까지 이어지는 연결 장치가 필요한 타입이에요.',
    challenge: '이번 주 미션 — 새벽 계획은 메모만, 실행은 내일 아침에',
    offerTitle: '3시즌 세트',
    offerFit: '밤의 의욕이 아침 실행으로 이어지게 하려면, 짧은 루틴 단위로 끊어주는 구성이 효율적이에요.',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '새벽 결심을 루틴으로 바꾸기',
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
    bridge: '당신은 계획이 이미 충분해서, 실행으로 넘어가게 밀어주는 작은 단위의 구조가 필요한 타입이에요.',
    challenge: '이번 주 미션 — 계획 세우는 시간의 반을 실행에 쓰기',
    offerTitle: '3시즌 세트',
    offerFit: '크게 짜는 건 잘하는 편이라서, 실제 행동을 쪼개서 바로 시작하게 돕는 구성이 잘 맞아요.',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '계획 말고 실행부터 시작하기',
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
    bridge: '당신은 시작 에너지는 충분하니, 꺾이는 시점을 버티게 해주는 유지 장치가 필요한 타입이에요.',
    challenge: '이번 주 미션 — 뭐든 하나 골라서 4주차까지 버텨보기',
    offerTitle: '2시즌 세트',
    offerFit: '초반 열정은 강하지만 유지 구간이 약해서, 부담 없이 이어가기 좋은 분량 구성이 잘 맞아요.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '3주 뒤에도 남는 루틴 만들기',
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
    bridge: '당신은 혼자 버티기보다, 약속과 체크 포인트가 있는 구조에서 훨씬 잘 움직이는 타입이에요.',
    challenge: '이번 주 미션 — 친구 1명한테 "같이 뭐 하자" 보내기',
    offerTitle: '2시즌 세트',
    offerFit: '외부 자극이 있을 때 훨씬 잘 되는 편이라, 중간중간 확인하며 끌고 갈 수 있는 구성이 잘 맞아요.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '혼자 안 무너지게 시작하기',
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
    bridge: '당신은 기본 체력은 충분해서, 마무리까지 끌고 가는 체크 구조만 더해지면 훨씬 안정적인 타입이에요.',
    challenge: '이번 주 미션 — 매일 밤 내일 할 일 3개 적고, 다 하면 체크!',
    offerTitle: '1시즌 체험',
    offerFit: '거의 다 되는 편이라서, 마지막 한 끗을 놓치지 않게 정리해주는 가벼운 구성이 잘 맞아요.',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '마지막 5%까지 끝내기',
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
    bridge: '당신은 이미 루틴 감각이 있는 편이라, 그 흐름을 더 오래 유지하고 확장하는 도구가 잘 맞는 타입이에요.',
    challenge: '이번 주 미션 — 내 루틴을 누군가한테 자랑하기',
    offerTitle: '1시즌 체험',
    offerFit: '기초가 잡혀 있는 편이라서, 흐름을 더 단단하게 유지하고 넓혀가는 가벼운 구성이 잘 맞아요.',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '지금 루틴 더 단단하게 만들기',
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
