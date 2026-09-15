import { getImageUrl } from "@/helpers/get-shows";
import Thumbnail, { type ThumbnailDetails } from "../thumbnail/thumbnail";
import ThumbnailDescription from "./thumbnail-description";

export default function ThumbnailCard(props: ThumbnailDetails) {
    return (
        <div className="flex flex-col gap-[0.8rem]">
            <Thumbnail
                id={props.id}
                variant="popular"
                title={props.title}
                thumbnail={getImageUrl({ variant: "desktop", path: props.thumbnail })}
                category={props.category}
                rating={props.rating}
                year={props.year}
                isTrending={props.isTrending}
                isBookmarked={props.isBookmarked}
            />
            <ThumbnailDescription
                category={props.category}
                variant="popular"
                rating={props.rating}
                title={props.title}
                year={props.year}
            />
        </div>
    );
}
