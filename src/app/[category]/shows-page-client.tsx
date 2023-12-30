"use client";

import ShowsLayout from "@/src/components/layout/shows-layout";
import type { Show, ShowCategory } from "../page";
import useFilterShows from "../use-filter-shows";

interface Props {
  title: string;
  movieData: Show[];
  category: ShowCategory;
}

export default function ShowspageClient({ title, movieData, category }: Props) {
  const data = movieData.filter((movie) => movie.category === category) as Show[];
  const filteredShows = useFilterShows(data);

  return <ShowsLayout title={title} movieData={filteredShows} />;
}
