export function formatDate(timestamp: number, format: string) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fDay = day > 10 ? `${day}` : `0${day}`;
  const fMonth = month > 10 ? `${month}` : `0${month}`;
  return format.replace('YYYY', String(year))
    .replace('MM', fMonth)
    .replace('DD', fDay);
}
