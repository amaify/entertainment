import { cookies } from "next/headers";
import movieData from "@/data.json";
import PagesLayout from "@/src/components/layout/pages-layout";
import { getUserAction } from "@/src/lib/server-actions/auth-session-action";
import { createClient } from "@/src/lib/supabase/server";
import { Show } from "../page";
import ShowspageClient from "./shows-page-client";

export default async function BookmarkPage() {
  const supabase = createClient(cookies());
  const user = await getUserAction();

  const { data: bkmarkedMovies } = await supabase
    .from("bookmarked_movies")
    .select("title, category")
    .eq("user_id", user?.id);

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
