import { DAILY_MISSIONS } from "./data.js";
import { getTodayString } from "./logic.js";

export function ensureDailyMission(pet, force = false) {
  const today = getTodayString();
  if (!force && pet.goals.mission && pet.goals.missionDate === today) {
    return pet.goals.mission;
  }

  const seed = Number(today.replaceAll("-", ""));
  const index = (seed + pet.totalStudyCount + Math.floor(Math.random() * DAILY_MISSIONS.length)) % DAILY_MISSIONS.length;
  pet.goals.mission = DAILY_MISSIONS[index];
  pet.goals.missionDate = today;
  return pet.goals.mission;
}

export function setTodayTarget(pet, target) {
  const safeTarget = Math.max(1, Math.min(20, Number(target) || 3));
  pet.goals.todayTarget = safeTarget;
}

export function getQuestProgress(pet) {
  const completed = pet.goals.completedToday || 0;
  return [
    { id: "target", label: `오늘 목표 ${pet.goals.todayTarget}회`, done: completed >= pet.goals.todayTarget, progress: `${completed}/${pet.goals.todayTarget}` },
    { id: "three", label: "공부 3회 퀘스트", done: completed >= 3, progress: `${Math.min(completed, 3)}/3` },
    { id: "five", label: "공부 5회 퀘스트", done: completed >= 5, progress: `${Math.min(completed, 5)}/5` },
    { id: "ten", label: "공부 10회 퀘스트", done: completed >= 10, progress: `${Math.min(completed, 10)}/10` }
  ];
}

export function applyQuestRewards(pet) {
  const completed = pet.goals.completedToday || 0;
  const today = getTodayString();
  pet._claimedQuests = pet._claimedQuests ?? {};

  const rewards = [
    { key: `${today}-3`, need: 3, snack: 1, care: 0, message: "3회 공부 퀘스트 보상으로 간식 티켓 +1!" },
    { key: `${today}-5`, need: 5, snack: 1, care: 1, message: "5회 공부 퀘스트 보상으로 간식 티켓 +1, 돌봄 티켓 +1!" },
    { key: `${today}-10`, need: 10, snack: 2, care: 2, message: "10회 공부 퀘스트 보상으로 간식 티켓 +2, 돌봄 티켓 +2!" }
  ];

  const messages = [];
  for (const reward of rewards) {
    if (completed >= reward.need && !pet._claimedQuests[reward.key]) {
      pet.tickets.snack += reward.snack;
      pet.tickets.care += reward.care;
      pet._claimedQuests[reward.key] = true;
      messages.push(reward.message);
    }
  }
  return messages;
}
