"use client";

import toast from "react-hot-toast";
import Image from "next/image";
import type { Show } from "@/src/app/page";
import cn from "@/src/helpers/cn";
import { addMovieToBookmarkAction } from "@/src/lib/server-actions/bookmark-action";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

interface Props extends Show {
  variant: "trending" | "popular";
}

export default function Thumbnail({ variant, title, thumbnail, category, rating, year, isBookmarked }: Props) {
  const imgSrc = variant === "trending" ? thumbnail.trending?.large : thumbnail.regular.large;

  const addMovieToBookmark = async () => {
    const toastLoadingId = toast.loading("Adding to bookmarks");
    const { message } = await addMovieToBookmarkAction({ title, category });

    if (message !== "success") {
      toast.error(message);
      toast.dismiss(toastLoadingId);
      return;
    }

    toast.success("Added to bookmarks");
    toast.dismiss(toastLoadingId);
  };
  return (
    <div
      className={cn("w-full relative", {
        "h-[17.4rem]": variant === "popular",
        "h-[23rem]": variant === "trending"
      })}
    >
      <button className="w-full h-full rounded-[0.8rem] relative group/play before:transition-all hover:cursor-pointer hover:before:content-[''] hover:before:absolute hover:before:inset-0 hover:before:w-full hover:before:h-full hover:before:rounded-[0.8rem] hover:before:bg-black/50">
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
      <BookmarkIcon isBookmarked={isBookmarked} onClick={addMovieToBookmark} />
    </div>
  );
}
