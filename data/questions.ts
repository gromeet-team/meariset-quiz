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
    question: '지금 내 의지력, 솔직하게 몇 점?',
    feedback: {
      4: '인정하는 것부터가 시작이에요 🫡',
      3: '절반은 채웠다... 아마도?',
      2: '오 제법인데요?',
      1: '거짓말탐지기 돌려봐도 될까요? 🤖',
    },
  },
  {
    id: 2,
    type: 'image-select',
    question: '매일 아침, 내 알람 상황은?',
    options: [
      { text: '알람 앱 삭제함', emoji: '🔕', score: 4 },
      { text: '알람 5개인데 다 스누즈 누름', emoji: '😴', score: 3 },
      { text: '알람 1개, 스누즈 딱 1번', emoji: '⏰', score: 2 },
      { text: '알람 울리기 전에 눈 떠짐', emoji: '🌅', score: 1 },
    ],
    feedback: {
      4: '알람 개발자가 울고 있어요 😭',
      3: '5개 다 끄는 것도 재능이에요',
      2: '1번은 인간적이잖아요 ㅋㅋ',
      1: '...혹시 군대 다녀오셨나요?',
    },
  },
  {
    id: 3,
    type: 'timer',
    question: '넷플릭스 "딱 한 편만 더" 누른 후?',
    options: [
      { text: '어? 벌써 시즌 끝남', emoji: '🌙', score: 4 },
      { text: '3~4편은 기본이지', emoji: '📺', score: 3 },
      { text: '진짜 1편만 봤음', emoji: '☝️', score: 2 },
      { text: '타이머 맞춰놓고 끔', emoji: '⏱️', score: 1 },
    ],
    feedback: {
      4: '넷플릭스 주가가 당신 덕에 오릅니다 📈',
      3: '"3편은 1편이다" 당신의 수학 ㅋㅋ',
      2: '진짜 1편만? 실화?',
      1: '자제력 미쳤다...',
      0: '결정도 미루셨군요 ㅋㅋㅋ 😂',
    },
  },
  {
    id: 4,
    type: 'drag-sort',
    question: '퇴근 후 하고 싶은 거, 순서대로!',
    options: [
      { text: '운동', emoji: '🏋️', score: 0 },
      { text: '넷플릭스', emoji: '📺', score: 0 },
      { text: '치킨 시키기', emoji: '🍗', score: 0 },
      { text: '바로 눕기', emoji: '🛏️', score: 0 },
    ],
    feedback: {
      1: '운동이 1순위?! 당신 진짜예요? 💪',
      2: '운동이 2등이면 나쁘지 않아요!',
      3: '솔직한 게 최고예요 ㅋㅋ',
      4: '일단 눕는 거 인정합니다 🛏️',
    },
  },
  {
    id: 5,
    type: 'chat',
    question: '내일 아침 6시에 운동 같이 갈래?',
    options: [
      { text: '👻 (읽씹)', score: 4 },
      { text: 'ㅋㅋ 생각해볼게~', score: 3 },
      { text: '오키 근데 7시로 하자', score: 2 },
      { text: 'ㅇㅇ 6시 콜!', score: 1 },
    ],
    feedback: {
      4: '읽씹은 거절의 예술이죠 😇',
      3: '"생각해볼게" = 국룰 거절 ㅋㅋ',
      2: '1시간은 벌었지만 그래도 가긴 가는 거네',
      1: '6시 콜이라니... 진심이시죠?',
    },
  },
  {
    id: 6,
    type: 'gallery',
    question: '내가 산 다이어리/플래너, 지금 상태는?',
    options: [
      { text: '아직 비닐도 안 뜯음', emoji: '📦', score: 4 },
      { text: '첫 장만 이쁘게 꾸밈', emoji: '✨', score: 3 },
      { text: '한 달은 쓰다가 어디 갔는지 모름', emoji: '🤷', score: 2 },
      { text: '끝까지 다 쓴 나 칭찬해', emoji: '🏆', score: 1 },
    ],
    feedback: {
      4: '비닐이 다이어리를 지켜주고 있어요 😌',
      3: '첫 장은 진짜 예쁘겠다 ㅋㅋ',
      2: '그 다이어리 지금 어디 있을까요...',
      1: '끝까지 다 쓴 사람이 실존하다니 ✨',
    },
  },
  {
    id: 7,
    type: 'button-mash',
    question: '"내일부터 진짜 한다" 연타하세요!',
    feedback: {
      1: '한 번만? 진짜 내일 하실 거죠?',
      2: '적당히 누르셨네요 ㅋ',
      3: '열정적인데... 그 열정 내일도 있을까요?',
      4: '아직도 누르고 계시네요 ㅋㅋㅋㅋ',
    },
  },
];
