import { TMBD_BASE_URI, TMDB_API_KEY, TMDB_IMAGE_URI } from "./constants";

export type FetchVariant = "shows" | "searched-shows";

interface FetchParams {
  variant: FetchVariant;
  path: "movie/popular" | "trending/all/day" | "tv/popular" | "movie" | "tv";
  method: "GET" | "POST";
  pageParam: number;
  queryString?: string;
}

interface FetchResponse<T> {
  results: T[];
  total_pages: number;
  total_results: number;
}

export async function fetchTMDB<T extends any>({
  variant,
  path,
  method,
  pageParam,
  queryString
}: FetchParams): Promise<FetchResponse<T>> {
  let url = `${TMBD_BASE_URI}/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}`;
  if (variant === "searched-shows") {
    url = `${TMBD_BASE_URI}/search/${path}?api_key=${TMDB_API_KEY}&page=${pageParam}&query=${queryString}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetchTMDB: ", error);
    throw error;
  }
}

type ImageVariant = {
  desktop: "w500";
  tablet: "w342";
  mobile: "w185";
};

export function getMovieImage({ variant, path }: { variant: keyof ImageVariant; path: string }) {
  const imageWidth: Record<keyof ImageVariant, ImageVariant[keyof ImageVariant]> = {
    mobile: "w185",
    tablet: "w342",
    desktop: "w500"
  };
  return `${TMDB_IMAGE_URI}/${imageWidth[variant]}${path}`;
}
