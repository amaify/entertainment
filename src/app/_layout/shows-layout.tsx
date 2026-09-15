"use client";

import ShowsLayoutWrapper from "@/_layout/shows-layout-wrapper";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import Typography from "@/components/typography/typography";
import Skeleton from "@/components/ui/skeleton";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import useShowsProviderContext from "@/hooks/use-shows-provider-context";

interface Props {
    title: string;
}

export default function ShowsLayout({ title }: Props) {
    const { shows, error, isLoading, isFetchingNextPage, bookmarkedMovies } = useShowsProviderContext();

    if (error)
        return (
            <ShowsLayoutWrapper layoutTitle={title} error={error}>
                <Typography as="h1" intent="fluid-heading" className="w-full text-primary!">
                    {error.message}
                </Typography>
            </ShowsLayoutWrapper>
        );

    if (isLoading)
        return (
            <ShowsLayoutWrapper layoutTitle={title}>
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

    return (
        <ShowsLayoutWrapper layoutTitle={title}>
            {shows.map((movie) => (
                <ThumbnailCard
                    key={movie.id}
                    id={movie.id}
                    category={movie.media_type}
                    thumbnail={movie.backdrop_path}
                    rating={movie.vote_average}
                    isBookmarked={getBookmarkedShows({ show: movie, bookmarkedShow: bookmarkedMovies })}
                    title={movie.title}
                    year={+movie.release_date.split("-")[0]}
                    isTrending={false}
                />
            ))}

            {isFetchingNextPage &&
                Array.from({ length: 20 }).map((_, idx) => <Skeleton key={idx} className="h-44 sm:h-[17.4rem]" />)}
        </ShowsLayoutWrapper>
    );
}
