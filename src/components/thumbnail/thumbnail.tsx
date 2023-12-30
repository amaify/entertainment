"use client";

import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Show } from "@/src/app/page";
import cn from "@/src/helpers/cn";
import { addMovieToBookmarkAction, removeMovieFromBookmarkAction } from "@/src/lib/server-actions/bookmark-action";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

interface Props extends Show {
  variant: "trending" | "popular";
}

export default function Thumbnail({ variant, title, thumbnail, category, rating, year, isBookmarked }: Props) {
  const imgSrc = variant === "trending" ? thumbnail.trending?.large : thumbnail.regular.large;
  const router = useRouter();

  const onBookmark = async () => {
    const loadingToastMsg = !isBookmarked ? "Adding" : "Removing";
    const successToastMsg = !isBookmarked ? "Added to" : "Removed from";

    const toastLoadingId = toast.loading(`${loadingToastMsg} to bookmarks...`);
    const { message } = !isBookmarked
      ? await addMovieToBookmarkAction({ title, category })
      : await removeMovieFromBookmarkAction({ title });

    if (message !== "success") {
      toast.error(message);
      toast.dismiss(toastLoadingId);
      return;
    }

    router.refresh();
    toast.success(successToastMsg + "Bookmarks");
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
          width={600}
          height={600}
          className="w-full h-full object-cover block rounded-[0.8rem]"
        />
        <ThumbnailPlayButton />
        {variant === "trending" && (
          <ThumbnailDescription category={category} variant={variant} title={title} year={year} rating={rating} />
        )}
      </button>
      <BookmarkIcon isBookmarked={isBookmarked} onClick={onBookmark} />
    </div>
  );
}
