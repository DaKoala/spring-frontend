export default function formatDate(timestamp: number, format: string): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fDay = day >= 10 ? `${day}` : `0${day}`;
  const fMonth = month >= 10 ? `${month}` : `0${month}`;
  return format.replace('YYYY', String(year))
    .replace('MM', fMonth)
    .replace('DD', fDay);
}

export function addMinute(time: string, addedMinute: number): string {
  let [hour, minute] = time.split(':').map((value) => parseInt(value, 10));
  minute += addedMinute;
  hour += Math.floor(minute / 60);
  minute %= 60;
  if (hour >= 24) {
    hour -= 24;
  }
  const hourStr = hour >= 10 ? String(hour) : `0${hour}`;
  const minuteStr = minute >= 10 ? String(minute) : `0${minute}`;
  return `${hourStr}:${minuteStr}`;
}

export function isFutureDay(date: Date): boolean {
  const now = new Date();
  const year = date.getFullYear();
  const currYear = now.getFullYear();
  if (year < currYear) {
    return false;
  }
  if (year > currYear) {
    return true;
  }
  const month = date.getMonth();
  const currMonth = now.getMonth();
  if (month < currMonth) {
    return false;
  }
  if (month > currMonth) {
    return true;
  }
  const day = date.getDate();
  const currDay = now.getDate();
  if (day > currDay) {
    return true;
  }
  return false;
}
