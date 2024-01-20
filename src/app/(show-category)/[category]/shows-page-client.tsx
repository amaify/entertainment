"use client";

import ShowsLayout from "@/app/_layout/shows-layout";
// import useFilterShows from "@/app/hooks/use-filter-shows";
import useIntersectionObserver from "@/app/hooks/use-observer-intersection";
import useShowsProviderContext from "@/app/hooks/use-shows-provider-context";
import type { Show, ShowCategory } from "@/app/layout";
import Button from "@/components/ui/button";

// import { usePathname } from "next/navigation";

interface Props {
  title: string;
  category: ShowCategory;
  bookmarkedShows?: Show[];
}

export default function ShowspageClient({ title, category, bookmarkedShows }: Props) {
  // const pathname = usePathname();
  const {
    shows: allShows,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useShowsProviderContext();
  const { observerElement, showLoadMoreButtoon } = useIntersectionObserver({ fetchNextPage, hasNextPage });
  const shows = bookmarkedShows ? bookmarkedShows : allShows;
  const data = shows.filter((movie) => movie.media_type === category) as Show[];
  // const filteredShows = useFilterShows(data);

  return (
    <>
      <ShowsLayout
        title={title}
        shows={data}
        error={error}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
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
