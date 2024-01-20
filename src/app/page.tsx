"use client";

import { fetchShows } from "@/helpers/get-shows";
import { getUniquShows } from "@/helpers/get-unique-shows";
import PagesLayout from "./_layout/pages-layout";
import ShowsLayout from "./_layout/shows-layout";
import TrendingShows from "./_layout/trending-shows";
import useCustomInfiniteQueryHook from "./hooks/use-custom-infinite-query-hook";
import useIntersectionObserver from "./hooks/use-observer-intersection";
// import useFilterShows from "../hooks/use-filter-shows";
// import useShowsProviderContext from "../hooks/use-shows-provider-context";

export default function Home() {
  // const { movies } = useShowsProviderContext();
  // const filteredShows = useFilterShows(movies);

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useCustomInfiniteQueryHook({
    queryKey: ["shows"],
    queryFunction: ({ pageParam }) => fetchShows({ pageParam })
  });

  const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });
  const uniqueShows = getUniquShows(data?.pages.flat() ?? []);

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout
        title="Recommended for you"
        shows={uniqueShows}
        isLoading={isLoading}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
      />
      <div ref={observerElement} />
    </PagesLayout>
  );
}
