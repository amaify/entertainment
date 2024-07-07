"use client";

import TrendingShowWrapper from "@/_layout/trending-shows-wrapper";
import Thumbnail from "@/components/thumbnail/thumbnail";
import Typography from "@/components/typography/typography";
import Skeleton from "@/components/ui/skeleton";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import { fetchTrendingShows, getImageUrl } from "@/helpers/get-shows";
import useCustomQuery from "@/hooks/use-custom-query";
import useShowsProviderContext from "@/hooks/use-shows-provider-context";
import type { Show } from "src/app/layout";

export default function TrendingShows() {
  const { bookmarkedMovies } = useShowsProviderContext();
  const { data, isLoading, error } = useCustomQuery<Show[]>({ queryFn: fetchTrendingShows, queryKey: ["trending"] });

  if (error)
    return (
      <TrendingShowWrapper>
        <Typography as="h1" intent="fluid-heading" className="!text-primary">
          {error.message}
        </Typography>
      </TrendingShowWrapper>
    );

  if (isLoading)
    return (
      <TrendingShowWrapper>
        {Array.from({ length: 15 }).map((_, idx) => (
          <div className="w-[24rem] flex-shrink-0 sm:w-[47rem]" key={idx}>
            <Skeleton className="h-[14rem] w-full sm:h-[23rem]" />
          </div>
        ))}
      </TrendingShowWrapper>
    );

  const slicedData = data?.slice(0, 15);

  return (
    <TrendingShowWrapper>
      {slicedData?.map((show) => (
        <div className="w-[24rem] flex-shrink-0 sm:w-[47rem]" key={show.id}>
          <Thumbnail
            id={show.id}
            variant="trending"
            category={show.media_type}
            rating={show.vote_average}
            title={show.name || show.title}
            thumbnail={getImageUrl({ variant: "desktop", path: show.backdrop_path })}
            year={+(show.release_date || show.first_air_date).split("-")[0]}
            isBookmarked={getBookmarkedShows({ show: show, bookmarkedShow: bookmarkedMovies })}
            isTrending={false}
          />
        </div>
      ))}
    </TrendingShowWrapper>
  );
}
