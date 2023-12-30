import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import { AppContext } from "@/src/app/_components/app-provider";
import type { Show, ShowCategory } from "@/src/app/page";
import { getBookmarkedShows } from "@/src/helpers/get-bookmarked-shows";
import ThumbnailCard from "../../components/thumbnail/thumbnail-card";
import styles from "./layout.module.css";

interface Props {
  title: string;
  movieData: Show[];
}

export default function ShowsLayout({ title, movieData }: Props) {
  const bookmarkedMovies = useContext(AppContext)?.bkmarkedMovies;
  const queryParam = useSearchParams().get("show");
  const resultText = movieData.length <= 1 ? "result" : "results";
  const layoutTitle = queryParam ? `Found ${movieData.length} ${resultText} for '${queryParam}'` : title;

  const noBookmarkedMovie =
    movieData.length === 0 && !queryParam ? <h1 className="text-primary text-heading-lg">No shows</h1> : null;

  return (
    <section className="px-[1.6rem] pb-[1.6rem] sm:px-[2.4rem] sm:pb-[2.4rem] xl:px-0 xl:pb-0">
      <h1 className="text-heading-lg-mobile text-white mb-[3.2rem] sm:text-heading-lg-tab md:text-heading-lg">
        {layoutTitle}
      </h1>
      <div className={styles.shows_layout}>
        {noBookmarkedMovie}
        {movieData.map((movie) => (
          <ThumbnailCard
            category={movie.category as ShowCategory}
            key={movie.title}
            thumbnail={movie.thumbnail}
            rating={movie.rating}
            isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
            title={movie.title}
            year={movie.year}
            isTrending={movie.isTrending}
          />
        ))}
      </div>
    </section>
  );
}
