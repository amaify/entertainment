import { cookies } from "next/headers";
import movieData from "@/data.json";
import PagesLayout from "@/src/components/layout/pages-layout";
import ShowsLayout from "@/src/components/layout/shows-layout";
import { getUserAction } from "@/src/lib/server-actions/auth-session-action";
import { createClient } from "@/src/lib/supabase/server";
import { Show } from "../page";

export default async function BookmarkPage() {
  const supabase = createClient(cookies());
  const user = await getUserAction();

  const { data } = await supabase
    .from("bookmarked_movies")
    .select("title, category")
    .eq("user_id", user?.id);

  const bookmarkedMovies = movieData.filter((movie) => data?.some((bMovie) => bMovie.title === movie.title));

  return (
    <div className="flex flex-col gap-16">
      <PagesLayout placeholderText="Search for bookmarked shows" showSearchQuery>
        <ShowsLayout
          title="Bookmarked Movies"
          movieData={bookmarkedMovies.filter((bMovie) => bMovie.category === "Movie") as Show[]}
        />
      </PagesLayout>

      <PagesLayout placeholderText="" showSearchQuery={false}>
        <ShowsLayout
          title="Bookmarked TV Series"
          movieData={bookmarkedMovies.filter((bMovie) => bMovie.category === "TV Series") as Show[]}
        />
      </PagesLayout>
    </div>
  );
}
