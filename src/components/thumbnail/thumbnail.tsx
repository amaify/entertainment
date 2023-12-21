import Image from "next/image";
import TheGreatLands from "../../../public/thumbnails/the-great-lands/regular/medium.jpg";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import cn from "@/helpers/cn";
import ThumbnailPlayButton from "./thumbnail-play-button";
import ThumbnailDescription from "./tthumbnail-description";

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
      <button className="w-full h-full relative group/play before:transition-all hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:w-full hover:before:h-full hover:before:bg-black/50">
        <Image
          src={TheGreatLands}
          alt="The Great Lands"
          className="w-full h-full object-cover block rounded-[0.8rem]"
        />
        <ThumbnailPlayButton />
        <ThumbnailDescription category="Movies" variant={variant} />
      </button>
      <BookmarkIcon isBookmarked={false} />
    </div>
  );
}
