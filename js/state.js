export function createDefaultPet({ name, animal, theme, personality }) {
  return {
    name,
    animal,
    theme,
    personality,

    level: 1,
    exp: 0,
    expMax: 100,

    stats: {
      mood: 70,
      knowledge: 0,
      affinity: 0
    },

    tickets: {
      snack: 0,
      care: 0
    },

    studyCountToday: 0,
    totalStudyCount: 0,
    lastStudyDate: null,
    streak: 0,

    logs: []
  };
}
