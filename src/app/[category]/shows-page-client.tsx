"use client";

import ShowsLayout from "@/app/_layout/shows-layout";
import useFilterShows from "@/app/hooks/use-filter-shows";
import useShowsProviderContext from "@/app/hooks/use-shows-provider-context";
import type { Show, ShowCategory } from "@/app/layout";

// import { usePathname } from "next/navigation";

interface Props {
  title: string;
  category: ShowCategory;
  bookmarkedShows?: Show[];
}

export default function ShowspageClient({ title, category, bookmarkedShows }: Props) {
  // const pathname = usePathname();
  const { movies } = useShowsProviderContext();
  const shows = bookmarkedShows ? bookmarkedShows : movies;
  const data = shows.filter((movie) => movie.media_type === category) as Show[];
  const filteredShows = useFilterShows(data);

  return <ShowsLayout title={title} movieData={filteredShows} />;
}
