"use client";

import ShowspageClient from "./shows-page-client";
import PagesLayout from "../_layout/pages-layout";
import { useAppProviderContext } from "../hooks/use-app-provider-context";
import useShowsProviderContext from "../hooks/use-shows-provider-context";
import type { Movie } from "../layout";

export type BkmarkedMovies = {
  title: string;
  category: string;
};

export default function BookmarkPage() {
  const { movies } = useShowsProviderContext();
  const { bkmarkedMovies } = useAppProviderContext();

  const bookmarkedMovies = movies.filter(
    (movie) => bkmarkedMovies?.some((bMovie) => bMovie.title === movie.title)
  ) as Movie[];

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        <ShowspageClient title="Bookmarked Movies" bookmarkedShows={bookmarkedMovies} category="Movie" />
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        <ShowspageClient title="Bookmarked TV Series" bookmarkedShows={bookmarkedMovies} category="TV Series" />
      </PagesLayout>
    </div>
  );
}
