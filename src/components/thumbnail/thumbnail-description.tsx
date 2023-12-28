import cn from "@/helpers/cn";
import SvgIcon from "../svg/svg";
import styles from "./thumbnail.module.css";

interface Props {
  category: "Movies" | "TV Series";
  variant: "trending" | "popular";
}

export default function ThumbnailDescription({ category, variant }: Props) {
  return (
    <span
      className={cn("text-white text-left", {
        "absolute left-[2.4rem] bottom-[2.4rem] z-0": variant === "trending",
        relative: variant === "popular"
      })}
    >
      <span className={cn(styles.description)}>
        <span>2019</span>
        <span className="flex items-center gap-[0.6rem]">
          <SvgIcon variant={category === "Movies" ? "movieIcon" : "tvSeriesIcon"} fillColour="#FFFFFF" />
          <span>Movie</span>
        </span>
        <span>PG</span>
      </span>
      <span
        className={cn("text-white w-full text-heading-medium-sm capitalize mt-[0.3rem]", {
          "text-heading-xs": variant === "popular"
        })}
      >
        beyond earth
      </span>
    </span>
  );
}
