"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import cn from "@/helpers/cn";
import { getMovieImage } from "@/helpers/service-client";
import Skeleton from "@/src/components/ui/skeleton";
import styles from "./layout.module.css";
import ThumbnailCard from "../../components/thumbnail/thumbnail-card";
import useShowsProviderContext from "../hooks/use-shows-provider-context";
import type { Movie } from "../layout";

interface Props {
  title: string;
  movieData: Movie[];
}

export default function ShowsLayout({ title, movieData }: Props) {
  const { isLoading, error, isFetchingNextPage } = useShowsProviderContext();

  const queryParam = useSearchParams().get("show");
  const resultText = movieData.length <= 1 ? "result" : "results";
  const layoutTitle = queryParam ? `Found ${movieData.length} ${resultText} for '${queryParam}'` : title;

  const noBookmarkedMovie =
    movieData.length === 0 && !queryParam ? <h1 className="text-heading-lg text-primary">No shows</h1> : null;

  if (error)
    return (
      <ShowsLayoutWrapper layoutTitle={layoutTitle}>
        <h1 className="text-heading-lg">{error.message}</h1>
      </ShowsLayoutWrapper>
    );

  if (isLoading)
    return (
      <ShowsLayoutWrapper layoutTitle={layoutTitle}>
        {Array.from({ length: 20 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />
        ))}
      </ShowsLayoutWrapper>
    );

  return (
    <ShowsLayoutWrapper layoutTitle={layoutTitle}>
      {noBookmarkedMovie}
      {movieData
        .filter((fMovie) => fMovie.backdrop_path !== null)
        .map((movie) => (
          <ThumbnailCard
            key={movie.id}
            category={movie.media_type}
            thumbnail={getMovieImage({ variant: "desktop", path: movie.backdrop_path })}
            rating={movie.vote_average}
            isBookmarked={false}
            // isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
            title={movie.title}
            year={+movie.release_date.split("-")[0]}
            isTrending={false}
          />
        ))}
      {isFetchingNextPage &&
        Array.from({ length: 20 }).map((_, idx) => <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />)}
    </ShowsLayoutWrapper>
  );
}

function ShowsLayoutWrapper({ children, layoutTitle }: { children: ReactNode; layoutTitle: string }) {
  return (
    <section className="px-[1.6rem] pb-[1.6rem] sm:px-[2.4rem] sm:pb-[2.4rem] xl:px-0 xl:pb-0">
      <h1 className="mb-[3.2rem] text-heading-lg-mobile text-white sm:text-heading-lg-tab md:text-heading-lg">
        {layoutTitle}
      </h1>
      <div className={cn("relative", styles.shows_layout)}>{children}</div>
    </section>
  );
}
