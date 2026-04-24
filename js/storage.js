import { migratePet } from "./state.js";

const STORAGE_KEY = "kiwi_nest_pet_v2";

export function savePet(pet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}

export function loadPet() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return migratePet(JSON.parse(raw));
  } catch (error) {
    console.error("저장 데이터를 읽을 수 없습니다.", error);
    return null;
  }
}

export function clearPet() {
  localStorage.removeItem(STORAGE_KEY);
}
