// Utilities for localStorage persistence

const MOODS_KEY = "yeartracker_moods";
const DAYCOLORS_KEY = "yeartracker_daycolors";

export function saveMoods(moods) {
  localStorage.setItem(MOODS_KEY, JSON.stringify(moods));
}

export function loadMoods() {
  try {
    return JSON.parse(localStorage.getItem(MOODS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveDayColors(dayColors) {
  localStorage.setItem(DAYCOLORS_KEY, JSON.stringify(dayColors));
}

export function loadDayColors() {
  try {
    return JSON.parse(localStorage.getItem(DAYCOLORS_KEY)) || {};
  } catch {
    return {};
  }
}
