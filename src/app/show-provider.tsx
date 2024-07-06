import { createContext, useContext, type ReactNode } from "react";
import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import type { BookmarkedMovies } from "@/app/show-category/bookmark-page";
import Navigation from "@/components/navigation/navigation";
import type { AppPath } from "@/components/navigation/navigation-links";
import BackToTopButton from "@/components/ui/back-to-top-button";
import { fetchShows } from "@/helpers/get-shows";
import { getUniquShows } from "@/helpers/get-unique-shows";
import { createClient } from "@/lib/supabase/client";
import { useAppProviderContext } from "./app-provider";
import useCustomInfiniteQueryHook from "./hooks/use-custom-infinite-query-hook";
import useCustomQuery from "./hooks/use-custom-query";
import useIntersectionObserver from "./hooks/use-observer-intersection";
import useScrollToTop from "./hooks/use-scroll-to-top";
import type { Show } from "./layout";

interface ShowsContextProps {
  shows: Show[];
  error: Error | null;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    value?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<Show[], unknown>, Error>>;
  hasNextPage: boolean;
  bookmarkedMovies: Array<BookmarkedMovies> | undefined;
}

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

export const ShowContext = createContext<ShowsContextProps | null>(null);

export default function ShowProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const pathsToMakeQuery: Array<AppPath> = ["/", "/bookmarks", "/series", "/movies"];
  const isQueryEnabled = pathsToMakeQuery.includes(pathname as AppPath);

  const { userId } = useAppProviderContext();

  const { data: bookmarkedMovies } = useCustomQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: () => fetchBookmarkedMovies(userId),
    enabled: !!userId
  });

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useCustomInfiniteQueryHook({
    queryKey: ["shows"],
    queryFunction: fetchShows,
    enabled: isQueryEnabled
  });

  const { showBackToTopButton, onBackToTopButtonClick } = useScrollToTop();
  const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });

  const uniqueShows = getUniquShows(data?.pages.flat() ?? []);

  const value = {
    shows: uniqueShows,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    bookmarkedMovies,
    fetchNextPage
  };

  return (
    <ShowContext.Provider value={value}>
      <main className="flex h-screen w-full flex-col gap-[2.6rem] xl:flex-row xl:gap-[3.6rem]">
        {!isAuthPage && (
          <aside className="transition-all sm:px-[2.4rem] sm:pt-[2.3rem] xl:pb-[3.2rem] xl:pl-[3.2rem] xl:pt-[3.2rem]">
            <Navigation />
          </aside>
        )}

        <div className="flex h-screen w-full flex-col xl:overflow-auto">
          <div className="xl:overflow-auto" id="showsColumn">
            <div className="pb-[3.2rem] pt-[1.2rem] xl:pt-[6.2rem]">{children}</div>
            <div ref={observerElement} />
          </div>
          {showBackToTopButton && <BackToTopButton onClick={onBackToTopButtonClick} />}
        </div>
      </main>
    </ShowContext.Provider>
  );
}

export function useShowsProviderContext() {
  const showsContext = useContext(ShowContext);

  if (!showsContext) throw new Error("useShowsProviderContext must be used within an AppLayout");

  return showsContext;
}
