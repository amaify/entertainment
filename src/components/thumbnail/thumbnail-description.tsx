import type { ShowCategory } from "@/app/types";
import SvgIcon from "@/components/svg/svg";
import cn from "@/helpers/cn";

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
                "absolute bottom-[1.6rem] left-[1.6rem] z-0 sm:bottom-[2.4rem] sm:left-[2.4rem]":
                    variant === "trending",
                relative: variant === "popular",
            })}
        >
            <span
                className={cn(
                    "flex items-center text-white/75 text-[1.1rem] sm:text-[1.5rem] font-light",
                    "[&>span:not(:last-child)]:after:mx-[0.8rem] [&>span:not(:last-child)]:after:inline-block [&>span:not(:last-child)]:after:align-middle",
                    "[&>span:not(:last-child)]:after:size-[0.3rem] [&>span:not(:last-child)]:after:rounded-full [&>span:not(:last-child)]:after:bg-white/50",
                )}
            >
                <span>{year}</span>
                <span className="flex items-center gap-[0.6rem]">
                    <SvgIcon variant={category === "Movie" ? "movieIcon" : "tvSeriesIcon"} fillColour="#FFFFFF" />
                    <span>{categoryText}</span>
                </span>
                <span>{rating.toFixed(1)}</span>
            </span>
            <span
                className={cn("mt-[0.4rem] w-full text-body-md capitalize text-white sm:text-heading-medium-sm", {
                    "text-body-sm-mobile sm:text-heading-xs": variant === "popular",
                })}
            >
                {title}
            </span>
        </span>
    );
}
