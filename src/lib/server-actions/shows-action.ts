"use server";

import { fetchTMDB } from "@/helpers/service-client";
import type { Movie } from "@/src/app/layout";

export async function fetchMovies({ pageParam }: { pageParam: number }) {
  //   console.log(pageParam);
  const result = await fetchTMDB<Movie>({ path: "movie/popular", method: "GET", pageParam });
  return result.results;
}
