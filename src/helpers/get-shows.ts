import type { Show } from "@/app/layout";
import { TMDB_IMAGE_URI } from "./constants";
import { fetchTMDB } from "./service-client";

export const fetchShows = async ({ pageParam }: { pageParam: number }): Promise<Show[]> => {
  const [movies, tvSeries] = await Promise.all([
    fetchTMDB<Show>({ variant: "shows", path: "movie/popular", method: "GET", pageParam }),
    fetchTMDB<Show>({ variant: "shows", path: "tv/popular", method: "GET", pageParam })
  ]);

  const allShows = [
    ...movies.results.map((movie) => ({
      ...movie,
      title: movie.title,
      release_date: movie.release_date,
      media_type: "Movie" as Show["media_type"]
    })),
    ...tvSeries.results.map((tv) => ({
      ...tv,
      title: tv.name,
      release_date: tv.first_air_date,
      media_type: "TV Series" as Show["media_type"]
    }))
  ].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

  return allShows;
};

export const fetchSearchedShows = async ({ pageParam, queryString }: { pageParam: number; queryString: string }) => {
  const [movies, tvSeries] = await Promise.all([
    fetchTMDB<Show>({ variant: "searched-shows", path: "movie", method: "GET", pageParam, queryString }),
    fetchTMDB<Show>({ variant: "searched-shows", path: "tv", method: "GET", pageParam, queryString })
  ]);

  return [
    ...movies.results.map((movie) => ({
      ...movie,
      title: movie.title,
      release_date: movie.release_date,
      media_type: "Movie" as Show["media_type"]
    })),
    ...tvSeries.results.map((tv) => ({
      ...tv,
      title: tv.name,
      release_date: tv.first_air_date,
      media_type: "TV Series" as Show["media_type"]
    }))
  ].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
};

type ImageVariant = {
  desktop: "w500";
  tablet: "w342";
  mobile: "w185";
};

export function getImageUrl({ variant, path }: { variant: keyof ImageVariant; path: string }) {
  const imageWidth: Record<keyof ImageVariant, ImageVariant[keyof ImageVariant]> = {
    mobile: "w185",
    tablet: "w342",
    desktop: "w500"
  };
  return `${TMDB_IMAGE_URI}/${imageWidth[variant]}${path}`;
}
