import type { BookmarkedMovies } from "@/app/show-category/bookmark-page";
import type { Show } from "@/app/types";

interface GetBookmarkedShows {
    show: Show | BookmarkedMovies;
    bookmarkedShow: BookmarkedMovies[] | undefined;
}

export function getBookmarkedShows({ show, bookmarkedShow }: GetBookmarkedShows) {
    const isBookmarked = bookmarkedShow?.find((_show) => _show.title === show.title);

    return !!isBookmarked;
}
