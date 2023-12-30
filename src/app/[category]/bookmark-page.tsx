"use client";

import { useContext } from "react";
import movieData from "@/data.json";
import PagesLayout from "@/src/app/_layout/pages-layout";
import { AppContext } from "../_components/app-provider";
import { Show } from "../page";
import ShowspageClient from "./shows-page-client";

export type BkmarkedMovies = {
  title: string;
  category: string;
};

export default function BookmarkPage() {
  const appContext = useContext(AppContext);
  const bkmarkedMovies = appContext?.bkmarkedMovies;

  const bookmarkedMovies = movieData.filter(
    (movie) => bkmarkedMovies?.some((bMovie) => bMovie.title === movie.title)
  ) as Show[];

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        <ShowspageClient title="Bookmarked Movies" movieData={bookmarkedMovies} category="Movie" />
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        <ShowspageClient title="Bookmarked TV Series" movieData={bookmarkedMovies} category="TV Series" />
      </PagesLayout>
    </div>
  );
}
