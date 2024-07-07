"use client";

import ShowsLayoutWrapper from "@/_layout/shows-layout-wrapper";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import Button from "@/components/ui/button";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import useIntersectionObserver from "@/hooks/use-observer-intersection";
import useShowsProviderContext from "@/hooks/use-shows-provider-context";
import type { Show, ShowCategory } from "src/app/layout";

interface Props {
  title: string;
  category: ShowCategory;
  bookmarkedShows?: Show[];
}

export default function ShowspageClient({ title, category, bookmarkedShows }: Props) {
  const { shows: allShows, hasNextPage, fetchNextPage, bookmarkedMovies } = useShowsProviderContext();
  const { observerElement, showLoadMoreButtoon } = useIntersectionObserver({ fetchNextPage, hasNextPage });

  const shows = bookmarkedShows ? bookmarkedShows : allShows;
  const data = shows.filter((movie) => movie.media_type === category) as Show[];

  return (
    <>
      <ShowsLayoutWrapper layoutTitle={title}>
        {data.map((movie) => (
          <ThumbnailCard
            key={movie.id}
            id={movie.id}
            category={movie.media_type}
            thumbnail={movie.backdrop_path}
            rating={movie.vote_average}
            isBookmarked={getBookmarkedShows({ show: movie, bookmarkedShow: bookmarkedMovies })}
            title={movie.title}
            year={+movie.release_date.split("-")[0]}
            isTrending={false}
          />
        ))}
      </ShowsLayoutWrapper>
      <div ref={observerElement} />
      {showLoadMoreButtoon && (
        <div className="mt-2 flex justify-center">
          <div className="w-64">
            <Button onClick={() => fetchNextPage()}>Load more</Button>
          </div>
        </div>
      )}
    </>
  );
}
