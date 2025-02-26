export function formatSeconds(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export function formatTimeToString(time: {
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
}

export function formatSecondsToHMS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const time = { hours, minutes, seconds };
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
}
export function formatHMStoSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    throw new Error("Invalid time format. Expected hh:mm:ss");
  }
  return hours * 3600 + minutes * 60 + seconds;
}

export function calculateAverageSpeed(distance: number, time: number) {
  if (time === 0) {
    throw new Error("Le temps ne peut pas être égal à 0.");
  }
  return distance / 1000 / time;
}
