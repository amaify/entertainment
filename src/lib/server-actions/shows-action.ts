"use server";

import type { Show } from "@/app/layout";
import { fetchTMDB } from "@/helpers/service-client";

export async function fetchMovies({ pageParam }: { pageParam: number }) {
  //   console.log(pageParam);
  const result = await fetchTMDB<Show>({ path: "movie/popular", method: "GET", pageParam });
  return result.results;
}
