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
}

export default function ShowspageClient({ title, category }: Props) {
  // const pathname = usePathname();
  const { movies } = useShowsProviderContext();
  const data = movies.filter((movie) => movie.media_type === category) as Movie[];
  const filteredShows = useFilterShows(data);

  return <ShowsLayout title={title} movieData={filteredShows} />;
}
