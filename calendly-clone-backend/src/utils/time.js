export function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(mins) {
  const h = String(Math.floor(mins / 60)).padStart(2, "0");
  const m = String(mins % 60).padStart(2, "0");
  return `${h}:${m}`;
}
