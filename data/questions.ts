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
    question: '지금 당신의 의지력을 게이지로 표현하면?',
    feedback: {
      4: '솔직함이 치료의 시작입니다 🫡',
      3: '반은 채워진 거예요... 아마도',
      2: '꽤 괜찮은데요?',
      1: '혹시 로봇이신가요? 🤖',
    },
  },
  {
    id: 2,
    type: 'image-select',
    question: '아침에 당신의 알람 상태는?',
    options: [
      { text: '알람 앱 삭제함', emoji: '🔕', score: 4 },
      { text: '알람 5개 + 전부 스누즈', emoji: '⏰', score: 3 },
      { text: '알람 1개, 스누즈 1번', emoji: '⏰', score: 2 },
      { text: '첫 알람에 기상', emoji: '⏰', score: 1 },
    ],
    feedback: {
      4: '알람 앱 개발자가 울고 있어요',
      3: '알람이 반란을 일으킬 거예요',
      2: '적당히 인간적이네요',
      1: '첫 알람에 일어나다니... 존경합니다',
    },
  },
  {
    id: 3,
    type: 'timer',
    question: '10초 안에 골라! 넷플릭스 한 편만 더 볼까?',
    options: [
      { text: '시즌 끝까지 봄 (새벽 4시)', emoji: '🌙', score: 4 },
      { text: '3~4편 더 봄', emoji: '📺', score: 3 },
      { text: '진짜 1편만 더', emoji: '☝️', score: 2 },
      { text: '타이머 맞춰놓고 끔', emoji: '⏱️', score: 1 },
    ],
    feedback: {
      4: '넷플릭스가 당신을 사랑합니다 ❤️',
      3: '3편은 1편이에요 우리 모두 알아요',
      2: '진짜 1편만? 진짜로?',
      1: '자기관리의 신이시네요',
      0: '역시... 결정도 미루시는군요 😂',
    },
  },
  {
    id: 4,
    type: 'drag-sort',
    question: '지금 당장 하고 싶은 순서대로 배치!',
    options: [
      { text: '운동', emoji: '🏋️', score: 0 },
      { text: '넷플릭스', emoji: '📺', score: 0 },
      { text: '치킨', emoji: '🍗', score: 0 },
      { text: '숙면', emoji: '😴', score: 0 },
    ],
    feedback: {
      1: '운동부터! 전두엽이 건강하시군요 💪',
      2: '운동이 2등? 나쁘지 않아요!',
      3: '운동이 3등이라... 솔직하시네요',
      4: '적어도 맛있는 건 포기 안 하시네요 🍗',
    },
  },
  {
    id: 5,
    type: 'chat',
    question: '',
    options: [
      { text: '👻 (읽씹. 영원히)', score: 4 },
      { text: 'ㅋㅋ 생각해볼게~ (안 함)', score: 3 },
      { text: '오키 근데 7시로 하자', score: 2 },
      { text: 'ㅇㅇ 6시 콜!', score: 1 },
    ],
    feedback: {
      4: '그 친구... 아직 기다리고 있을 거예요',
      3: '"생각해볼게"는 국룰 거절이죠',
      2: '한 시간 벌었지만 그래도 갈 생각은 있네요',
      1: '6시 콜? 진짜 갈 거죠?',
    },
  },
  {
    id: 6,
    type: 'gallery',
    question: '지금 당신의 다이어리/플래너 상태는?',
    options: [
      { text: '개봉도 안 함 (3개 쌓임)', emoji: '📦', score: 4 },
      { text: '첫 페이지만 예쁘게 꾸밈', emoji: '✨', score: 3 },
      { text: '한 달은 열심히 쓰다 흐지부지', emoji: '📝', score: 2 },
      { text: '끝까지 다 씀', emoji: '📖', score: 1 },
    ],
    feedback: {
      4: '포장지가 보호막이 된 거죠 😌',
      3: '첫 페이지는 진짜 예쁘겠다...',
      2: '한 달이면 나쁘지 않아요! (위로)',
      1: '메아리셋의 VIP 고객이시군요 ✨',
    },
  },
  {
    id: 7,
    type: 'button-mash',
    question: "'내일부터 진짜 한다' 버튼을 눌러보세요",
    feedback: {
      1: '단호하시네요. 진짜 한 번만?',
      2: '적당히 누르셨군요',
      3: '꽤 열정적인데요?',
      4: '벌써 13번째... 근데 진짜 내일 하실 건가요?',
    },
  },
];
