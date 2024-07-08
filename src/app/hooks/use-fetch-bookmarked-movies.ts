"use client";

import type { BookmarkedMovies } from "@/app/show-category/bookmark-page";
import useCustomQuery from "@/hooks/use-custom-query";
import { createClient } from "@/lib/supabase/client";

async function fetchBookmarkedMovies(userId: string | undefined) {
  if (userId === "") return;
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("bookmarked_movies")
      .select("title, category, rating, year, thumbnail, show_id")
      .eq("user_id", userId)
      .returns<Array<BookmarkedMovies>>();

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
export default function useFetchBookmarkedMovies(userId: string | undefined) {
  const { data: bookmarkedMovies } = useCustomQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: () => fetchBookmarkedMovies(userId),
    enabled: !!userId
  });

  return bookmarkedMovies;
}
