"use server";

import { TMBD_BASE_URI, TMDB_API_KEY } from "./constants";

export type FetchVariant = "shows" | "searched-shows" | "show-details";

interface FetchParams {
  variant: FetchVariant;
  path: "movie/popular" | "trending/all/day" | "tv/popular" | "movie" | "tv";
  method: "GET" | "POST";
  pageParam?: number;
  queryString?: string;
}

interface FetchResponse<T> {
  results: T;
  total_pages: number;
  total_results: number;
}

export async function fetchTMDB<T>({
  variant,
  path,
  method,
  pageParam,
  queryString
}: FetchParams): Promise<T extends any[] ? FetchResponse<T> : T> {
  const url: Record<FetchVariant, string> = {
    shows: `${TMBD_BASE_URI}/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}`,
    "searched-shows": `${TMBD_BASE_URI}/search/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}&query=${queryString}`,
    "show-details": `${TMBD_BASE_URI}/${path}/${queryString}?api_key=${TMDB_API_KEY}`
  };

  const options: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`
    }
  };

  try {
    const response = await fetch(url[variant], options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetchTMDB: ", error);
    throw error;
  }
}
