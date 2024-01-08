import type { Show } from "@/app/page";
import ThumbnailDescription from "./thumbnail-description";
import Thumbnail from "../thumbnail/thumbnail";

export default function ThumbnailCard({ category, title, year, rating, thumbnail, isBookmarked, isTrending }: Show) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Thumbnail
        variant="popular"
        title={title}
        thumbnail={thumbnail}
        category={category}
        rating={rating}
        year={year}
        isTrending={isTrending}
        isBookmarked={isBookmarked}
      />
      <ThumbnailDescription category={category} variant="popular" rating={rating} title={title} year={year} />
    </div>
  );
}
