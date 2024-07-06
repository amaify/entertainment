"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ShowCategory } from "@/app/layout";
import cn from "@/helpers/cn";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

export interface ThumbnailDetails {
  id: number;
  title: string;
  year: number;
  category: ShowCategory;
  rating: number;
  isTrending: boolean;
  thumbnail: string;
  isBookmarked: boolean;
}

interface Props extends ThumbnailDetails {
  variant: "trending" | "popular";
}

export default function Thumbnail({ id, variant, title, thumbnail, category, rating, year, isBookmarked }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const getCategory = category === "Movie" ? "movie" : "tv";

  const onThumbnailClick = () => {
    const queryParam = new URLSearchParams(searchParams);

    if (pathname === "/search") {
      queryParam.append("category", `${getCategory}`);
      queryParam.append("id", `${id}`);
    }

    queryParam.set("id", `${id}`);
    queryParam.set("category", `${getCategory}`);

    router.replace(`${pathname}?${queryParam.toString()}`, { scroll: false });
  };

  return (
    <div
      className={cn("relative w-full", {
        "h-[11rem] sm:h-[17.4rem] 2xl:h-[23.4rem]": variant === "popular",
        "h-[14rem] sm:h-[23rem]": variant === "trending"
      })}
    >
      <button
        className={cn(
          "group/play relative h-full w-full rounded-[0.8rem] before:transition-all",
          "lg:hover:cursor-pointer lg:hover:before:absolute lg:hover:before:inset-0 lg:hover:before:h-full lg:hover:before:w-full lg:hover:before:rounded-[0.8rem] lg:hover:before:bg-black/50 lg:hover:before:content-['']"
        )}
        onClick={onThumbnailClick}
      >
        <Image
          src={thumbnail}
          alt={`Backdrop of ${title}`}
          width={600}
          height={600}
          loading="lazy"
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM83jz5PwAG1ALeWannmwAAAABJRU5ErkJggg=="
          className="block h-full w-full rounded-[0.8rem] object-cover object-right"
        />
        <ThumbnailPlayButton />
        {variant === "trending" && (
          <ThumbnailDescription category={category} variant={variant} title={title} year={year} rating={rating} />
        )}
      </button>
      <BookmarkIcon
        isBookmarked={isBookmarked}
        title={title}
        category={category}
        show_id={id}
        year={year}
        rating={rating}
        thumbnail={thumbnail}
      />
    </div>
  );
}
