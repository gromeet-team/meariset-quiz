export interface Question {
  id: number;
  type: 'slider' | 'image-select' | 'timer' | 'drag-sort' | 'chat' | 'gallery' | 'button-mash';
  question: string;
  options?: { text: string; emoji?: string; score: number }[];
  feedback?: Record<number, string>;
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'slider',
    question: '오늘 해야 할 일 앞에 두고, 지금 내 컨디션은 몇 점이에요?',
    feedback: {
      4: '오케이, 오늘은 버티기 모드부터 가죠 🫠',
      3: '반쯤 방전. 큰일보다 한 칸이 맞아요.',
      2: '시동은 걸렸어요. 지금 잡으면 갑니다 👀',
      1: '좋아요. 오늘은 꽤 해낼 얼굴인데요 🔥',
    },
  },
  {
    id: 2,
    type: 'image-select',
    question: '아침 알람이 울리면, 실제 나는 어떤 편인가요?',
    options: [
      { text: '끄고 “5분만...” 했다가 다시 잠든다', emoji: '🔕', score: 4 },
      { text: '스누즈 2~3번 누르며 현실 부정한다', emoji: '😴', score: 3 },
      { text: '한 번 미루고 겨우 일어난다', emoji: '⏰', score: 2 },
      { text: '거의 바로 일어나서 씻으러 간다', emoji: '🌅', score: 1 },
    ],
    feedback: {
      4: '알람은 울었고, 당신은 못 들은 걸로 😇',
      3: '스누즈랑 협상하는 사람 진짜 많아요 ㅋㅋ',
      2: '한 번 미루는 건 꽤 인간적인 범위죠.',
      1: '이 정도면 아침이랑 제법 친한 편이에요.',
    },
  },
  {
    id: 3,
    type: 'timer',
    question: '밤 11시, 배달앱을 열었다. 다음 장면은?',
    options: [
      { text: '할인까지 챙겨서 바로 결제', emoji: '🍔', score: 4 },
      { text: '메뉴 구경하다 결국 주문', emoji: '📱', score: 3 },
      { text: '물 마시고 일단 앱 닫기', emoji: '🚰', score: 2 },
      { text: '내일 먹을 거만 정하고 종료', emoji: '✅', score: 1 },
    ],
    feedback: {
      4: '결정 속도는 인정... 방향만 바꾸면 됩니다 🍔',
      3: '보다가 시키는 패턴, 너무 익숙하죠 ㅋㅋ',
      2: '좋아요. 여기서 멈춘 것도 실력이에요.',
      1: '미래의 나까지 챙기는 타입이네요.',
      0: '망설임까지 포함해서 체크했어요 ⏳',
    },
  },
  {
    id: 4,
    type: 'drag-sort',
    question: '일요일 밤, 내일 덜 힘들려고 앉았다. 뭐부터 할래요?',
    options: [
      { text: '내일 꼭 할 일 3개만 적기', emoji: '📝', score: 0 },
      { text: '가방이나 옷 같은 준비물 챙기기', emoji: '🎒', score: 0 },
      { text: '쇼츠나 릴스 조금 보기', emoji: '📱', score: 0 },
      { text: '일단 침대에 눕기', emoji: '🛏️', score: 0 },
    ],
    feedback: {
      1: '좋아요. 내일의 나한테 제일 도움 되는 순서예요.',
      2: '이 정도면 아직 주도권 안 뺏겼어요 👌',
      3: '현실감 있네요. 여기서부터 자주 새죠 ㅋㅋ',
      4: '눕는 순간 오늘 회의는 종료죠 🛏️',
    },
  },
  {
    id: 5,
    type: 'chat',
    question: '이번 주 같이 10분 산책 챌린지 할래?',
    options: [
      { text: '읽고 “나중에 답하지 뭐” 상태', score: 4 },
      { text: '좋지 ㅋㅋ 이번 주만 좀 정리되면', score: 3 },
      { text: '오케이, 대신 저녁으로 바꾸자', score: 2 },
      { text: '좋아, 지금 시간부터 정하자', score: 1 },
    ],
    feedback: {
      4: '답장은 미뤄도 패턴은 안 미뤄지네요 😌',
      3: '이 문장, 다들 한 번쯤은 써봤죠 ㅋㅋ',
      2: '좋아요. 시간 조정은 실행 의지 있다는 뜻.',
      1: '이건 진짜 하겠다는 사람 톤이에요.',
    },
  },
  {
    id: 6,
    type: 'gallery',
    question: '플래너나 메모장은 보통 어디까지 가나요?',
    options: [
      { text: '사고 책상 위 오브제가 된다', emoji: '📦', score: 4 },
      { text: '첫 주만 열정 폭발한다', emoji: '✨', score: 3 },
      { text: '필요할 때만 띄엄띄엄 쓴다', emoji: '📝', score: 2 },
      { text: '거의 매주 꾸준히 쓴다', emoji: '🏁', score: 1 },
    ],
    feedback: {
      4: '미개봉 플래너, 생각보다 정말 많습니다 ㅋㅋ',
      3: '첫 페이지에 힘 준 사람 특유의 감성이 있어요.',
      2: '필요할 때라도 펼치는 건 분명 감각입니다.',
      1: '꾸준함 쪽 재능이 이미 있는 편이네요 ✨',
    },
  },
  {
    id: 7,
    type: 'button-mash',
    question: '“이번엔 진짜 안 미룬다” 버튼, 마음 가는 만큼 눌러보세요!',
    feedback: {
      1: '오, 과열 없이 바로 가는 편이네요.',
      2: '좋아요. 결심은 적당하고 실행은 현실적으로.',
      3: '의욕 좋네요. 이제 한 칸만 적으면 됩니다.',
      4: '손가락 열정 최고 ㅋㅋ 이제 구조만 붙이면 돼요.',
    },
  },
];
