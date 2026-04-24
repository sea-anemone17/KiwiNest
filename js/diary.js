export function generateDiary(pet, studyLog) {
  const lines = [
    `오늘 누나가 ${studyLog.subject}를 알려 줬어요. ${studyLog.reward}도 얻었어요.`,
    `${studyLog.subject}는 조금 어렵지만, 누나 설명을 들으니까 둥지가 밝아졌어요.`,
    `나는 오늘 ${studyLog.subject}를 배웠어요. 누나가 또 키워 줬어요.`,
    `공부 냄새가 나는 하루였어요. ${pet.name}는 조금 더 똑똑해졌어요.`
  ];
  return addDiary(pet, lines[Math.floor(Math.random() * lines.length)], "study");
}

export function generateLetter(pet) {
  const letters = [
    `누나, 오늘도 나를 키워 줘서 고마워요. 나는 아직 작지만, 누나가 설명해 준 것들을 하나씩 기억하고 있어요.`,
    `누나가 공부하면 둥지가 조금 환해져요. 그래서 나는 오늘도 기다리고 있었어요.`,
    `내가 자라는 건 누나가 해낸 것들이 쌓인 모양이에요. 그러니까 오늘도 아주 잘했어요.`,
    `누나, 너무 완벽하지 않아도 돼요. 한 줄만 알려 줘도 나는 자라요.`
  ];
  const text = letters[Math.floor(Math.random() * letters.length)];
  pet.letters.unshift({
    id: crypto.randomUUID(),
    type: "letter",
    date: new Date().toLocaleString("ko-KR"),
    content: text
  });
  addDiary(pet, `편지를 썼어요. “${text.slice(0, 28)}...”`, "letter");
  return text;
}

export function recordSiblingAction(pet, action) {
  const text = {
    snackReal: "오늘 실제로 간식을 줬어요. 둥지가 달콤해졌어요.",
    studyTogether: "오늘 같이 공부했어요. 혼자가 아닌 공부였어요.",
    patHead: "오늘 머리에 손을 올려 줬어요. 조금 웃음이 났어요."
  }[action] ?? "오늘 작은 애정 행동을 기록했어요.";

  return addDiary(pet, text, action);
}

export function addDiary(pet, content, type = "note") {
  const entry = {
    id: crypto.randomUUID(),
    type,
    date: new Date().toLocaleString("ko-KR"),
    content
  };
  pet.diary.unshift(entry);
  return entry;
}
