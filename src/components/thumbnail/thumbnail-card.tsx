import Thumbnail, { ThumbnailImg } from "../thumbnail/thumbnail";
import ThumbnailDescription, { ShowCategory } from "./thumbnail-description";

interface Props {
  category: ShowCategory;
  title: string;
  year: number;
  rating: string;
  isBookmarked: boolean;
  thumbnail: ThumbnailImg;
}

export default function ThumbnailCard({ category, title, year, rating, isBookmarked, thumbnail }: Props) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Thumbnail
        variant="popular"
        title={title}
        thumbnail={thumbnail}
        category={category}
        rating={rating}
        year={year}
      />
      <ThumbnailDescription category={category} variant="popular" rating={rating} title={title} year={year} />
    </div>
  );
}
