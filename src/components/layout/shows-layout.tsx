import type { Show, ShowCategory } from "@/src/app/page";
import ThumbnailCard from "../thumbnail/thumbnail-card";
import styles from "./layout.module.css";

interface Props {
  title: string;
  movieData: Show[];
}

export default function ShowsLayout({ title, movieData }: Props) {
  return (
    <section>
      <h1 className="text-heading-lg text-white mb-[3.2rem]">{title}</h1>
      <div className={styles.shows_layout}>
        {movieData.map((movie) => (
          <ThumbnailCard
            category={movie.category as ShowCategory}
            key={movie.title}
            thumbnail={movie.thumbnail}
            rating={movie.rating}
            isBookmarked={movie.isBookmarked}
            title={movie.title}
            year={movie.year}
            isTrending={movie.isTrending}
          />
        ))}
      </div>
    </section>
  );
}
