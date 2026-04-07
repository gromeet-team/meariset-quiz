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
    question: '오늘 해야 할 일 앞에서, 지금 내 마음 상태는 몇 점이에요?',
    feedback: {
      4: '오케이, 오늘은 큰일 말고 한 칸부터 가면 돼요 🫠',
      3: '반쯤 방전. 그래도 시동은 걸 수 있어요.',
      2: '좋아요. 지금 시작하면 생각보다 잘 갑니다 👀',
      1: '오늘은 꽤 해낼 수 있는 날 같아요 🔥',
    },
  },
  {
    id: 2,
    type: 'image-select',
    question: '아침 알람이 울리면, 실제 나는 어떤 편인가요?',
    options: [
      { text: '알람 끄고 다시 잔다', emoji: '😴', score: 4 },
      { text: '알람을 여러 번 미루다가 겨우 일어난다', emoji: '⏰', score: 3 },
      { text: '한 번 더 누워 있다가 일어난다', emoji: '🛏️', score: 2 },
      { text: '거의 바로 일어나서 씻으러 간다', emoji: '🌅', score: 1 },
    ],
    feedback: {
      4: '알람은 울었고, 당신은 다시 꿈나라로 갔네요 😇',
      3: '이 패턴 진짜 많아요. 아침이랑 협상 중인 타입.',
      2: '한 번 더 눕는 건 꽤 현실적인 답이죠.',
      1: '이 정도면 아침이랑 제법 친한 편이에요.',
    },
  },
  {
    id: 3,
    type: 'timer',
    question: '해야 할 일 시작하려고 앉았을 때, 보통 먼저 뭐 하나요?',
    options: [
      { text: '폰부터 열고 이것저것 보다 시간이 간다', emoji: '📱', score: 4 },
      { text: '물 마시고 정리하고 딴짓하다 늦게 시작한다', emoji: '🫗', score: 3 },
      { text: '일단 필요한 것부터 꺼내고 천천히 시작한다', emoji: '📝', score: 2 },
      { text: '10분만이라도 바로 시작한다', emoji: '✅', score: 1 },
    ],
    feedback: {
      4: '시작 전 폰 한 번이 30분 되는 경우 많죠 ㅋㅋ',
      3: '준비하다 시간이 가는 타입, 은근 흔해요.',
      2: '좋아요. 느려도 시작하면 반은 간 거예요.',
      1: '이게 제일 강해요. 짧게라도 바로 시작.',
      0: '망설임까지 포함해서 체크했어요 ⏳',
    },
  },
  {
    id: 4,
    type: 'drag-sort',
    question: '일요일 밤, 내일 덜 힘들게 하려면 뭐부터 할래요?',
    options: [
      { text: '내일 꼭 할 일 3개만 적기', emoji: '📝', score: 0 },
      { text: '가방이나 옷 같은 준비물 챙기기', emoji: '🎒', score: 0 },
      { text: '폰으로 영상 조금 보기', emoji: '📱', score: 0 },
      { text: '일단 침대에 눕기', emoji: '🛏️', score: 0 },
    ],
    feedback: {
      1: '좋아요. 내일의 나한테 제일 도움 되는 순서예요.',
      2: '이 정도면 아직 흐름 안 놓쳤어요 👌',
      3: '여기서부터 자주 새죠 ㅋㅋ 딱 현실적이에요.',
      4: '눕는 순간 오늘 회의는 종료입니다 🛏️',
    },
  },
  {
    id: 5,
    type: 'chat',
    question: '이번 주 10분만 같이 걷자고 연락이 왔다면?',
    options: [
      { text: '읽고 나중에 답해야지 하다가 넘어간다', score: 4 },
      { text: '좋지 ㅋㅋ 근데 이번 주는 좀 애매해', score: 3 },
      { text: '좋아, 대신 다른 시간으로 바꾸자', score: 2 },
      { text: '좋아, 언제 할지 지금 정하자', score: 1 },
    ],
    feedback: {
      4: '답장은 미뤄도 패턴은 잘 안 미뤄지죠 😌',
      3: '이 말, 정말 많은 사람이 써요 ㅋㅋ',
      2: '좋아요. 시간 조정은 실행 의지가 있다는 뜻.',
      1: '이건 진짜 하겠다는 사람 말투예요.',
    },
  },
  {
    id: 6,
    type: 'gallery',
    question: '플래너나 메모장은 보통 어디까지 가나요?',
    options: [
      { text: '사놓고 책상 위에만 둔다', emoji: '📦', score: 4 },
      { text: '첫 주만 열심히 쓰고 멈춘다', emoji: '✨', score: 3 },
      { text: '생각날 때만 가끔 쓴다', emoji: '📝', score: 2 },
      { text: '거의 매주 꾸준히 쓴다', emoji: '🏁', score: 1 },
    ],
    feedback: {
      4: '생각보다 제일 많은 답일 수도 있어요 ㅋㅋ',
      3: '초반 열정은 진짜 누구보다 강한 타입.',
      2: '가끔이라도 꺼내 쓰는 건 감각이 있는 거예요.',
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
