import Thumbnail from "../thumbnail/thumbnail";
import ThumbnailDescription from "./thumbnail-description";

interface Props {
  category: "Movies" | "TV Series";
}

export default function ThumbnailCard({ category }: Props) {
  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Thumbnail variant="popular" />
      <ThumbnailDescription category={category} variant="popular" />
    </div>
  );
}
