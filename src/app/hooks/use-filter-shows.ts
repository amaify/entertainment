import { useSearchParams } from "next/navigation";
import type { Show } from "../layout";

export default function useFilterShows(data: Show[]) {
  const searchParams = useSearchParams().get("show");
  let filteredShows = data;
  if (searchParams)
    filteredShows = data.filter((movie) => movie.title.toLowerCase().includes(searchParams.toLowerCase()));

  return filteredShows;
}
