import Image from "next/image";
import TheGreatLands from "../../../public/thumbnails/the-great-lands/regular/medium.jpg";
import PlayButton from "./play-button";
import BookmarkIcon from "./bookmark-icon";
import cn from "@/helpers/cn";
import TrendingThumbnailDescription from "./trending-thumbnail-description";

interface Props {
  variant: "trending" | "popular";
}

export default function Thumbnail({ variant }: Props) {
  return (
    <div
      className={cn("bg-primary rounded-[0.8rem] relative", {
        "w-[25.5rem] h-[17.4rem]": variant === "popular",
        "w-[47rem] h-[23rem]": variant === "trending",
      })}
    >
      <div className="w-full h-full relative transition-colors group/play hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:w-full hover:before:h-full hover:before:bg-black/50">
        <Image
          src={TheGreatLands}
          alt="The Great Lands"
          className="w-full h-full object-cover block rounded-[0.8rem]"
        />
        <div className="invisible group-hover/play:visible">
          <PlayButton />
        </div>
      </div>
      <BookmarkIcon />
      <TrendingThumbnailDescription category="Movies" variant={variant} />
    </div>
  );
}
