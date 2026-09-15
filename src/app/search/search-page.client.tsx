"use client";

import ShowsLayoutWrapper from "@/_layout/shows-layout-wrapper";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import Typography from "@/components/typography/typography";
import { NoResultFound } from "@/components/ui/no-result-found";
import Skeleton from "@/components/ui/skeleton";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import { fetchSearchedShows } from "@/helpers/get-shows";
import { getUniquShows } from "@/helpers/get-unique-shows";
import useAppProviderContext from "@/hooks/use-app-provider-context";
import useCustomInfiniteQueryHook from "@/hooks/use-custom-infinite-query-hook";
import useDebounce from "@/hooks/use-debounce";
import useFetchBookmarkedMovies from "@/hooks/use-fetch-bookmarked-movies";
import useIntersectionObserver from "@/hooks/use-observer-intersection";

interface Props {
    queryString: string;
}

export default function SearchPageClient({ queryString }: Props) {
    const value = useDebounce({ value: queryString, delay: 750 });
    const { userId } = useAppProviderContext();
    const bookmarkedMovies = useFetchBookmarkedMovies(userId);

    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useCustomInfiniteQueryHook({
        queryKey: ["search", value],
        queryFunction: ({ pageParam }) => fetchSearchedShows({ pageParam, queryString: value }),
        enabled: !!value,
    });

    const { observerElement } = useIntersectionObserver({ fetchNextPage, hasNextPage });

    const uniqueShows = getUniquShows(data?.pages.flat() ?? []);
    const resultText = uniqueShows.length <= 1 ? "result" : "results";
    const layoutTitle = uniqueShows.length > 0 ? `Found ${resultText} for '${queryString}'` : "No result found";

    if (error) {
        return (
            <ShowsLayoutWrapper layoutTitle={layoutTitle} error={error}>
                <Typography as="h1" intent="fluid-heading" className="w-full text-primary!">
                    {error.message}
                </Typography>
            </ShowsLayoutWrapper>
        );
    }

    if ((isLoading && !data) || value === "") {
        return (
            <ShowsLayoutWrapper layoutTitle={`Searching for ${queryString}...`}>
                {Array.from({ length: 20 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <Skeleton className="h-44 sm:h-92" />
                        <div className="flex flex-col gap-1.5">
                            <Skeleton className="w-1/3 h-4 sm:h-5" />
                            <Skeleton className="w-3/5 h-6 sm:h-8" />
                        </div>
                    </div>
                ))}
            </ShowsLayoutWrapper>
        );
    }

    if (uniqueShows.length === 0) {
        return (
            <ShowsLayoutWrapper layoutTitle="">
                <NoResultFound title="No result found" />
            </ShowsLayoutWrapper>
        );
    }

    return (
        <ShowsLayoutWrapper layoutTitle={layoutTitle} error={null}>
            {uniqueShows.map((uniqueShows) => (
                <ThumbnailCard
                    id={uniqueShows.id}
                    key={uniqueShows.id}
                    category={uniqueShows.media_type}
                    thumbnail={uniqueShows.backdrop_path}
                    rating={uniqueShows.vote_average}
                    isBookmarked={getBookmarkedShows({ show: uniqueShows, bookmarkedShow: bookmarkedMovies })}
                    title={uniqueShows.title}
                    year={+uniqueShows.release_date.split("-")[0]}
                    isTrending={false}
                />
            ))}
            <div ref={observerElement} />
            {isFetchingNextPage &&
                Array.from({ length: 20 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <Skeleton className="h-44 sm:h-92" />
                        <div className="flex flex-col gap-1.5">
                            <Skeleton className="w-1/3 h-4 sm:h-5" />
                            <Skeleton className="w-3/5 h-6 sm:h-8" />
                        </div>
                    </div>
                ))}
        </ShowsLayoutWrapper>
    );
}
