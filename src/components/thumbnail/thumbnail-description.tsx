import type { ShowCategory } from "@/app/page";
import cn from "@/helpers/cn";
import styles from "./thumbnail.module.css";
import SvgIcon from "../svg/svg";

interface Props {
  category: ShowCategory;
  variant: "trending" | "popular";
  title: string;
  year: number;
  rating: number;
}

export default function ThumbnailDescription({ category, variant, title, year, rating }: Props) {
  const categoryText = category === "Movie" ? "Movie" : "TV Series";
  return (
    <span
      className={cn("text-left text-white", {
        "absolute bottom-[1.6rem] left-[1.6rem] z-0 sm:bottom-[2.4rem] sm:left-[2.4rem]": variant === "trending",
        relative: variant === "popular"
      })}
    >
      <span className={cn(styles.description)}>
        <span>{year}</span>
        <span className="flex items-center gap-[0.6rem]">
          <SvgIcon variant={category === "Movie" ? "movieIcon" : "tvSeriesIcon"} fillColour="#FFFFFF" />
          <span>{categoryText}</span>
        </span>
        <span>{rating}</span>
      </span>
      <span
        className={cn("mt-[0.4rem] w-full text-body-md capitalize text-white sm:text-heading-medium-sm", {
          "text-body-sm-mobile sm:text-heading-xs": variant === "popular"
        })}
      >
        {title}
      </span>
    </span>
  );
}
