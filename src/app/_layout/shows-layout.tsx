"use client";

import type { ReactNode } from "react";
import ThumbnailCard from "@/components/thumbnail/thumbnail-card";
import Typography from "@/components/typography/typography";
import Skeleton from "@/components/ui/skeleton";
import cn from "@/helpers/cn";
import styles from "./layout.module.css";
import type { Show } from "../layout";

interface Props {
  title: string;
  shows: Show[];
  error: Error | null;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

interface LayoutWrapper {
  children: ReactNode;
  layoutTitle: string;
  error?: Error | null;
}

export default function ShowsLayout({ title, shows, error, isLoading, isFetchingNextPage }: Props) {
  if (error)
    return (
      <ShowsLayoutWrapper layoutTitle={title} error={error}>
        <Typography as="h1" intent="fluid-heading" className="w-full !text-primary">
          {error.message}
        </Typography>
      </ShowsLayoutWrapper>
    );

  if (isLoading)
    return (
      <ShowsLayoutWrapper layoutTitle={title}>
        {Array.from({ length: 20 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />
        ))}
      </ShowsLayoutWrapper>
    );

  return (
    <ShowsLayoutWrapper layoutTitle={title}>
      {/* {noBookmarkedMovie} */}
      {shows.map((movie) => (
        <ThumbnailCard
          key={movie.id}
          id={movie.id}
          category={movie.media_type}
          thumbnail={movie.backdrop_path}
          rating={movie.vote_average}
          isBookmarked={false}
          // isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
          title={movie.title}
          year={+movie.release_date.split("-")[0]}
          isTrending={false}
        />
      ))}
      {/* <div ref={observerElement} /> */}

      {isFetchingNextPage &&
        Array.from({ length: 20 }).map((_, idx) => <Skeleton key={idx} className="h-[11rem] sm:h-[17.4rem]" />)}
    </ShowsLayoutWrapper>
  );
}

export function ShowsLayoutWrapper({ children, layoutTitle, error }: LayoutWrapper) {
  return (
    <section className="px-[1.6rem] pb-[1.6rem] sm:px-[2.4rem] sm:pb-[2.4rem] xl:px-0 xl:pb-0">
      <Typography as="h1" intent="fluid-heading" className="mb-[3.2rem]">
        {layoutTitle}
      </Typography>
      <div className={cn(!error ? styles.shows_layout : "")}>{children}</div>
    </section>
  );
}
