export function formatTime(ms) {
  return {
    minutes: ("0" + Math.floor(ms / 60000)).slice(-2),
    seconds: ("0" + Math.floor((ms / 1000) % 60)).slice(-2),
    miliseconds: ("0" + ((ms / 10) % 100)).slice(-2),
  };
}
