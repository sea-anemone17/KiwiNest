import { createDefaultPet } from "./state.js";
import { savePet, clearPet, exportPet } from "./storage.js";
import { selectedSetup, qs, showSetup, showMain, renderPet, setDialogue } from "./ui.js";
import { recordStudy, giveSnack, recordCare, getRandomDialogue } from "./logic.js";

let currentPet = null;

export function setCurrentPet(pet) {
  currentPet = pet;
}

export function getCurrentPet() {
  return currentPet;
}

export function bindEvents() {
  qs("startBtn").addEventListener("click", handleStart);
  qs("completeStudyBtn").addEventListener("click", handleStudyComplete);
  qs("giveSnackBtn").addEventListener("click", handleSnack);
  qs("careBtn").addEventListener("click", handleCare);
  qs("resetBtn").addEventListener("click", handleReset);
  qs("backupBtn").addEventListener("click", () => {
    if (currentPet) exportPet(currentPet);
  });
}

function handleStart() {
  const name = qs("petNameInput").value.trim() || "몽글이";

  currentPet = createDefaultPet({
    name,
    animal: selectedSetup.animal,
    theme: selectedSetup.theme,
    personality: selectedSetup.personality
  });

  savePet(currentPet);
  showMain();
  renderPet(currentPet);
  setDialogue(`${currentPet.name}가 Hazel님의 공부를 기다리고 있어요.`);
}

function handleStudyComplete() {
  if (!currentPet) return;

  const subject = qs("subjectSelect").value;
  const content = qs("studyContentInput").value.trim();
  const difficulty = selectedSetup.difficulty;

  if (!content) {
    setDialogue("무엇을 공부했는지 한 줄만 적어 주세요!");
    return;
  }

  const result = recordStudy(currentPet, { subject, content, difficulty });
  savePet(currentPet);
  renderPet(currentPet);

  const base = getRandomDialogue(currentPet);
  const extra = [
    `EXP +${result.expGained}`,
    result.ticketGained ? "간식 티켓도 1장 얻었어요!" : null,
    result.leveledUp ? `레벨업! 이제 Lv.${currentPet.level}이에요!` : null
  ].filter(Boolean).join(" · ");

  setDialogue(`${base} ${extra}`);
  qs("studyContentInput").value = "";
}

function handleSnack() {
  if (!currentPet) return;

  const result = giveSnack(currentPet, "딸기우유");
  savePet(currentPet);
  renderPet(currentPet);
  setDialogue(result.message);
}

function handleCare() {
  if (!currentPet) return;

  const result = recordCare(currentPet);
  savePet(currentPet);
  renderPet(currentPet);
  setDialogue(result.message);
}

function handleReset() {
  const ok = confirm("정말 데이터를 초기화할까요? 현재 키우는 친구와 로그가 삭제됩니다.");
  if (!ok) return;

  clearPet();
  currentPet = null;
  showSetup();
  setDialogue("오늘은 뭘 배울까요?");
}
