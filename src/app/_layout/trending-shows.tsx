import type { ReactNode } from "react";
import Thumbnail from "@/components/thumbnail/thumbnail";
import Skeleton from "@/components/ui/skeleton";
import { fetchTrendingShows, getImageUrl } from "@/helpers/get-shows";
import useCustomQuery from "../hooks/use-custom-query";
import type { Show } from "../layout";

export default function TrendingShows() {
  const { data, isLoading, error } = useCustomQuery<Show[]>({ queryFn: fetchTrendingShows, queryKey: ["trending"] });

  if (error)
    return (
      <TrendingShowWrapper>
        <h1 className="text-heading-lg text-primary">{error.message}</h1>
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
            isBookmarked={false}
            // isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
            isTrending={false}
          />
        </div>
      ))}
    </TrendingShowWrapper>
  );
}

function TrendingShowWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="mb-16 flex flex-col gap-10 pl-[1.6rem] sm:pl-[2.4rem] xl:pl-0">
      <h1 className="text-heading-lg-mobile text-white sm:text-heading-lg-tab md:text-heading-lg">Trending</h1>
      <div className="[ trending-show-layout ] flex w-full flex-shrink gap-16 overflow-x-auto overflow-y-hidden pr-[1.6rem] sm:pr-[3.2rem]">
        {children}
      </div>
    </section>
  );
}
