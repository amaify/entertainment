"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { ShowCategory } from "src/app/layout";

export interface BookmarkAction {
  category: ShowCategory;
  title: string;
  show_id: number;
  year: number;
  rating: number;
  thumbnail: string;
}

export type BookmarkActionResponse = { message: "success" | (string & {}) };
export async function addMovieToBookmarkAction(props: BookmarkAction): Promise<BookmarkActionResponse> {
  const cookieStore = cookies();
  try {
    const supabase = await createClient(cookieStore);
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) return { message: "User not authenticated" };

    const { error } = await supabase.from("bookmarked_movies").insert({ ...props, user_id: data.user.id });

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
  const cookieStore = cookies();

  try {
    const supabase = await createClient(cookieStore);
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
