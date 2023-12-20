import SvgIcon from "../svg/svg";
import styles from "./thumbnail.module.css";

interface Props {
  category: "Movies" | "TV Series";
}

export default function TrendingThumbnailDescription({ category }: Props) {
  return (
    <div className="absolute left-[2.4rem] bottom-[2.4rem]">
      <div className={styles.description}>
        <span>2019</span>
        <span className="flex items-center gap-[0.6rem]">
          <SvgIcon
            variant={category === "Movies" ? "movieIcon" : "tvSeriesIcon"}
            fillColour="#FFFFFF"
          />
          <span>Movie</span>
        </span>
        <span>PG</span>
      </div>
      <h1 className="text-white text-heading-medium-sm capitalize mt-[0.3rem]">
        beyond earth
      </h1>
    </div>
  );
}
