import type { ShowCategory } from "@/src/app/page";
import cn from "@/src/helpers/cn";
import SvgIcon from "../svg/svg";
import styles from "./thumbnail.module.css";

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
        "absolute left-[1.6rem] bottom-[1.6rem] z-0 sm:left-[2.4rem] sm:bottom-[2.4rem]": variant === "trending",
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
        className={cn("text-white text-body-md w-full capitalize mt-[0.4rem] sm:text-heading-medium-sm", {
          "text-body-sm-mobile sm:text-heading-xs": variant === "popular"
        })}
      >
        {title}
      </span>
    </span>
  );
}
