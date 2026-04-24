import { loadPet } from "./storage.js";
import { bindEvents, bootPet } from "./events.js";
import { renderSetupOptions, showSetup } from "./ui.js";

function init() {
  renderSetupOptions();
  bindEvents();

  const savedPet = loadPet();

  if (savedPet) {
    bootPet(savedPet);
  } else {
    showSetup();
  }
}

init();
