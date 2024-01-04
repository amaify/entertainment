"use client";

import { createContext, type ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import Notification from "../../components/ui/notification";
import AppLayout from "../_layout/app-layout";
import { BkmarkedMovies } from "../[category]/bookmark-page";
import type { Movie, TrendingShows } from "../layout";

export type AuthSession = Session | null;

interface Props {
  children: ReactNode;
  session: AuthSession;
  movies: Movie[];
  trendingShows: TrendingShows[];
  bkmarkedMovies: BkmarkedMovies[] | null;
}

export const AppContext = createContext<Omit<Props, "children"> | null>(null);

export default function AppProvider({ children, session, movies, trendingShows, bkmarkedMovies }: Props) {
  const pathname = usePathname();
  return (
    <AppContext.Provider value={{ session, bkmarkedMovies, movies, trendingShows }}>
      <AppLayout pathname={pathname}>
        <Notification />
        {children}
      </AppLayout>
    </AppContext.Provider>
  );
}
