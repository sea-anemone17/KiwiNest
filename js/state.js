export function createDefaultPet({ name, animal, theme, personality }) {
  return {
    version: 2,
    name,
    animal,
    theme,
    personality,

    level: 1,
    exp: 0,
    expMax: 100,

    stats: {
      mood: 70,
      hunger: 45,
      sleepiness: 20,
      knowledge: 0,
      affinity: 0
    },

    tickets: {
      snack: 0,
      care: 0
    },

    goals: {
      todayTarget: 3,
      completedToday: 0,
      mission: null,
      missionDate: null
    },

    streak: {
      count: 0,
      lastStudyDate: null
    },

    subjectCounts: {},
    totalStudyCount: 0,

    inventory: {
      snacks: [],
      items: [],
      roomItems: []
    },

    room: {
      wallpaper: "basic",
      floor: "basic",
      decorations: []
    },

    achievements: [],
    logs: [],
    diary: [],
    letters: [],
    reviewQueue: [],

    session: {
      active: false,
      start: null,
      targetMinutes: 25
    }
  };
}

export function migratePet(rawPet) {
  const pet = rawPet || {};
  pet.version = 2;
  pet.stats = {
    mood: pet.stats?.mood ?? 70,
    hunger: pet.stats?.hunger ?? 45,
    sleepiness: pet.stats?.sleepiness ?? 20,
    knowledge: pet.stats?.knowledge ?? 0,
    affinity: pet.stats?.affinity ?? 0
  };
  pet.tickets = {
    snack: pet.tickets?.snack ?? 0,
    care: pet.tickets?.care ?? 0
  };
  pet.goals = {
    todayTarget: pet.goals?.todayTarget ?? 3,
    completedToday: pet.goals?.completedToday ?? pet.studyCountToday ?? 0,
    mission: pet.goals?.mission ?? null,
    missionDate: pet.goals?.missionDate ?? null
  };
  pet.streak = {
    count: pet.streak?.count ?? 0,
    lastStudyDate: pet.streak?.lastStudyDate ?? pet.lastStudyDate ?? null
  };
  pet.subjectCounts = pet.subjectCounts ?? {};
  pet.totalStudyCount = pet.totalStudyCount ?? 0;
  pet.inventory = pet.inventory ?? { snacks: [], items: [], roomItems: [] };
  pet.inventory.snacks = pet.inventory.snacks ?? [];
  pet.inventory.items = pet.inventory.items ?? [];
  pet.inventory.roomItems = pet.inventory.roomItems ?? [];
  pet.room = pet.room ?? { wallpaper: "basic", floor: "basic", decorations: [] };
  pet.room.decorations = pet.room.decorations ?? [];
  pet.achievements = pet.achievements ?? [];
  pet.logs = pet.logs ?? [];
  pet.diary = pet.diary ?? [];
  pet.letters = pet.letters ?? [];
  pet.reviewQueue = pet.reviewQueue ?? [];

  pet.session = {
    active: pet.session?.active ?? false,
    start: pet.session?.start ?? null,
    targetMinutes: pet.session?.targetMinutes ?? 25
  };
  return pet;
}
