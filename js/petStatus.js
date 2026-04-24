import { DIALOGUES } from "./data.js";
import { getTodayString, daysBetween } from "./logic.js";

export function updateDailyStatus(pet) {
  const today = getTodayString();
  const last = pet.streak.lastStudyDate;
  if (!last) return null;

  const diff = daysBetween(last, today);
  if (diff <= 0) return null;

  pet.stats.hunger = Math.min(100, pet.stats.hunger + diff * 10);
  pet.stats.sleepiness = Math.min(100, pet.stats.sleepiness + diff * 6);
  pet.stats.mood = Math.max(15, pet.stats.mood - diff * 7);

  if (diff >= 1) {
    pet.goals.completedToday = 0;
    return randomFrom(DIALOGUES.lonely);
  }
  return null;
}

export function applyStudyStatusEffect(pet) {
  pet.stats.mood = clamp(pet.stats.mood + 5, 0, 100);
  pet.stats.hunger = clamp(pet.stats.hunger + 4, 0, 100);
  pet.stats.sleepiness = clamp(pet.stats.sleepiness + 2, 0, 100);
  pet.stats.affinity += 3;
}

export function applySnackEffect(pet, snack) {
  pet.stats.mood = clamp(pet.stats.mood + snack.mood, 0, 100);
  pet.stats.hunger = clamp(pet.stats.hunger + snack.hunger, 0, 100);
}

export function applyCareEffect(pet) {
  pet.stats.mood = clamp(pet.stats.mood + 9, 0, 100);
  pet.stats.sleepiness = clamp(pet.stats.sleepiness - 4, 0, 100);
  pet.stats.affinity += 4;
}

export function getStatusDialogue(pet) {
  if (pet.stats.hunger >= 80) return randomFrom(DIALOGUES.hungry);
  if (pet.stats.sleepiness >= 80) return randomFrom(DIALOGUES.sleepy);
  return null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
