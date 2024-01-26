"use client";

import PagesLayout from "./_layout/pages-layout";
import ShowsLayout from "./_layout/shows-layout";
import TrendingShows from "./_layout/trending-shows";
import { useShowsProviderContext } from "./show-provider";

export default function Home() {
  const { shows: allShows, error, isLoading, isFetchingNextPage } = useShowsProviderContext();

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout
        title="Recommended for you"
        shows={allShows}
        isLoading={isLoading}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
      />
    </PagesLayout>
  );
}
