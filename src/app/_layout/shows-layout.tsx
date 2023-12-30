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

  return (
    <section>
      <h1 className="text-heading-lg text-white mb-[3.2rem]">{layoutTitle}</h1>
      <div className={styles.shows_layout}>
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
