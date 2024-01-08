import type { ButtonHTMLAttributes } from "react";
import SvgIcon from "../svg/svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBookmarked: boolean;
}

export default function BookmarkIcon({ isBookmarked, ...props }: Props) {
  return (
    <button
      onClick={props.onClick}
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
