import { DIFFICULTIES, SUBJECT_REWARDS, STAGES, DIALOGUES } from "./data.js";
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

export function recordStudy(pet, { subject, content, difficulty }) {
  const today = getTodayString();
  const expGained = getExpByDifficulty(difficulty);
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
    difficulty,
    expGained,
    reward: SUBJECT_REWARDS[subject] ?? "✨ 반짝 조각",
    leveledUp
  };

  pet.logs.unshift(log);
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
