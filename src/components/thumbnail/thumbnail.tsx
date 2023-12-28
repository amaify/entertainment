import Image from "next/image";
import cn from "@/helpers/cn";
import TheGreatLands from "../../../public/thumbnails/the-great-lands/regular/medium.jpg";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

interface Props {
  variant: "trending" | "popular";
}

export default function Thumbnail({ variant }: Props) {
  return (
    <div
      className={cn("w-full bg-primary rounded-[0.8rem] relative", {
        "h-[17.4rem]": variant === "popular",
        "h-[23rem]": variant === "trending"
      })}
    >
      <button className="w-full h-full relative group/play before:transition-all hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:w-full hover:before:h-full hover:before:bg-black/50">
        <Image
          src={TheGreatLands}
          alt="The Great Lands"
          className="w-full h-full object-cover block rounded-[0.8rem]"
        />
        <ThumbnailPlayButton />
        {variant === "trending" && <ThumbnailDescription category="Movies" variant={variant} />}
      </button>
      <BookmarkIcon isBookmarked={false} />
    </div>
  );
}
