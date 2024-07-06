import type { ButtonHTMLAttributes } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SvgIcon from "@/components/svg/svg";
import { addMovieToBookmarkAction, removeMovieFromBookmarkAction } from "@/lib/server-actions/bookmark-action";
import { useAppProviderContext } from "src/app/app-provider";
import type { ShowCategory } from "src/app/layout";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBookmarked: boolean;
  category: ShowCategory;
  title: string;
  show_id: number;
  year: number;
  rating: number;
  thumbnail: string;
}

export interface BookmarkProperties {
  category: ShowCategory;
  title: string;
  show_id: number;
  year: number;
  rating: number;
  thumbnail: string;
}

export default function BookmarkIcon({ isBookmarked, title, category, show_id, year, rating, thumbnail }: Props) {
  const queryClient = useQueryClient();
  const { userId } = useAppProviderContext();

  const loadingToastMsg = !isBookmarked ? "Adding" : "Removing";
  const successToastMsg = !isBookmarked ? "Added to" : "Removed from";

  const bookmarkProperties = { show_id, title, category, year, rating, thumbnail };

  const onBookmark = async () => {
    const toastLoadingId = toast.loading(`${loadingToastMsg} to bookmarks...`);
    const { message } = !isBookmarked
      ? await addMovieToBookmarkAction(bookmarkProperties)
      : await removeMovieFromBookmarkAction({ title });

    if (message !== "success") {
      toast.dismiss(toastLoadingId);
      throw new Error(message);
    }

    toast.dismiss(toastLoadingId);
  };

  const mutation = useMutation({
    mutationFn: onBookmark,
    onSuccess: () => {
      toast.success(successToastMsg + "Bookmarks");
      queryClient.invalidateQueries({ queryKey: ["bookmarkedMovies"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  if (!userId) return null;

  return (
    <button
      onClick={() => mutation.mutate()}
      className="group/bookmark absolute right-[1.6rem] top-[1.6rem] h-[3.2rem] w-[3.2rem] rounded-full bg-primary-background/50 transition-all hover:cursor-pointer hover:bg-white"
    >
      <SvgIcon
        variant="bookmarkIcon"
        className="stroke-white stroke-[1.5] group-hover/bookmark:stroke-primary-background"
        fillColour={isBookmarked ? "#FFFFFF" : "none"}
      />
    </button>
  );
}
