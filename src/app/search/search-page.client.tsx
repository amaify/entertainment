"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import { NoResultFound } from "@/components/ui/no-result-found";
import Skeleton from "@/components/ui/skeleton";
import { fetchSearchedShows } from "@/helpers/get-shows";
import { getUniquShows } from "@/helpers/get-unique-shows";
import { ShowsLayoutWrapper } from "../_layout/shows-layout";
import useDebounce from "../hooks/use-debounce";
import useIntersectionObserver from "../hooks/use-observer-intersection";

interface Props {
  queryString: string;
}

export default function SearchPageClient({ queryString }: Props) {
  const value = useDebounce({ value: queryString, delay: 750 });

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", value],
    queryFn: ({ pageParam }) => fetchSearchedShows({ pageParam, queryString: value }),
    initialPageParam: 1,
    getNextPageParam: (_, pages, lastPageParam) => {
      const nextPage = lastPageParam !== 19 ? pages.length + 1 : undefined;
      // console.log({ nextPage, lastPageParam, pages });
      return nextPage;
    },
    maxPages: 20,
    enabled: !!value
  });

  const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });

  const uniqueShows = getUniquShows(data?.pages.flat() ?? []);
  const resultText = uniqueShows.length <= 1 ? "result" : "results";
  const layoutTitle = uniqueShows.length > 0 ? `Found ${resultText} for '${queryString}'` : "No result found";

  if (error)
    return (
      <ShowsLayoutWrapper layoutTitle={layoutTitle} error={error}>
        <h1 className="w-full text-heading-medium-sm text-primary">{error.message}</h1>
      </ShowsLayoutWrapper>
    );

  if ((isLoading && !data) || value === "")
    return (
      <ShowsLayoutWrapper layoutTitle="">
        {Array.from({ length: 20 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />
        ))}
      </ShowsLayoutWrapper>
    );

  if (uniqueShows.length === 0)
    return (
      <ShowsLayoutWrapper layoutTitle="">
        <NoResultFound title="No result found" />
      </ShowsLayoutWrapper>
    );

  return (
    <ShowsLayoutWrapper layoutTitle={layoutTitle} error={null}>
      {uniqueShows.map((uniqueShows) => (
        <ThumbnailCard
          key={uniqueShows.id}
          category={uniqueShows.media_type}
          thumbnail={uniqueShows.backdrop_path}
          rating={uniqueShows.vote_average}
          isBookmarked={false}
          // isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
          title={uniqueShows.title}
          year={+uniqueShows.release_date.split("-")[0]}
          isTrending={false}
        />
      ))}
      <div ref={observerElement} />
      {isFetchingNextPage &&
        Array.from({ length: 20 }).map((_, idx) => <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />)}
    </ShowsLayoutWrapper>
  );
}