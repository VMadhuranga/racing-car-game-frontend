export default function formatTimeToMinSecMil(time) {
  const mil = Math.floor(time % 1000);
  const sec = Math.floor((time / 1000) % 60);
  const min = Math.floor((time / 60000) % 60);
  return `${min}:${sec}:${mil}`;
}
