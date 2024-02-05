export function getYear(date: string) {
  const [year] = date.split("-");
  return year;
}

export function convertMinsToHrsMins(mins: number) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}
