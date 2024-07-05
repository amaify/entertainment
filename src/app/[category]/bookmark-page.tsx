"use client";

import PagesLayout from "@/app/_layout/pages-layout";
import type { Show } from "@/app/layout";
import Typography from "@/components/typography/typography";
import ShowspageClient from "./shows-page-client";
import { useShowsProviderContext } from "../show-provider";

export type BookmarkedMovies = {
  title: string;
  category: string;
};

export default function BookmarkPage() {
  const { shows, bookmarkedMovies } = useShowsProviderContext();

  const _bookmarkedShows = shows.filter((movie) =>
    bookmarkedMovies?.some((bMovie) => bMovie.title === movie.title)
  ) as Show[];

  const _bookmarkedMovies = _bookmarkedShows.filter((show) => show.media_type === "Movie");
  const _bookmarkedSeries = _bookmarkedShows.filter((show) => show.media_type === "TV Series");

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        <ShowspageClient title="Bookmarked Movies" category="Movie" bookmarkedShows={_bookmarkedShows} />
        {_bookmarkedMovies.length === 0 && (
          <Typography as="p" intent="heading-medium-sm" className="w-full !text-primary">
            No bookmarked movies
          </Typography>
        )}
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        <ShowspageClient title="Bookmarked TV Series" category="TV Series" bookmarkedShows={_bookmarkedShows} />
        {_bookmarkedSeries.length === 0 && (
          <Typography as="p" intent="heading-medium-sm" className="w-full !text-primary">
            No bookmarked TV Series
          </Typography>
        )}
      </PagesLayout>
    </div>
  );
}
