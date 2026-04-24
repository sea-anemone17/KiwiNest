import { ANIMALS, THEMES, PERSONALITIES, SUBJECTS, DIFFICULTIES } from "./data.js";
import { getStageLabel } from "./logic.js";

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

    if (selectedSetup[key] === item.id) {
      btn.classList.add("selected");
    }

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
  if (theme && theme !== "green") {
    document.body.classList.add(`theme-${theme}`);
  }
}

export function renderPet(pet) {
  applyTheme(pet.theme);

  const animal = ANIMALS.find((item) => item.id === pet.animal) ?? ANIMALS[0];

  qs("petEmoji").textContent = animal.emoji;
  qs("petName").textContent = pet.name;
  qs("petLevel").textContent = `Lv.${pet.level}`;
  qs("stageLabel").textContent = getStageLabel(pet.level);

  qs("expText").textContent = `${pet.exp} / ${pet.expMax}`;
  qs("expFill").style.width = `${Math.min(100, (pet.exp / pet.expMax) * 100)}%`;

  qs("knowledgeStat").textContent = pet.stats.knowledge;
  qs("affinityStat").textContent = pet.stats.affinity;
  qs("moodStat").textContent = pet.stats.mood;
  qs("snackTicketStat").textContent = pet.tickets.snack;

  renderLogs(pet.logs);
}

export function setDialogue(text) {
  qs("dialogueText").textContent = text;
}

export function renderLogs(logs) {
  const list = qs("logList");
  list.innerHTML = "";

  if (!logs.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "아직 성장 일지가 없어요. 첫 공부를 기록해 볼까요?";
    list.appendChild(empty);
    return;
  }

  logs.slice(0, 30).forEach((log) => {
    const item = document.createElement("div");
    item.className = "log-item";

    const title = document.createElement("p");
    if (log.type === "study") {
      title.innerHTML = `<strong>${log.subject}</strong> — ${escapeHtml(log.content)}`;
    } else {
      title.innerHTML = `<strong>${log.type === "snack" ? "간식" : "돌봄"}</strong> — ${escapeHtml(log.content)}`;
    }

    const meta = document.createElement("div");
    meta.className = "log-meta";

    const parts = [log.date];
    if (log.expGained) parts.push(`EXP +${log.expGained}`);
    if (log.reward) parts.push(log.reward);
    if (log.ticketGained) parts.push("간식 티켓 +1");
    if (log.leveledUp) parts.push("레벨업!");

    meta.textContent = parts.join(" · ");

    item.append(title, meta);
    list.appendChild(item);
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
