export interface ResultType {
  id: string;
  name: string;
  subtype: string;
  level: string;
  emoji: string;
  description: string;
  headline: string;
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
    subtype: '시작각 재단사',
    level: 'Lv.5',
    emoji: '👑',
    description: '할 마음은 늘 큰데 시작 버튼이 자꾸 내일로 밀리는 타입',
    headline: '마음은 이미 우승인데 시작칸이 너무 큽니다.',
    detail: '당신은 게을러서라기보다 시작 기준이 너무 높아요. “이번엔 제대로 해야지” 하고 판을 크게 벌리다 보니 첫 칸 자체가 부담이 됩니다. 그래서 하루가 밀릴수록 의지 문제처럼 느껴지지만, 실제로는 오늘 딱 할 만큼만 보이게 만드는 구조가 부족해서 자주 멈추는 편에 가까워요.',
    science: '사람은 목표가 크고 모호할수록 시작을 늦추고, 첫 행동이 구체적일수록 훨씬 빨리 움직여요. “운동해야지”보다 “운동복 꺼내기”가 쉬운 이유도 그거예요.',
    bridge: '메아리셋은 거창한 다짐보다 오늘 핵심 3칸을 먼저 보이게 해줘요. 90일 목표를 하루 할 일로 낮춰서, 의지로 버티는 대신 바로 체크할 구조를 만들어줍니다.',
    challenge: '오늘 해야 하는 일 중 제일 미루는 1개만 적고, 그 앞단계 1칸(예: 파일 열기, 운동복 꺼내기)만 바로 체크하세요.',
    offerTitle: '4권 풀 리셋 세트',
    offerFit: '한 번 놓치면 통째로 포기하는 편이라면, 다시 시작 버튼이 자주 오는 4권 구성이 유리해요. 메아리셋은 분기마다 리셋하면서 흐름을 다시 붙이기 좋습니다.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '오늘 한 칸부터 붙잡기',
    color: '#FF4444',
    minScore: 27,
    maxScore: 28,
  },
  {
    id: 'sofa',
    name: '소파와 한 몸',
    subtype: '귀가 후 전원오프형',
    level: 'Lv.4',
    emoji: '🛋️',
    description: '피곤한 건 맞는데, 쉬기 시작하면 너무 길어지는 타입',
    headline: '집에 들어가는 순간 오늘 모드가 자동 종료됩니다.',
    detail: '퇴근 후나 집에 도착한 직후에 흐름이 자주 끊겨요. 문제는 게으름보다 전환 타이밍입니다. 일단 눕고 나면 할 일 하나도 크게 느껴지고, “5분만”이 40분으로 불어나죠. 이 타입은 더 독하게 마음먹기보다, 멈추기 전에 다음 행동이 눈에 보여야 합니다.',
    science: '행동은 의지보다 바로 보이는 다음 행동의 영향을 많이 받아요. 준비물이 눈앞에 있고 순서가 정해져 있으면 시작 확률이 훨씬 올라갑니다.',
    bridge: '메아리셋은 집에 오자마자 뭘 할지 다시 고민하지 않게 오늘 한 칸을 먼저 꺼내주는 플래너예요. 멈춘 뒤 끌어올리기보다, 멈추기 전에 다음 걸 고르게 도와줍니다.',
    challenge: '오늘 집에 들어가면 눕기 전에 물 한 잔 마시고, 5분 안에 끝낼 일 1개만 적어보세요.',
    offerTitle: '4권 풀 리셋 세트',
    offerFit: '하루 흐름이 자주 무너지는 타입은 리듬을 여러 번 다시 잡을 수 있는 4권 구성이 잘 맞아요. 계절 바뀔 때마다 다시 세팅하기 좋습니다.',
    offerPrice: '89,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '눕기 전 한 칸 만들기',
    color: '#FF4444',
    minScore: 24,
    maxScore: 26,
  },
  {
    id: 'midnight',
    name: '새벽 3시 의지왕',
    subtype: '야심 저장 누락형',
    level: 'Lv.3',
    emoji: '🌙',
    description: '밤엔 완벽한데 아침 되면 그 결심이 흐려지는 타입',
    headline: '새벽 결심은 선명한데 오전의 내가 못 이어받습니다.',
    detail: '밤에 집중이 잘되고 계획도 잘 세워요. 그런데 그 에너지가 다음 날 오전 행동으로는 잘 안 이어집니다. 의지가 없는 게 아니라, 밤의 생각을 아침의 행동으로 넘겨주는 저장 장치가 부족한 거예요. 그래서 결심은 진심인데 실행은 늘 다음 날 컨디션에 좌우됩니다.',
    science: '잠들기 전에 할 일을 적어두면 머릿속에 맴도는 생각이 줄고, 다음 날 시작이 쉬워질 수 있어요. 생각은 떠올랐을 때 저장해야 다음 날에도 힘을 씁니다.',
    bridge: '메아리셋은 밤에 떠오른 생각을 내일 핵심 3칸으로 바로 옮기게 해줘요. 새벽 감성을 억누르기보다, 그 에너지가 아침까지 살아남게 만드는 구조죠.',
    challenge: '오늘 자기 전에 내일 할 일 1개와 시작 시간 1개만 같이 적어두세요.',
    offerTitle: '3권 실행 리듬 세트',
    offerFit: '밤의 결심을 짧게 자주 실행으로 옮겨야 하니 3권 구성이 잘 맞아요. 90일 리듬을 반복하면서 밤→아침 전환 감각을 붙이기 좋습니다.',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '새벽 결심 저장해두기',
    color: '#FF8C00',
    minScore: 21,
    maxScore: 23,
  },
  {
    id: 'planner',
    name: '계획서만 A+',
    subtype: '준비 만렙 실행 대기형',
    level: 'Lv.3',
    emoji: '📋',
    description: '계획은 정말 잘 세우는데 시작은 자꾸 늦어지는 타입',
    headline: '정리는 끝났는데 실행 시작 버튼만 비어 있습니다.',
    detail: '정리력과 감각은 확실히 있어요. 다만 계획이 정교해질수록 “이 정도는 해야지” 기준도 같이 올라가서 손이 늦게 나갑니다. 준비가 완벽해야 안심되는 편이라, 실제 실행보다 계획 완성도에서 만족을 먼저 느끼기 쉬운 타입이에요.',
    science: '목표가 구체적일수록 실행은 쉬워지지만, 세부 계획이 많아질수록 오히려 시작이 늦어질 수 있어요. 핵심은 예쁘게 정리하기보다 첫 행동 한 줄까지 적는 겁니다.',
    bridge: '메아리셋은 큰 그림을 부정하지 않으면서도 오늘 한 칸으로 번역하게 도와줘요. 분기 목표 → 주간 포커스 → 오늘 핵심 3칸으로 내려오니 계획이 종이에만 머무르지 않습니다.',
    challenge: '지금 세운 계획 중 하나를 골라, 10분 안에 할 첫 행동만 따로 적어보세요.',
    offerTitle: '3권 실행 리듬 세트',
    offerFit: '계획력은 이미 충분하니 실행 전환이 핵심이에요. 3권 구성이 부담 없이 반복 훈련하기 좋고, 메아리셋의 압축 구조가 특히 잘 맞습니다.',
    offerPrice: '69,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '계획을 한 칸으로 줄이기',
    color: '#FF8C00',
    minScore: 18,
    maxScore: 20,
  },
  {
    id: 'threeweek',
    name: '3주 반짝러',
    subtype: '초반 부스터 과열형',
    level: 'Lv.2',
    emoji: '✨',
    description: '초반엔 잘 달리는데 4주차쯤 되면 조용해지는 타입',
    headline: '불 붙는 속도는 빠른데 유지 장치가 살짝 약합니다.',
    detail: '시작 에너지는 진짜 좋아요. 문제는 늘 비슷한 시점에서 흐름이 꺾인다는 겁니다. 처음 2~3주엔 잘하다가 일이 바빠지거나 하루 어긋나는 순간 루틴이 통째로 희미해지죠. 못하는 사람이 아니라, 유지 구간을 잡아주는 장치가 아직 없는 타입에 가깝습니다.',
    science: '습관은 생각보다 늦게 굳어요. 보통 몇 주 안에 자동이 되지 않아서, 중간에 흔들리는 건 실패보다 아직 자리 잡는 중에 가깝습니다.',
    bridge: '메아리셋은 90일을 주간 단위로 끊어 중간 점검과 재시작이 쉬워요. 흐름이 한번 끊겨도 끝이 아니라 다시 이어쓰기로 보이게 만드는 구조가 강점입니다.',
    challenge: '지금 하는 루틴 1개를 정하고, 이번 주 목표를 잘하기가 아니라 끊기지 않기로 적어보세요.',
    offerTitle: '2권 유지 부스터',
    offerFit: '초반 불꽃은 이미 있으니 유지가 핵심입니다. 가볍게 이어붙이기 좋은 2권 구성이 이 타입에 현실적으로 잘 맞아요.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '4주차 넘기는 구조 붙이기',
    color: '#FFD700',
    minScore: 15,
    maxScore: 17,
  },
  {
    id: 'together',
    name: '같이하면 되는 사람',
    subtype: '혼자 흐림 함께 선명형',
    level: 'Lv.2',
    emoji: '🤝',
    description: '혼자선 흐릿한데 약속이 생기면 갑자기 선명해지는 타입',
    headline: '혼자선 미뤄도 같이 보기 시작하면 바로 달립니다.',
    detail: '누가 같이 하자고 하면 실행력이 훅 올라가요. 이건 의지가 약해서가 아니라 외부 기준이 있을 때 집중이 더 또렷해지는 성향입니다. 혼자선 미뤄도, 누군가와 체크포인트가 생기면 꽤 잘 해내는 편이에요.',
    science: '사람은 기록을 남기고 누군가와 공유할 때 행동을 더 오래 이어가기 쉬워요. 혼자만의 결심보다 함께 보는 기준이 유지에 도움이 됩니다.',
    bridge: '메아리셋은 주간 목표와 손글씨 체크가 분명해서 서로 보기 좋아요. 혼자 버티는 플래너보다, 같이 확인하고 이어가기 좋은 구조에 가깝습니다.',
    challenge: '친구 1명에게 이번 주 각자 하나씩만 체크하자고 보내보세요.',
    offerTitle: '2권 유지 부스터',
    offerFit: '혼자 하면 흐려지는 타입이라 부담 없이 나눠 쓰기 좋은 2권 구성이 잘 맞아요. 서로 같은 주간 구조를 보며 체크하기 편합니다.',
    offerPrice: '49,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '같이 갈 기준 만들기',
    color: '#FFD700',
    minScore: 12,
    maxScore: 14,
  },
  {
    id: 'almost',
    name: '거의 다 된 사람',
    subtype: '마감 직전 산뜻 누락형',
    level: 'Lv.1',
    emoji: '🔥',
    description: '거의 다 해내는데 마지막 정리에서 살짝 놓치는 타입',
    headline: '실행력은 충분한데 해낸 걸 남기는 맛이 부족합니다.',
    detail: '기본 실행력은 충분해요. 다만 끝낸 걸 남기지 않고 바로 다음 일로 넘어가서, 해낸 것도 체감이 약해지는 편입니다. 그래서 잘하고도 스스로는 늘 5% 부족하다고 느끼기 쉬워요. 마무리 체크와 짧은 복기만 붙으면 안정감이 훨씬 올라갈 타입입니다.',
    science: '적고 체크하는 자기 모니터링만으로도 행동 유지가 쉬워져요. 완료를 눈으로 확인할 때 뇌가 해냈다는 보상을 더 분명하게 받기 때문입니다.',
    bridge: '메아리셋은 이미 있는 실행력을 더 오래 남기게 해줘요. 하루 핵심 3칸과 주간 회고가 있어서, 잘한 날을 흘려보내지 않고 패턴으로 쌓게 만듭니다.',
    challenge: '오늘 끝낸 일 3개를 적고, 그중 하나는 왜 잘됐는지 한 줄만 남겨보세요.',
    offerTitle: '1권 스타트 에디션',
    offerFit: '큰 교정보다 기록 밀도만 올리면 되는 타입이라 1권으로도 체감이 큽니다. 메아리셋의 체크 구조만 얹어도 마지막 5%가 더 선명해져요.',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '해낸 걸 남기기',
    color: '#44CC44',
    minScore: 9,
    maxScore: 11,
  },
  {
    id: 'hidden',
    name: '숨겨진 갓생러',
    subtype: '시스템 은근 고수형',
    level: 'Lv.1',
    emoji: '💎',
    description: '의지보다 시스템으로 움직이는, 이미 꽤 잘하고 있는 타입',
    headline: '교정보다 확장이 필요한 상위권 루틴형입니다.',
    detail: '무작정 열심히 하기보다 될 일을 남기고 아닌 건 덜어내는 감각이 있어요. 이미 기본 루틴이 있는 편이고, 그래서 더 욕심내다가 리듬을 깨뜨릴 위험만 조심하면 됩니다. 이 타입은 교정이 아니라 잘되는 패턴을 더 오래 유지하는 것이 핵심이에요.',
    science: '손으로 쓰는 기록은 기억과 집중을 또렷하게 만들어, 이미 자리 잡은 루틴을 더 오래 유지하는 데 도움이 됩니다. 잘하는 사람일수록 기록의 복리 효과가 커집니다.',
    bridge: '메아리셋은 당신에게 교정 도구보다 확장 도구에 가까워요. 잘되는 흐름을 90일 단위로 정리하고, 다음 챕터를 설계하게 도와주는 플래너입니다.',
    challenge: '이번 주 유지할 루틴 1개와 더 키울 목표 1개를 나란히 적어보세요.',
    offerTitle: '1권 스타트 에디션',
    offerFit: '이미 감이 있으니 1권만으로도 흐름이 더 또렷해질 수 있어요. 메아리셋이 지금 루틴을 오래 가게 만드는 정리 도구가 됩니다.',
    offerPrice: '29,000원',
    offerLink: 'https://meariset.kr/product/detail.html?product_no=27',
    ctaLabel: '내 리듬 더 또렷하게',
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

export function getResultTypeById(typeId?: string | null): ResultType {
  return resultTypes.find((result) => result.id === typeId) || resultTypes[0];
}
