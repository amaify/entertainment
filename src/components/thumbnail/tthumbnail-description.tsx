import SvgIcon from "../svg/svg";
import styles from "./thumbnail.module.css";

interface Props {
  category: "Movies" | "TV Series";
  variant: "trending" | "popular";
}

export default function ThumbnailDescription({ category, variant }: Props) {
  if (variant === "popular") return null;

  return (
    <span className="absolute left-[2.4rem] bottom-[2.4rem] z-0 text-left">
      <span className={styles.description}>
        <span>2019</span>
        <span className="flex items-center gap-[0.6rem]">
          <SvgIcon variant={category === "Movies" ? "movieIcon" : "tvSeriesIcon"} fillColour="#FFFFFF" />
          <span>Movie</span>
        </span>
        <span>PG</span>
      </span>
      <h1 className="text-white text-heading-medium-sm capitalize mt-[0.3rem]">beyond earth</h1>
    </span>
  );
}
