"use client";

import { useSearchParams } from "next/navigation";
import PagesLayout from "../_layout/pages-layout";
import ShowsLayout from "../_layout/shows-layout";
import TrendingShows from "../_layout/trending-shows";
import type { Show } from "../page";
import useFilterShows from "./use-filter-shows";

interface Props {
  data: Show[];
}

export default function HomepageClient({ data }: Props) {
  const filteredShows = useFilterShows(data);
  const queryParam = useSearchParams().get("show");

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      {!queryParam && <TrendingShows />}
      <ShowsLayout title="Recommended for you" movieData={filteredShows} />
    </PagesLayout>
  );
}
