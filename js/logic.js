import { DIFFICULTIES, SUBJECT_REWARDS, STAGES, DIALOGUES } from "./data.js";

export function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

export function getExpByDifficulty(difficultyId) {
  return DIFFICULTIES.find((item) => item.id === difficultyId)?.exp ?? 10;
}

export function gainExp(pet, amount) {
  pet.exp += amount;
  pet.stats.knowledge += amount;

  let leveledUp = false;

  while (pet.exp >= pet.expMax) {
    pet.exp -= pet.expMax;
    pet.level += 1;
    pet.expMax = Math.round(pet.expMax * 1.12);
    leveledUp = true;
  }

  return leveledUp;
}

export function recordStudy(pet, { subject, content, difficulty }) {
  const today = getTodayString();
  const expGained = getExpByDifficulty(difficulty);
  const leveledUp = gainExp(pet, expGained);

  if (pet.lastStudyDate !== today) {
    pet.studyCountToday = 0;
    pet.lastStudyDate = today;
    pet.streak += 1;
  }

  pet.studyCountToday += 1;
  pet.totalStudyCount += 1;
  pet.stats.affinity += 3;
  pet.stats.mood = Math.min(100, pet.stats.mood + 4);

  let ticketGained = false;
  if (pet.totalStudyCount % 3 === 0) {
    pet.tickets.snack += 1;
    ticketGained = true;
  }

  const log = {
    id: crypto.randomUUID(),
    type: "study",
    date: new Date().toLocaleString("ko-KR"),
    subject,
    content,
    difficulty,
    expGained,
    reward: SUBJECT_REWARDS[subject] ?? "반짝 조각",
    ticketGained,
    leveledUp
  };

  pet.logs.unshift(log);

  return { expGained, ticketGained, leveledUp, log };
}

export function giveSnack(pet, snackLabel = "딸기우유") {
  if (pet.tickets.snack <= 0) {
    return { ok: false, message: "아직 간식 티켓이 없어요. 공부 3번마다 1장을 얻어요!" };
  }

  pet.tickets.snack -= 1;
  pet.stats.mood = Math.min(100, pet.stats.mood + 12);
  pet.stats.affinity += 2;

  const log = {
    id: crypto.randomUUID(),
    type: "snack",
    date: new Date().toLocaleString("ko-KR"),
    content: `${snackLabel} 주기 완료`,
    expGained: 0
  };

  pet.logs.unshift(log);
  return { ok: true, message: `${pet.name}에게 ${snackLabel}를 줬어요. 기분이 좋아졌어요!`, log };
}

export function recordCare(pet) {
  pet.stats.mood = Math.min(100, pet.stats.mood + 8);
  pet.stats.affinity += 4;

  const log = {
    id: crypto.randomUUID(),
    type: "care",
    date: new Date().toLocaleString("ko-KR"),
    content: "쓰다듬기 기록 완료",
    expGained: 0
  };

  pet.logs.unshift(log);
  return { message: `${pet.name}를 쓰다듬어 줬어요. 친밀도가 올랐어요.`, log };
}

export function getStageLabel(level) {
  let current = STAGES[0].label;
  for (const stage of STAGES) {
    if (level >= stage.min) current = stage.label;
  }
  return current;
}

export function getRandomDialogue(pet) {
  const pool = DIALOGUES[pet.personality] ?? DIALOGUES.default;
  return pool[Math.floor(Math.random() * pool.length)];
}
