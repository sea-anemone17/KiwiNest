export function exportData(pet) {
  const blob = new Blob([JSON.stringify(pet, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `KiwiNest-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result));
      } catch (error) {
        reject(new Error("JSON 파일을 읽을 수 없습니다."));
      }
    };
    reader.onerror = () => reject(new Error("파일을 읽는 중 문제가 생겼습니다."));
    reader.readAsText(file, "utf-8");
  });
}
