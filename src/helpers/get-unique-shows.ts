import type { Show } from "@/app/layout";

export function getUniquShows(shows: Show[]) {
  const ids = shows.map(({ id }) => id);
  const uniqueShows = shows
    .filter(({ id }, idx) => !ids.includes(id, idx + 1))
    .filter((show) => show.backdrop_path !== null);

  return uniqueShows;
}
