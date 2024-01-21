import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/ui/skeleton";
import { getImageUrl } from "@/helpers/get-shows";
import { fetchTMDB } from "@/helpers/service-client";
import Thumbnail from "../../components/thumbnail/thumbnail";
import type { Show } from "../layout";

export default function TrendingShows() {
  const fetchTrendingShows = async () => {
    const response = await fetchTMDB<Show>({ path: "trending/all/day", method: "GET", pageParam: 1, variant: "shows" });
    return response;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingShows
  });

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

  const filteredShows = data?.results.slice(0, 15);

  return (
    <TrendingShowWrapper>
      {filteredShows?.map((movie) => (
        <div className="w-[24rem] flex-shrink-0 sm:w-[47rem]" key={movie.id}>
          <Thumbnail
            variant="trending"
            category={movie.media_type}
            rating={movie.vote_average}
            title={movie.name || movie.title}
            thumbnail={getImageUrl({ variant: "desktop", path: movie.backdrop_path })}
            year={+(movie.release_date || movie.first_air_date).split("-")[0]}
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
