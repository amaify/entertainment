import type { BkmarkedMovies } from "@/app/(movie-category)/[category]/bookmark-page";
import type { Show } from "@/app/layout";

interface GetBookmarkedShows {
  show: Show;
  bkmarkedShow: BkmarkedMovies[] | null | undefined;
}

export function getBookmarkedShows({ show, bkmarkedShow }: GetBookmarkedShows) {
  const isBookmarked = bkmarkedShow?.find((movie) => movie.title === show.title);
  return !!isBookmarked;
}
