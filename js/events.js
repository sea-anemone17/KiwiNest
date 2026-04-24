import { createDefaultPet, migratePet } from "./state.js";
import { savePet, clearPet } from "./storage.js";
import { selectedSetup, qs, showSetup, showMain, renderAll, renderSetupOptions, setDialogue } from "./ui.js";
import { recordStudy, getRandomDialogue } from "./logic.js";
import { ensureDailyMission, setTodayTarget } from "./quests.js";
import { updateDailyStatus, applySnackEffect, applyCareEffect, getStatusDialogue } from "./petStatus.js";
import { recordSiblingAction, generateLetter } from "./diary.js";
import { SNACKS } from "./data.js";
import { toggleRoomItem } from "./room.js";
import { exportData, importData } from "./importExport.js";

let currentPet = null;

export function setCurrentPet(pet) { currentPet = pet; }
export function getCurrentPet() { return currentPet; }

export function bindEvents() {
  qs("startBtn").addEventListener("click", handleStart);
  qs("completeStudyBtn").addEventListener("click", handleStudyComplete);
  qs("studyTogetherBtn").addEventListener("click", () => handleSiblingAction("studyTogether", "같이 공부한 걸 기록했어요."));
  qs("patHeadBtn").addEventListener("click", handlePatHead);
  qs("letterBtn").addEventListener("click", handleLetter);
  qs("refreshMissionBtn").addEventListener("click", handleRefreshMission);
  qs("setTargetBtn").addEventListener("click", handleSetTarget);
  qs("resetBtn").addEventListener("click", handleReset);
  qs("exportBtn").addEventListener("click", () => currentPet && exportData(currentPet));
  qs("importInput").addEventListener("change", handleImport);
  qs("clearDiaryBtn").addEventListener("click", handleClearDiary);

  qs("snackList").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-snack-id]");
    if (btn) handleSnack(btn.dataset.snackId);
  });

  qs("roomItemList").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-room-item-id]");
    if (btn) handleRoomItem(btn.dataset.roomItemId);
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
  ensureDailyMission(currentPet, true);
  saveAndRender(`${currentPet.name}의 둥지가 생겼어요. 오늘 하나만 알려 줘도 충분해요.`);
  showMain();
}

function handleStudyComplete() {
  if (!currentPet) return;

  const subject = qs("subjectSelect").value;
  const content = qs("studyContentInput").value.trim();
  const summary = qs("summaryInput").value.trim();
  const confusion = qs("confusionInput").value.trim();
  const understanding = selectedSetup.understanding;
  const difficulty = selectedSetup.difficulty;

  if (!content) {
    setDialogue("무엇을 공부했는지 한 줄만 적어 주세요!");
    return;
  }

  const result = recordStudy(currentPet, {
    subject,
    content,
    difficulty,
    summary,
    confusion,
    understanding
  });
  ensureDailyMission(currentPet);

  const status = getStatusDialogue(currentPet);
  const achievementMsg = result.achievements.length
    ? ` 새 업적 ${result.achievements.length}개 해금!`
    : "";
  const questMsg = result.questMessages.length ? ` ${result.questMessages.join(" ")}` : "";

  saveAndRender(`${getRandomDialogue(currentPet)} EXP +${result.expGained}.${result.leveledUp ? ` 레벨업! Lv.${currentPet.level}!` : ""}${questMsg}${achievementMsg} ${status ?? ""}`);
  qs("studyContentInput").value = "";
}

function handleSnack(snackId) {
  if (!currentPet) return;
  const snack = SNACKS.find((x) => x.id === snackId);
  if (!snack) return;

  if (currentPet.tickets.snack < snack.ticketCost) {
    setDialogue("간식 티켓이 부족해요. 공부 3회마다 티켓을 얻을 수 있어요!");
    return;
  }

  currentPet.tickets.snack -= snack.ticketCost;
  applySnackEffect(currentPet, snack);
  recordSiblingAction(currentPet, "snackReal");

  currentPet.logs.unshift({
    id: crypto.randomUUID(),
    type: "snack",
    label: "간식",
    date: new Date().toLocaleString("ko-KR"),
    content: `${snack.label} 주기 완료`,
    expGained: 0
  });

  saveAndRender(`${currentPet.name}에게 ${snack.label}를 줬어요. 기분이 좋아졌어요.`);
}

function handlePatHead() {
  if (!currentPet) return;

  if (currentPet.tickets.care <= 0) {
    setDialogue("돌봄 티켓이 없어요. 그래도 머리에 손 올리기는 기록할 수 있지만, 보상은 작게 들어가요.");
    currentPet.stats.affinity += 1;
  } else {
    currentPet.tickets.care -= 1;
    applyCareEffect(currentPet);
  }

  recordSiblingAction(currentPet, "patHead");

  currentPet.logs.unshift({
    id: crypto.randomUUID(),
    type: "care",
    label: "돌봄",
    date: new Date().toLocaleString("ko-KR"),
    content: "머리에 손 올리기 기록 완료",
    expGained: 0
  });

  saveAndRender("머리에 손을 올려 줬어요. 친밀도가 올랐어요.");
}

function handleSiblingAction(action, message) {
  if (!currentPet) return;
  recordSiblingAction(currentPet, action);
  currentPet.stats.affinity += 2;
  currentPet.stats.mood = Math.min(100, currentPet.stats.mood + 5);
  saveAndRender(message);
}

function handleLetter() {
  if (!currentPet) return;
  const letter = generateLetter(currentPet);
  saveAndRender(`💌 ${letter}`);
}

function handleRefreshMission() {
  if (!currentPet) return;
  ensureDailyMission(currentPet, true);
  saveAndRender("오늘의 미션을 새로 골랐어요.");
}

function handleSetTarget() {
  if (!currentPet) return;
  setTodayTarget(currentPet, qs("todayTargetInput").value);
  saveAndRender(`오늘 목표를 ${currentPet.goals.todayTarget}회로 설정했어요.`);
}

function handleRoomItem(itemId) {
  if (!currentPet) return;
  const result = toggleRoomItem(currentPet, itemId);
  saveAndRender(result.message);
}

function handleReset() {
  const ok = confirm("정말 데이터를 초기화할까요? 현재 둥지와 기록이 삭제됩니다.");
  if (!ok) return;
  clearPet();
  currentPet = null;
  renderSetupOptions();
  showSetup();
}

async function handleImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    currentPet = migratePet(await importData(file));
    ensureDailyMission(currentPet);
    saveAndRender("백업 데이터를 불러왔어요.");
    showMain();
  } catch (error) {
    setDialogue(error.message);
  } finally {
    event.target.value = "";
  }
}

function handleClearDiary() {
  if (!currentPet) return;
  const ok = confirm("키위 일기와 편지를 정리할까요? 성장 일지는 유지됩니다.");
  if (!ok) return;
  currentPet.diary = [];
  currentPet.letters = [];
  saveAndRender("키위 일기장을 정리했어요.");
}

export function bootPet(pet) {
  currentPet = pet;
  ensureDailyMission(currentPet);
  const message = updateDailyStatus(currentPet);
  saveAndRender(message ?? getRandomDialogue(currentPet));
  showMain();
}

function saveAndRender(message) {
  savePet(currentPet);
  renderAll(currentPet);
  if (message) setDialogue(message);
}
