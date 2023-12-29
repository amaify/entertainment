import Image from "next/image";
import cn from "@/src/helpers/cn";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription, { ShowCategory } from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

export type ThumbnailImg = {
  trending?: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
};

interface Props {
  variant: "trending" | "popular";
  title: string;
  thumbnail: ThumbnailImg;
  category: ShowCategory;
  rating: string;
  year: number;
}

export default function Thumbnail({ variant, title, thumbnail, category, rating, year }: Props) {
  const imgSrc = variant === "trending" ? thumbnail.trending?.large : thumbnail.regular.large;
  return (
    <div
      className={cn("w-full bg-primary rounded-[0.8rem] relative", {
        "h-[17.4rem]": variant === "popular",
        "h-[23rem]": variant === "trending"
      })}
    >
      <button className="w-full h-full relative group/play before:transition-all hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:w-full hover:before:h-full hover:before:bg-black/50">
        <Image
          src={imgSrc ?? ""}
          alt={title}
          width={100}
          height={100}
          className="w-full h-full object-cover block rounded-[0.8rem]"
        />
        <ThumbnailPlayButton />
        {variant === "trending" && (
          <ThumbnailDescription category={category} variant={variant} title={title} year={year} rating={rating} />
        )}
      </button>
      <BookmarkIcon isBookmarked={false} />
    </div>
  );
}
