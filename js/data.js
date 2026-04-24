export const ANIMALS = [
  { id: "kiwi", label: "키위새", emoji: "🥝" },
  { id: "cat", label: "고양이", emoji: "🐱" },
  { id: "dog", label: "강아지", emoji: "🐶" },
  { id: "penguin", label: "펭귄", emoji: "🐧" },
  { id: "fox", label: "여우", emoji: "🦊" },
  { id: "frog", label: "개구리", emoji: "🐸" }
];

export const THEMES = [
  { id: "green", label: "초록" },
  { id: "pink", label: "분홍" },
  { id: "blue", label: "파랑" },
  { id: "purple", label: "보라" },
  { id: "dark", label: "다크" }
];

export const PERSONALITIES = [
  { id: "calm", label: "순한" },
  { id: "playful", label: "장난꾸러기" },
  { id: "study", label: "공부형" },
  { id: "cute", label: "애교형" }
];

export const SUBJECTS = [
  "영어", "국어", "수학", "법", "지리", "일본어", "정보", "기타"
];

export const DIFFICULTIES = [
  { id: "easy", label: "쉬움", exp: 5 },
  { id: "medium", label: "보통", exp: 10 },
  { id: "hard", label: "어려움", exp: 18 }
];

export const SUBJECT_REWARDS = {
  영어: "단어 열매",
  국어: "이야기 깃털",
  수학: "논리 조약돌",
  법: "판례 씨앗",
  지리: "지도 조각",
  일본어: "히라가나 잎",
  정보: "코드 깃털",
  기타: "반짝 조각"
};

export const STAGES = [
  { min: 1, label: "알에서 나온 친구" },
  { min: 3, label: "걸음마 공부 친구" },
  { min: 5, label: "공부하는 친구" },
  { min: 10, label: "똑똑한 친구" },
  { min: 15, label: "작은 박사" },
  { min: 20, label: "전설의 공부 친구" }
];

export const DIALOGUES = {
  calm: [
    "고마워요. 오늘 배운 것도 조용히 기억해 둘게요.",
    "설명이 차분해서 이해하기 좋았어요.",
    "오늘도 한 걸음 자랐어요."
  ],
  playful: [
    "오호라? 이 정도면 꽤 똑똑해졌는데요? 😏",
    "한 번 더 알려 주면 완전 천재가 될지도요!",
    "공부 완료! 나 이제 조금 잘난 척해도 되나요?"
  ],
  study: [
    "다음 개념도 알려 주세요. 구조가 보이기 시작했어요.",
    "핵심 원리가 이해됐어요. 복습하면 더 강해질 것 같아요.",
    "오늘의 지식이 저장됐습니다."
  ],
  cute: [
    "와아! 덕분에 똑똑해졌어요!",
    "오늘 설명 너무 좋았어요. 또 알려 주세요!",
    "헤헤, 나 조금 자랐어요!"
  ],
  default: [
    "오늘은 뭘 배울까요?",
    "공부하면 제가 자라요!",
    "조금씩 쌓이면 아주 멀리 갈 수 있어요."
  ]
};

export const SNACKS = [
  { id: "strawberryMilk", label: "딸기우유", mood: 12 },
  { id: "snack", label: "간식", mood: 10 },
  { id: "jelly", label: "젤리", mood: 8 }
];
