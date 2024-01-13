"use client";

import TrendingShows from "./trending-shows";
import PagesLayout from "../_layout/pages-layout";
import ShowsLayout from "../_layout/shows-layout";
import useFilterShows from "../hooks/use-filter-shows";
import useShowsProviderContext from "../hooks/use-shows-provider-context";

export default function HomepageClient() {
  const { movies } = useShowsProviderContext();
  const filteredShows = useFilterShows(movies);

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout title="Recommended for you" movieData={filteredShows} />
    </PagesLayout>
  );
}
