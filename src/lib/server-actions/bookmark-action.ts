"use server";

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export interface BookmarkAction {
  title: string;
  category?: string;
}

export type BookmarkActionResponse = { message: "success" | (string & {}) };
export async function addMovieToBookmarkAction({ title, category }: BookmarkAction): Promise<BookmarkActionResponse> {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) return { message: "User not authenticated" };

  const { error } = await supabase.from("bookmarked_movies").insert({ title, category, user_id: data.user.id });

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}

export async function removeMovieFromBookmarkAction({
  title
}: Pick<BookmarkAction, "title">): Promise<BookmarkActionResponse> {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) return { message: "User not authenticated" };

  const { error } = await supabase.from("bookmarked_movies").delete().eq("title", title);

  if (error) {
    return { message: error.message };
  }

  return { message: "success" };
}
