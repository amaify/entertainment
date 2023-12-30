import { BkmarkedMovies } from "../app/[category]/bookmark-page";
import { Show } from "../app/page";

interface GetBookmarkedShows {
  show: Show;
  bkmarkedShow: BkmarkedMovies[] | null | undefined;
}

export function getBookmarkedShows({ show, bkmarkedShow }: GetBookmarkedShows) {
  const isBookmarked = bkmarkedShow?.find((movie) => movie.title === show.title);
  return !!isBookmarked;
}