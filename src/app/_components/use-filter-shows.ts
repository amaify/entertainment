import { useSearchParams } from "next/navigation";
import { Show } from "../page";

export default function useFilterShows(data: Show[]) {
  const searchParams = useSearchParams().get("show");
  let filteredShows = data;
  if (searchParams) filteredShows = data.filter((movie) => movie.title.toLowerCase().includes(searchParams));

  return filteredShows;
}
