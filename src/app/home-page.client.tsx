"use client";

import PagesLayout from "../components/layout/pages-layout";
import ShowsLayout from "../components/layout/shows-layout";
import TrendingShows from "../components/layout/trending-shows";
import type { Show } from "./page";
import useFilterShows from "./use-filter-shows";

interface Props {
  data: Show[];
}

export default function HomepageClient({ data }: Props) {
  const filteredShows = useFilterShows(data);

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout title="Recommended for you" movieData={filteredShows} />
    </PagesLayout>
  );
}
