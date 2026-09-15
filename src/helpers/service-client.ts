"use server";

import { env } from "./env";

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
    queryString,
}: FetchParams): Promise<T extends object[] ? FetchResponse<T> : T> {
    const TMBD_BASE_URI = env.NEXT_PUBLIC_TMDB_BASE_URI;
    const TMDB_API_KEY = env.NEXT_PUBLIC_TMDB_API_KEY;

    const url: Record<FetchVariant, string> = {
        shows: `${TMBD_BASE_URI}/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}`,
        "searched-shows": `${TMBD_BASE_URI}/search/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}&query=${queryString}`,
        "show-details": `${TMBD_BASE_URI}/${path}/${queryString}?api_key=${TMDB_API_KEY}`,
    };

    const options: RequestInit = {
        method,
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
        },
    };

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(url[variant], { ...options, signal: controller.signal });
        clearTimeout(id);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in fetchTMDB: ", error);
        throw error;
    }
}
