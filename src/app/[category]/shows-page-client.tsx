"use client";

// import { usePathname } from "next/navigation";
import ShowsLayout from "../_layout/shows-layout";
import useFilterShows from "../hooks/use-filter-shows";
import useShowsProviderContext from "../hooks/use-shows-provider-context";
import type { Movie } from "../layout";
import type { ShowCategory } from "../page";

interface Props {
  title: string;
  category: ShowCategory;
  bookmarkedShows?: Movie[];
}

export default function ShowspageClient({ title, category, bookmarkedShows }: Props) {
  // const pathname = usePathname();
  const { movies } = useShowsProviderContext();
  const shows = bookmarkedShows ? bookmarkedShows : movies;
  const data = shows.filter((movie) => movie.media_type === category) as Movie[];
  const filteredShows = useFilterShows(data);

  return <ShowsLayout title={title} movieData={filteredShows} />;
}
