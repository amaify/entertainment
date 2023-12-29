import ThumbnailCard from "../thumbnail/thumbnail-card";
import { ShowCategory } from "../thumbnail/thumbnail-description";
import styles from "./layout.module.css";

interface Props {
  title: string;
  movieData: any;
}

export default function ShowsLayout({ title, movieData }: Props) {
  return (
    <section className="mt-">
      <h1 className="text-heading-lg text-white mb-[3.2rem]">{title}</h1>
      <div className={styles.shows_layout}>
        {movieData.map((movie: any) => (
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
