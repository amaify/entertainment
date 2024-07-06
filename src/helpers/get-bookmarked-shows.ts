import type { BookmarkedMovies } from "@/app/[category]/bookmark-page";
import type { Show } from "@/app/layout";

interface GetBookmarkedShows {
  show: Show | BookmarkedMovies;
  bookmarkedShow: BookmarkedMovies[] | undefined;
}

export function getBookmarkedShows({ show, bookmarkedShow }: GetBookmarkedShows) {
  const isBookmarked = bookmarkedShow?.find((_show) => _show.title === show.title);

  return !!isBookmarked;
}
