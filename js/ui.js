import { ANIMALS, THEMES, PERSONALITIES, SUBJECTS, DIFFICULTIES, SNACKS } from "./data.js";
import { getStageLabel } from "./logic.js";
import { getQuestProgress } from "./quests.js";
import { getAchievementView } from "./achievements.js";
import { getAvailableRoomItems, getEquippedRoomAssets } from "./room.js";

export const selectedSetup = {
  animal: "kiwi",
  theme: "green",
  personality: "playful",
  difficulty: "medium"
};

export function qs(id) {
  return document.getElementById(id);
}

export function renderSetupOptions() {
  renderOptionGroup("animalOptions", ANIMALS, "animal");
  renderOptionGroup("themeOptions", THEMES, "theme");
  renderOptionGroup("personalityOptions", PERSONALITIES, "personality");
  renderOptionGroup("difficultyOptions", DIFFICULTIES, "difficulty");
  renderSubjects();
}

function renderOptionGroup(containerId, items, key) {
  const container = qs(containerId);
  container.innerHTML = "";

  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.dataset.value = item.id;
    btn.dataset.key = key;
    btn.textContent = `${item.emoji ? item.emoji + " " : ""}${item.label}`;

    if (selectedSetup[key] === item.id) btn.classList.add("selected");

    btn.addEventListener("click", () => {
      selectedSetup[key] = item.id;
      renderOptionGroup(containerId, items, key);
    });

    container.appendChild(btn);
  });
}

function renderSubjects() {
  const select = qs("subjectSelect");
  select.innerHTML = "";
  SUBJECTS.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    select.appendChild(option);
  });
}

export function showSetup() {
  qs("setupScreen").classList.remove("hidden");
  qs("mainScreen").classList.add("hidden");
}

export function showMain() {
  qs("setupScreen").classList.add("hidden");
  qs("mainScreen").classList.remove("hidden");
}

export function applyTheme(theme) {
  document.body.className = "";
  if (theme && theme !== "green") document.body.classList.add(`theme-${theme}`);
}

export function renderAll(pet) {
  renderPet(pet);
  renderQuests(pet);
  renderSnacks();
  renderRoom(pet);
  renderAchievements(pet);
  renderLogs(pet.logs);
  renderDiary(pet);
}

export function renderPet(pet) {
  applyTheme(pet.theme);

  const animal = ANIMALS.find((item) => item.id === pet.animal) ?? ANIMALS[0];
  const image = getAnimalImage(animal, pet.level);

  const imageEl = qs("petImage");
  const emojiEl = qs("petEmoji");

  if (image) {
    imageEl.src = image;
    imageEl.classList.remove("hidden");
    emojiEl.classList.add("hidden");
  } else {
    imageEl.classList.add("hidden");
    emojiEl.classList.remove("hidden");
    emojiEl.textContent = animal.emoji;
  }

  qs("petName").textContent = pet.name;
  qs("petLevel").textContent = `Lv.${pet.level}`;
  qs("stageLabel").textContent = getStageLabel(pet.level);

  qs("expText").textContent = `${pet.exp} / ${pet.expMax}`;
  qs("expFill").style.width = `${Math.min(100, (pet.exp / pet.expMax) * 100)}%`;

  qs("knowledgeStat").textContent = pet.stats.knowledge;
  qs("affinityStat").textContent = pet.stats.affinity;
  qs("moodStat").textContent = pet.stats.mood;
  qs("hungerStat").textContent = pet.stats.hunger;
  qs("sleepinessStat").textContent = pet.stats.sleepiness;
  qs("streakStat").textContent = pet.streak.count;
  qs("snackTicketStat").textContent = pet.tickets.snack;
  qs("careTicketStat").textContent = pet.tickets.care;
  qs("todayTargetInput").value = pet.goals.todayTarget;

  renderRoomDecorations(pet);
}

function getAnimalImage(animal, level) {
  if (!animal.imageStages) return null;
  if (level >= 8) return animal.imageStages[2];
  if (level >= 4) return animal.imageStages[1];
  return animal.imageStages[0];
}

