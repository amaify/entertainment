import { useInfiniteQuery } from "@tanstack/react-query";
import type { Show } from "../layout";

interface Props {
  queryKey: string[];
  queryFunction: ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => Promise<Show[]>;
}

export default function useCustomInfiniteQueryHook({ queryFunction, queryKey }: Props) {
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam, queryKey }) => queryFunction({ pageParam, queryKey }),
    initialPageParam: 1,
    getNextPageParam: (_, pages, lastPageParam) => {
      const nextPage = lastPageParam !== 19 ? pages.length + 1 : undefined;
      // console.log({ nextPage, lastPageParam, pages });
      return nextPage;
    },
    maxPages: 20,
    enabled: !!queryKey
  });

  return {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  };
}
