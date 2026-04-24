import { loadPet } from "./storage.js";
import { bindEvents, setCurrentPet } from "./events.js";
import { renderSetupOptions, showSetup, showMain, renderPet, setDialogue } from "./ui.js";
import { getRandomDialogue } from "./logic.js";

function init() {
  renderSetupOptions();
  bindEvents();

  const savedPet = loadPet();

  if (savedPet) {
    setCurrentPet(savedPet);
    showMain();
    renderPet(savedPet);
    setDialogue(getRandomDialogue(savedPet));
  } else {
    showSetup();
  }
}

init();
