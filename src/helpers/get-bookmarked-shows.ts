import type { Show } from "@/app/layout";
import type { BkmarkedMovies } from "@/app/show-category/bookmark-page";

interface GetBookmarkedShows {
  show: Show;
  bkmarkedShow: BkmarkedMovies[] | null | undefined;
}

export function getBookmarkedShows({ show, bkmarkedShow }: GetBookmarkedShows) {
  const isBookmarked = bkmarkedShow?.find((movie) => movie.title === show.title);
  return !!isBookmarked;
}
