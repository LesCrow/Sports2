export function formatSecondsToHMS(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, "0");
  if (seconds === 0 && minutes === 0) {
    return `${pad(hours)}h`;
  }
  if (seconds === 0) {
    console.log(seconds);
    return `${pad(hours)}h${pad(minutes)}'`;
  }
  return `${pad(hours)}h${pad(minutes)}'${pad(seconds)}''`;
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

export function dateUtcToLocalDate(date: Date) {
  return new Date(date).toLocaleDateString();
}
