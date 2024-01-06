"use client";

import { useSearchParams } from "next/navigation";
import PagesLayout from "../_layout/pages-layout";
import ShowsLayout from "../_layout/shows-layout";
import TrendingShows from "../_layout/trending-shows";
import useFilterShows from "../hooks/use-filter-shows";
import useShowsProviderContext from "../hooks/use-shows-provider-context";

export default function HomepageClient() {
  const { movies } = useShowsProviderContext();
  const filteredShows = useFilterShows(movies);
  const queryParam = useSearchParams().get("show");

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      {!queryParam && <TrendingShows />}
      <ShowsLayout title="Recommended for you" movieData={filteredShows} />
    </PagesLayout>
  );
}
