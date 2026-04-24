const STORAGE_KEY = "dear_kiwi_pet_v1";

export function savePet(pet) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pet));
}

export function loadPet() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("저장 데이터를 읽을 수 없습니다.", error);
    return null;
  }
}

export function clearPet() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportPet(pet) {
  const blob = new Blob([JSON.stringify(pet, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dear-kiwi-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
