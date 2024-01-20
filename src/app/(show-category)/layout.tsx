"use client";

import { type ReactNode, createContext } from "react";
import type { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { fetchShows } from "@/helpers/get-shows";
import { getUniquShows } from "@/helpers/get-unique-shows";
import useCustomInfiniteQueryHook from "../hooks/use-custom-infinite-query-hook";
// import useIntersectionObserver from "../hooks/use-observer-intersection";
import type { Show } from "../layout";

interface ShowCategoryContextProps {
  shows: Show[];
  error: Error | null;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    value?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<Show[], unknown>, Error>>;
  hasNextPage: boolean;
}

interface Props {
  children: ReactNode;
}

export const ShowCategoryContext = createContext<ShowCategoryContextProps | undefined>(undefined);

export default function CategoryLayout({ children }: Props) {
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useCustomInfiniteQueryHook({
    queryKey: ["shows"],
    queryFunction: fetchShows
  });

  //   const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });
  const uniqueShows = getUniquShows(data?.pages.flat() ?? []);

  // console.log({ uniqueShows });

  return (
    <ShowCategoryContext.Provider
      value={{ shows: uniqueShows, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage }}
    >
      {children}
    </ShowCategoryContext.Provider>
  );
}
