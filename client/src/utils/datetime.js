export function formatHour(isoTime) {
  return new Date(isoTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export function formatWeekday(dateStr) {
  return new Date(`${dateStr}T12:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
