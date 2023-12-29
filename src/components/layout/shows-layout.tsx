import movieData from "@/data.json";
import type { Category } from "@/src/app/[category]/page";
import ThumbnailCard from "../thumbnail/thumbnail-card";
import { ShowCategory } from "../thumbnail/thumbnail-description";
import styles from "./layout.module.css";

interface Props {
  title: string;
  pageCategory?: Category;
}

export default function ShowsLayout({ title, pageCategory }: Props) {
  let layoutMovieData = movieData;
  if (pageCategory === "movies") layoutMovieData = movieData.filter((movie) => movie.category === "Movie");
  if (pageCategory === "series") layoutMovieData = movieData.filter((movie) => movie.category === "TV Series");

  return (
    <section className="mt-">
      <h1 className="text-heading-lg text-white mb-[3.2rem]">{title}</h1>
      <div className={styles.shows_layout}>
        {layoutMovieData.map((movie) => (
          <ThumbnailCard
            category={movie.category as ShowCategory}
            key={movie.title}
            thumbnail={movie.thumbnail}
            rating={movie.rating}
            isBookmarked={movie.isBookmarked}
            title={movie.title}
            year={movie.year}
          />
        ))}
      </div>
    </section>
  );
}
