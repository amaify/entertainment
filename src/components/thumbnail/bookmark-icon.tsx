import SvgIcon from "../svg/svg";

export default function BookmarkIcon() {
  const isBookmarked = true;
  return (
    <div className="w-[3.2rem] h-[3.2rem] rounded-full transition-all bg-primary-background/50 group/bookmark absolute top-[1.6rem] right-[1.6rem] hover:cursor-pointer hover:bg-white">
      <SvgIcon
        variant="bookmarkIcon"
        className="stroke-white stroke-[1.5] group-hover/bookmark:stroke-primary-background"
        fillColour={isBookmarked ? "#FFFFFF" : "none"}
      />
    </div>
  );
}
