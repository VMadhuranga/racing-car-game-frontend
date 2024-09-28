export default function formatTimeToMinSecMil(time) {
  const mil = Math.floor(time % 1000);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / 60000) % 60);
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${mil.toString().padStart(3, "0")}`;
}
