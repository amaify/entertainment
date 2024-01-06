"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Show } from "@/app/page";
import cn from "@/helpers/cn";
import { addMovieToBookmarkAction, removeMovieFromBookmarkAction } from "@/lib/server-actions/bookmark-action";
import BookmarkIcon from "./thumbnail-bookmark-icon";
import ThumbnailDescription from "./thumbnail-description";
import ThumbnailPlayButton from "./thumbnail-play-button";

interface Props extends Show {
  variant: "trending" | "popular";
}

export default function Thumbnail({ variant, title, thumbnail, category, rating, year, isBookmarked }: Props) {
  // const imgSrc = variant === "trending" ? thumbnail.trending?.large : thumbnail.regular.large;
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
      className={cn("relative w-full", {
        "h-[11rem] sm:h-[17.4rem]": variant === "popular",
        "h-[14rem] sm:h-[23rem]": variant === "trending"
      })}
    >
      <button
        className={cn(
          "group/play relative h-full w-full rounded-[0.8rem] before:transition-all",
          "lg:hover:cursor-pointer lg:hover:before:absolute lg:hover:before:inset-0 lg:hover:before:h-full lg:hover:before:w-full lg:hover:before:rounded-[0.8rem] lg:hover:before:bg-black/50 lg:hover:before:content-['']"
        )}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={600}
          height={600}
          priority
          className="block h-full w-full rounded-[0.8rem] object-cover object-right"
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
