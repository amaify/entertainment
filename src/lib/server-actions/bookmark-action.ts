"use server";

import { createClient } from "../supabase/server";

export interface BookmarkAction {
  title: string;
  category?: string;
}

export type BookmarkActionResponse = { message: "success" | (string & {}) };
export async function addMovieToBookmarkAction({ title, category }: BookmarkAction): Promise<BookmarkActionResponse> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) return { message: "User not authenticated" };

    const { error } = await supabase.from("bookmarked_movies").insert({ title, category, user_id: data.user.id });

    if (error) {
      return { message: error.message };
    }

    return { message: "success" };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function removeMovieFromBookmarkAction({
  title
}: Pick<BookmarkAction, "title">): Promise<BookmarkActionResponse> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) return { message: "User not authenticated" };

    const { error } = await supabase.from("bookmarked_movies").delete().eq("title", title);

    if (error) {
      return { message: error.message };
    }

    return { message: "success" };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
