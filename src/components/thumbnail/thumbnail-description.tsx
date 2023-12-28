import cn from "@/helpers/cn";
import SvgIcon from "../svg/svg";
import styles from "./thumbnail.module.css";

export type ShowCategory = "Movie" | "TV Series";

interface Props {
  category: ShowCategory;
  variant: "trending" | "popular";
  title: string;
  year: number;
  rating: string;
}

export default function ThumbnailDescription({ category, variant, title, year, rating }: Props) {
  return (
    <span
      className={cn("text-white text-left", {
        "absolute left-[2.4rem] bottom-[2.4rem] z-0": variant === "trending",
        relative: variant === "popular"
      })}
    >
      <span className={cn(styles.description)}>
        <span>{year}</span>
        <span className="flex items-center gap-[0.6rem]">
          <SvgIcon variant={category === "Movie" ? "movieIcon" : "tvSeriesIcon"} fillColour="#FFFFFF" />
          <span>{category}</span>
        </span>
        <span>{rating}</span>
      </span>
      <span
        className={cn("text-white w-full text-heading-medium-sm capitalize mt-[0.3rem]", {
          "text-heading-xs": variant === "popular"
        })}
      >
        {title}
      </span>
    </span>
  );
}
