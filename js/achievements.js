import { ACHIEVEMENTS } from "./data.js";

function isUnlocked(pet, achievement) {
  const c = achievement.condition;
  if (c.type === "totalStudy") return pet.totalStudyCount >= c.value;
  if (c.type === "todayStudy") return pet.goals.completedToday >= c.value;
  if (c.type === "streak") return pet.streak.count >= c.value;
  if (c.type === "subject") return (pet.subjectCounts[c.subject] ?? 0) >= c.value;
  if (c.type === "level") return pet.level >= c.value;
  return false;
}

export function checkAchievements(pet) {
  const newly = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!pet.achievements.includes(achievement.id) && isUnlocked(pet, achievement)) {
      pet.achievements.push(achievement.id);
      pet.tickets.snack += 1;
      newly.push(achievement);
    }
  }
  return newly;
}

export function getAchievementView(pet) {
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: pet.achievements.includes(achievement.id)
  }));
}
