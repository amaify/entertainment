"use client";

import ShowsLayout from "@/src/app/_layout/shows-layout";
import useFilterShows from "../_components/use-filter-shows";
import type { Show, ShowCategory } from "../page";

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
