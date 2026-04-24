import {
  DIFFICULTIES,
  SUBJECT_REWARDS,
  STAGES,
  DIALOGUES,
  UNDERSTANDING_LEVELS
} from "./data.js";

import { applyStudyStatusEffect } from "./petStatus.js";
import { generateDiary } from "./diary.js";
import { applyQuestRewards } from "./quests.js";
import { checkAchievements } from "./achievements.js";

export function getTodayString() {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(dateA, dateB) {
  const a = new Date(dateA + "T00:00:00");
  const b = new Date(dateB + "T00:00:00");
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function getExpByDifficulty(difficultyId) {
  return DIFFICULTIES.find((item) => item.id === difficultyId)?.exp ?? 12;
}

export function gainExp(pet, amount) {
  pet.exp += amount;
  pet.stats.knowledge += amount;

  let leveledUp = false;
  while (pet.exp >= pet.expMax) {
    pet.exp -= pet.expMax;
    pet.level += 1;
    pet.expMax = Math.round(pet.expMax * 1.13);
    leveledUp = true;
  }

  return leveledUp;
}

export function recordStudy(pet, {
  subject,
  content,
  difficulty,
  summary,
  confusion,
  understanding
}) {
  const today = getTodayString();

  const baseExp = getExpByDifficulty(difficulty);
  const understandingBonus =
    UNDERSTANDING_LEVELS.find((x) => x.id === understanding)?.bonus ?? 0;
  const expGained = baseExp + understandingBonus;

  const leveledUp = gainExp(pet, expGained);

  updateStreakForStudy(pet, today);

  pet.goals.completedToday += 1;
  pet.totalStudyCount += 1;
  pet.subjectCounts[subject] = (pet.subjectCounts[subject] ?? 0) + 1;

  applyStudyStatusEffect(pet);

  if (pet.totalStudyCount % 3 === 0) {
    pet.tickets.snack += 1;
  }

  const log = {
    id: crypto.randomUUID(),
    type: "study",
    date: new Date().toLocaleString("ko-KR"),
    subject,
    content,
    summary,
    confusion,
    understanding,
    difficulty,
    expGained,
    reward: SUBJECT_REWARDS[subject] ?? "✨ 반짝 조각",
    leveledUp
  };

  pet.logs.unshift(log);
  addToReviewQueueIfNeeded(pet, log);

  const diaryEntry = generateDiary(pet, log);
  const questMessages = applyQuestRewards(pet);
  const achievements = checkAchievements(pet);

  return { expGained, leveledUp, log, diaryEntry, questMessages, achievements };
}

export function updateStreakForStudy(pet, today) {
  const last = pet.streak.lastStudyDate;

  if (!last) {
    pet.streak.count = 1;
    pet.streak.lastStudyDate = today;
    return;
  }

  const diff = daysBetween(last, today);

  if (diff === 0) return;
  if (diff === 1) pet.streak.count += 1;
  else pet.streak.count = 1;

  pet.streak.lastStudyDate = today;
  pet.goals.completedToday = 0;
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

export function addToReviewQueueIfNeeded(pet, log) {
  if (!log.summary) return;

  const shouldReview =
    log.understanding === "low" ||
    log.understanding === "mid" ||
    Boolean(log.confusion);

  if (!shouldReview) return;

  pet.reviewQueue = pet.reviewQueue ?? [];

  const firstDue = Date.now() + 1000 * 60 * 60 * 24;

  pet.reviewQueue.push({
    id: log.id,
    subject: log.subject,
    content: log.content,
    summary: log.summary,
    confusion: log.confusion,
    understanding: log.understanding,
    intervalDays: 1,
    due: firstDue,
    reviewedCount: 0
  });
}

export function getQuiz(pet) {
  const candidates = (pet.logs ?? []).filter((log) => log.summary);

  if (!candidates.length) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function checkSession(pet) {
  if (!pet.session?.active) return null;

  const elapsed = Date.now() - pet.session.start;
  const targetMs = (pet.session.targetMinutes ?? 25) * 60 * 1000;

  if (elapsed >= targetMs) {
    pet.session.active = false;
    pet.session.start = null;
    pet.tickets.snack += 2;

    return {
      completed: true,
      message: "집중 세션 완료! 간식 티켓 +2 🎉"
    };
  }

  const remainingMs = targetMs - elapsed;
  const remainingMin = Math.ceil(remainingMs / 60000);

  return {
    completed: false,
    message: `집중 세션 진행 중이에요. 약 ${remainingMin}분 남았어요.`
  };
}

export function getUnderstandingRecommendation(understanding) {
  if (understanding === "low") {
    return "아직 애매한 부분이 있어요. 예시 하나로 다시 설명해 보면 좋아요.";
  }

  if (understanding === "mid") {
    return "대충 이해한 상태예요. 내 말로 한 번 더 바꾸면 안정됩니다.";
  }

  if (understanding === "high") {
    return "설명 가능한 상태예요. 이제 문제나 지문에 적용해 보면 좋아요.";
  }

  if (understanding === "master") {
    return "가르칠 수 있음 단계예요. 이건 강한 기억으로 남을 가능성이 높아요.";
  }

  return "";
}
