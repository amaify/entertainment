import ThumbnailCard from "../thumbnail/thumbnail-card";
import styles from "./layout.module.css";

interface Props {
  title: string;
}

export default function ShowsLayout({ title }: Props) {
  const showsData = Array.from({ length: 50 }, (_, idx) => idx);
  return (
    <section className="mt-">
      <h1 className="text-heading-lg text-white mb-[3.2rem]">{title}</h1>
      <div className={styles.shows_layout}>
        {showsData.map((movie) => (
          <ThumbnailCard category="Movies" key={movie} />
        ))}
      </div>
    </section>
  );
}
