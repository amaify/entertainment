import SvgIcon from "../svg/svg";

export default function ThumbnailPlayButton() {
  return (
    <span className="invisible absolute left-1/2 top-1/2 flex w-[11.7rem] -translate-x-1/2 -translate-y-1/2 items-center gap-[1.9rem] rounded-full bg-white/25 p-[0.9rem] md:group-hover/play:visible">
      <SvgIcon variant="playIcon" />
      <p className="text-heading-xs capitalize text-white">play</p>
    </span>
  );
}
