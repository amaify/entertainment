"use client";

import PagesLayout from "@/_layout/pages-layout";
import ShowsLayoutWrapper from "@/_layout/shows-layout-wrapper";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import Typography from "@/components/typography/typography";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import useShowsProviderContext from "@/hooks/use-shows-provider-context";
import type { ShowCategory } from "src/app/layout";
import type { PageQueryParams } from "src/app/search/page";

export type BookmarkedMovies = {
  category: ShowCategory;
  title: string;
  show_id: number;
  year: number;
  rating: number;
  thumbnail: string;
};

export default function BookmarkPage({ searchParams: { q } }: PageQueryParams) {
  const { bookmarkedMovies } = useShowsProviderContext();

  let _bookmarkedShows = bookmarkedMovies;

  if (q) _bookmarkedShows = _bookmarkedShows?.filter((show) => show.title.toLowerCase().includes(q.toLowerCase()));

  const _bookmarkedMovies = _bookmarkedShows?.filter((show) => show.category === "Movie");
  const _bookmarkedSeries = _bookmarkedShows?.filter((show) => show.category === "TV Series");

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        <ShowsLayoutWrapper layoutTitle="Bookmarked Movies">
          {_bookmarkedMovies?.map((movie) => (
            <ThumbnailCard
              key={movie.show_id}
              id={movie.show_id}
              category={movie.category}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
              isBookmarked={getBookmarkedShows({ show: movie, bookmarkedShow: bookmarkedMovies })}
              title={movie.title}
              year={+movie.year}
              isTrending={false}
            />
          ))}
        </ShowsLayoutWrapper>
        {_bookmarkedMovies?.length === 0 && (
          <Typography as="p" intent="heading-medium-sm" className="w-full !text-primary">
            No bookmarked movies
          </Typography>
        )}
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        <ShowsLayoutWrapper layoutTitle="Bookmarked TV Series">
          {_bookmarkedSeries?.map((movie) => (
            <ThumbnailCard
              key={movie.show_id}
              id={movie.show_id}
              category={movie.category}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
              isBookmarked={getBookmarkedShows({ show: movie, bookmarkedShow: bookmarkedMovies })}
              title={movie.title}
              year={+movie.year}
              isTrending={false}
            />
          ))}
        </ShowsLayoutWrapper>
        {_bookmarkedSeries?.length === 0 && (
          <Typography as="p" intent="heading-medium-sm" className="w-full !text-primary">
            No bookmarked TV Series
          </Typography>
        )}
      </PagesLayout>
    </div>
  );
}
