import { useSearchParams } from "next/navigation";
import type { Movie } from "../layout";

export default function useFilterShows(data: Movie[]) {
  const searchParams = useSearchParams().get("show");
  let filteredShows = data;
  if (searchParams)
    filteredShows = data.filter((movie) => movie.title.toLowerCase().includes(searchParams.toLowerCase()));

  return filteredShows;
}
