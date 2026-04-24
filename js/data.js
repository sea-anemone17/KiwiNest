export const ANIMALS = [
  { id: "kiwi", label: "키위새", emoji: "🥝", imageStages: [
    "./assets/animals/kiwi-lv1.png",
    "./assets/animals/kiwi-lv2.png",
    "./assets/animals/kiwi-lv3.png"
  ]},
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
  { id: "yellow", label: "노랑" },
  { id: "dark", label: "다크" }
];

export const PERSONALITIES = [
  { id: "calm", label: "순한" },
  { id: "playful", label: "장난꾸러기" },
  { id: "study", label: "공부형" },
  { id: "cute", label: "애교형" }
];

export const SUBJECTS = ["영어", "국어", "수학", "법", "지리", "일본어", "정보", "기타"];

export const DIFFICULTIES = [
  { id: "easy", label: "쉬움", exp: 6 },
  { id: "medium", label: "보통", exp: 12 },
  { id: "hard", label: "어려움", exp: 20 }
];

export const SUBJECT_REWARDS = {
  영어: "📘 단어 열매",
  국어: "📜 이야기 깃털",
  수학: "🧮 논리 조약돌",
  법: "⚖️ 판례 씨앗",
  지리: "🗺️ 지도 조각",
  일본어: "🌸 히라가나 잎",
  정보: "💻 코드 깃털",
  기타: "✨ 반짝 조각"
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
  lonely: [
    "어제는 조금 조용했어요. 그래도 오늘 다시 만나서 좋아요.",
    "오랜만이에요. 오늘은 아주 작은 것부터 해도 괜찮아요.",
    "기다리고 있었어요. 하나만 알려 줘도 충분해요."
  ],
  hungry: [
    "배가 살짝 고파요. 공부하거나 간식을 주면 기분이 좋아질 것 같아요.",
    "혹시 딸기우유 티켓 있나요…?"
  ],
  sleepy: [
    "조금 졸려요. 그래도 짧게 하나만 배우면 좋을 것 같아요.",
    "오늘은 무리하지 말고 작게 가도 좋아요."
  ],
  default: [
    "오늘은 뭘 배울까요?",
    "공부하면 제가 자라요!",
    "조금씩 쌓이면 아주 멀리 갈 수 있어요."
  ]
};

export const DAILY_MISSIONS = [
  { id: "eng1", subject: "영어", text: "영어 지문 1개를 키위에게 설명하기" },
  { id: "kor1", subject: "국어", text: "국어 지문 1개를 구조화하기" },
  { id: "math1", subject: "수학", text: "수학 문제 5개 풀고 핵심 풀이 말하기" },
  { id: "law1", subject: "법", text: "법 개념 1개를 사례로 설명하기" },
  { id: "geo1", subject: "지리", text: "지리 개념 1개를 그림처럼 설명하기" },
  { id: "info1", subject: "정보", text: "코드나 개념 1개를 키위에게 알려 주기" }
];

export const SNACKS = [
  { id: "strawberryMilk", label: "딸기우유", emoji: "🍓🥛", mood: 14, hunger: -16, ticketCost: 1, asset: "./assets/snacks/strawberry-milk.png" },
  { id: "chocoMilk", label: "초코우유", emoji: "🍫🥛", mood: 12, hunger: -14, ticketCost: 1, asset: "./assets/snacks/choco-milk.png" },
  { id: "jelly", label: "젤리", emoji: "🍬", mood: 9, hunger: -9, ticketCost: 1, asset: "./assets/snacks/jelly.png" },
  { id: "cookie", label: "과자", emoji: "🍪", mood: 10, hunger: -12, ticketCost: 1, asset: "./assets/snacks/cookie.png" }
];

export const ROOM_ITEMS = [
  { id: "cushion", label: "둥근 쿠션", emoji: "🛋️", unlockLevel: 2, asset: "./assets/room/cushion.png" },
  { id: "lamp", label: "따뜻한 램프", emoji: "💡", unlockLevel: 4, asset: "./assets/room/lamp.png" },
  { id: "bookshelf", label: "작은 책장", emoji: "📚", unlockLevel: 6, asset: "./assets/room/bookshelf.png" }
];

export const ACHIEVEMENTS = [
  { id: "first-study", title: "첫 설명 완료", description: "처음으로 공부를 기록했어요.", condition: { type: "totalStudy", value: 1 } },
  { id: "three-today", title: "오늘 3회 공부", description: "하루 공부 3회를 달성했어요.", condition: { type: "todayStudy", value: 3 } },
  { id: "five-today", title: "오늘 5회 공부", description: "하루 공부 5회를 달성했어요.", condition: { type: "todayStudy", value: 5 } },
  { id: "ten-today", title: "오늘 10회 공부", description: "하루 공부 10회를 달성했어요.", condition: { type: "todayStudy", value: 10 } },
  { id: "streak-3", title: "3일 연속 둥지 방문", description: "3일 연속 공부했어요.", condition: { type: "streak", value: 3 } },
  { id: "english-5", title: "영어 열매 수집가", description: "영어를 5회 기록했어요.", condition: { type: "subject", subject: "영어", value: 5 } },
  { id: "math-5", title: "논리 조약돌 수집가", description: "수학을 5회 기록했어요.", condition: { type: "subject", subject: "수학", value: 5 } },
  { id: "level-5", title: "공부하는 친구", description: "레벨 5를 달성했어요.", condition: { type: "level", value: 5 } }
];
