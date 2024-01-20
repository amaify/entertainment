"use client";

import PagesLayout from "@/app/_layout/pages-layout";
// import { useAppProviderContext } from "@/app/hooks/use-app-provider-context";
// import useShowsProviderContext from "@/app/hooks/use-shows-provider-context";
// import type { Show } from "@/app/layout";
// import ShowspageClient from "./shows-page-client";

export type BkmarkedMovies = {
  title: string;
  category: string;
};

export default function BookmarkPage() {
  // const { movies } = useShowsProviderContext();
  // const { bkmarkedMovies } = useAppProviderContext();

  // const bookmarkedMovies = movies.filter(
  //   (movie) => bkmarkedMovies?.some((bMovie) => bMovie.title === movie.title)
  // ) as Show[];

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        {/* <ShowspageClient title="Bookmarked Movies" /> */}
        <div />
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        {/* <ShowspageClient title="Bookmarked TV Series" /> */}
        <div />
      </PagesLayout>
    </div>
  );
}