export function setDialogue(text) {
  qs("dialogueText").textContent = text;
}

export function renderMission(pet) {
  qs("dailyMissionText").textContent = pet.goals.mission?.text ?? "오늘의 미션을 불러오는 중이에요.";
}

export function renderQuests(pet) {
  renderMission(pet);
  const list = qs("questList");
  list.innerHTML = "";
  for (const quest of getQuestProgress(pet)) {
    const item = document.createElement("div");
    item.className = `quest-item ${quest.done ? "done" : ""}`;
    item.innerHTML = `<strong>${quest.done ? "✅" : "⬜"} ${quest.label}</strong><div class="log-meta">${quest.progress}</div>`;
    list.appendChild(item);
  }
}

export function renderSnacks() {
  const list = qs("snackList");
  list.innerHTML = "";
  for (const snack of SNACKS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item-btn";
    btn.dataset.snackId = snack.id;
    btn.textContent = `${snack.emoji} ${snack.label}`;
    list.appendChild(btn);
  }
}

export function renderRoom(pet) {
  const list = qs("roomItemList");
  list.innerHTML = "";
  for (const item of getAvailableRoomItems(pet)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `item-btn ${item.equipped ? "equipped" : ""} ${item.unlocked ? "" : "locked"}`;
    btn.dataset.roomItemId = item.id;
    btn.textContent = `${item.emoji} ${item.label} ${item.unlocked ? "" : `(Lv.${item.unlockLevel})`}`;
    list.appendChild(btn);
  }
  renderRoomDecorations(pet);
}

function renderRoomDecorations(pet) {
  const wrap = qs("roomDecorations");
  wrap.innerHTML = "";
  for (const item of getEquippedRoomAssets(pet)) {
    const img = document.createElement("img");
    img.src = item.asset;
    img.alt = item.label;
    wrap.appendChild(img);
  }
}

export function renderAchievements(pet) {
  const list = qs("achievementList");
  list.innerHTML = "";
  for (const achievement of getAchievementView(pet)) {
    const item = document.createElement("div");
    item.className = `achievement-item ${achievement.unlocked ? "unlocked" : ""}`;
    item.innerHTML = `<strong>${achievement.unlocked ? "🏅" : "🔒"} ${achievement.title}</strong><div class="log-meta">${achievement.description}</div>`;
    list.appendChild(item);
  }
}

export function renderLogs(logs) {
  const list = qs("logList");
  list.innerHTML = "";
  if (!logs.length) {
    list.innerHTML = `<p class="muted">아직 성장 일지가 없어요. 첫 공부를 기록해 볼까요?</p>`;
    return;
  }

  logs.slice(0, 50).forEach((log) => {
    const item = document.createElement("div");
    item.className = "log-item";

    const title = document.createElement("p");
    if (log.type === "study") {
      title.innerHTML = `<strong>${escapeHtml(log.subject)}</strong> — ${escapeHtml(log.content)}`;
    } else {
      title.innerHTML = `<strong>${escapeHtml(log.label ?? log.type)}</strong> — ${escapeHtml(log.content)}`;
    }

    const meta = document.createElement("div");
    meta.className = "log-meta";

    const parts = [log.date];
    if (log.expGained) parts.push(`EXP +${log.expGained}`);
    if (log.reward) parts.push(log.reward);
    if (log.leveledUp) parts.push("레벨업!");
    meta.textContent = parts.join(" · ");

    item.append(title, meta);
    list.appendChild(item);
  });
}

export function renderDiary(pet) {
  const list = qs("diaryList");
  list.innerHTML = "";
  const entries = [...pet.letters, ...pet.diary].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  if (!entries.length) {
    list.innerHTML = `<p class="muted">아직 키위 일기가 없어요.</p>`;
    return;
  }

  entries.slice(0, 50).forEach((entry) => {
    const item = document.createElement("div");
    item.className = "log-item";
    item.innerHTML = `<p><strong>${entry.type === "letter" ? "💌 편지" : "🥝 일기"}</strong></p><p>${escapeHtml(entry.content)}</p><div class="log-meta">${entry.date}</div>`;
    list.appendChild(item);
  });
}

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
