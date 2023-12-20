import SvgIcon from "../svg/svg";

export default function PlayButton() {
  return (
    <div className="flex items-center gap-[1.9rem] p-[0.9rem] rounded-full bg-white/25 w-[11.7rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SvgIcon variant="playIcon" />
      <p className="capitalize text-heading-xs text-white">play</p>
    </div>
  );
}
