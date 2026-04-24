import { ROOM_ITEMS } from "./data.js";

export function getAvailableRoomItems(pet) {
  return ROOM_ITEMS.map((item) => ({
    ...item,
    unlocked: pet.level >= item.unlockLevel,
    equipped: pet.room.decorations.includes(item.id)
  }));
}

export function toggleRoomItem(pet, itemId) {
  const item = ROOM_ITEMS.find((x) => x.id === itemId);
  if (!item) return { ok: false, message: "없는 장식이에요." };
  if (pet.level < item.unlockLevel) {
    return { ok: false, message: `Lv.${item.unlockLevel}부터 사용할 수 있어요.` };
  }

  const index = pet.room.decorations.indexOf(itemId);
  if (index >= 0) {
    pet.room.decorations.splice(index, 1);
    return { ok: true, message: `${item.label}을/를 치웠어요.` };
  }

  pet.room.decorations.push(itemId);
  return { ok: true, message: `${item.label}을/를 둥지에 놓았어요.` };
}

export function getEquippedRoomAssets(pet) {
  return ROOM_ITEMS.filter((item) => pet.room.decorations.includes(item.id));
}
