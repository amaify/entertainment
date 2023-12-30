"use client";

import { useSearchParams } from "next/navigation";
import PagesLayout from "../components/layout/pages-layout";
import ShowsLayout from "../components/layout/shows-layout";
import TrendingShows from "../components/layout/trending-shows";
import type { Show } from "./page";

interface Props {
  data: Show[];
}

export default function HomepageClient({ data }: Props) {
  const searchParams = useSearchParams().get("show");
  let filteredShows = data;
  if (searchParams) filteredShows = data.filter((movie) => movie.title.toLowerCase().includes(searchParams));

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout title="Recommended for you" movieData={filteredShows} />
    </PagesLayout>
  );
}
