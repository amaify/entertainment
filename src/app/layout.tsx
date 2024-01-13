import type { ReactNode } from "react";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { BkmarkedMovies } from "./[category]/bookmark-page";
import AppProvider from "./providers/app-provider";
import { createClient } from "../lib/supabase/server";
import "./globals.css";

export type ShowCategory = "Movie" | "TV Series";

export interface Show {
  id: number;
  title: string;
  overview: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  media_type: ShowCategory;
  first_air_date: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export const metadata: Metadata = {
  title: "Entertainment App",
  description: "Generated by create next app",
  icons: {
    icon: "/shared/app-icon.png",
    shortcut: "/shared/app-icon.png",
    apple: "/shared/app-icon.png"
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();
  const bkmarkedMovies: PostgrestSingleResponse<BkmarkedMovies[]> | null = data.session
    ? await supabase
        .from("bookmarked_movies")
        .select("title, category")
        .eq("user_id", data.session?.user?.id)
    : null;

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider session={data.session} bkmarkedMovies={bkmarkedMovies?.data ? bkmarkedMovies.data : null}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
