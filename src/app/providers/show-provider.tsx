import { createContext, useEffect, type ReactNode, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation/navigation";
import BackToTopButton from "@/components/ui/back-to-top-button";
import { fetchTMDB } from "@/helpers/service-client";
import useIntersectionObserver from "../hooks/use-observer-intersection";
import type { Show } from "../layout";

interface MovieContextProps {
  movies: Show[];
  error: Error | null;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

const fetchShows = async ({ pageParam }: { pageParam: number }) => {
  const [movies, tvSeries] = await Promise.all([
    fetchTMDB<Show>({ path: "movie/popular", method: "GET", pageParam }),
    fetchTMDB<Show>({ path: "tv/popular", method: "GET", pageParam })
  ]);

  const allShows = [
    ...movies.results.map((movie) => ({
      ...movie,
      title: movie.title,
      release_date: movie.release_date,
      media_type: "Movie" as Show["media_type"]
    })),
    ...tvSeries.results.map((show) => ({
      ...show,
      title: show.name,
      release_date: show.first_air_date,
      media_type: "TV Series" as Show["media_type"]
    }))
  ].sort(() => Math.random() - 0.5);

  return allShows;
};

export const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export default function ShowProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchShows,
    initialPageParam: 1,
    getNextPageParam: (_, pages, lastPageParam) => {
      const nextPage = lastPageParam !== 10 ? pages.length + 1 : undefined;
      return nextPage;
    },
    maxPages: 9
  });

  const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });
  const movieData = data?.pages ? data.pages.map((group) => group).flat() : [];
  const ids = movieData.map((movieId) => movieId.id);
  const uniqueShows = movieData.filter(({ id }, index) => !ids.includes(id, index + 1));

  const handleScroll = () => {
    const scrollableElement = document.querySelector("#showsColumn");

    if (scrollableElement && scrollableElement.scrollTop > 1500) {
      setShowBackToTopButton(true);
      return;
    }

    setShowBackToTopButton(false);
  };

  const onBackToTopButtonClick = () => {
    const scrollableElement = document.querySelector("#showsColumn");
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollableElement = document.querySelector("#showsColumn");

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <MovieContext.Provider value={{ movies: uniqueShows, error, isFetchingNextPage, isLoading }}>
      <main className="flex h-screen w-full flex-col gap-[2.6rem] xl:flex-row xl:gap-[3.6rem]">
        {!isAuthPage && (
          <aside className="transition-all sm:px-[2.4rem] sm:pt-[2.3rem] xl:pb-[3.2rem] xl:pl-[3.2rem] xl:pt-[3.2rem]">
            <Navigation />
          </aside>
        )}

        <div className="flex h-screen w-full flex-col overflow-auto">
          <div className="overflow-auto" id="showsColumn">
            <div className="pb-[3.2rem] pt-[6.2rem]">{children}</div>
            <div ref={observerElement} />
          </div>
          {showBackToTopButton && <BackToTopButton onClick={onBackToTopButtonClick} />}
        </div>
      </main>
    </MovieContext.Provider>
  );
}
