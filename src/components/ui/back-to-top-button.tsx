import { type ButtonHTMLAttributes } from "react";
import cn from "@/helpers/cn";
import SvgIcon from "../svg/svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
export default function BackToTopButton({ ...props }: Props) {
  return (
    <button
      className={cn(
        "group/top-btn fixed bottom-[3.4rem] right-[2rem] size-24 rounded-full bg-primary transition-colors hover:bg-tertiary-background sm:bottom-[4.4rem] sm:right-[4.4rem] 2xl:bottom-[8.4rem]"
      )}
      onClick={props.onClick}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SvgIcon variant="upArrowIcon" className="group-hover/top-btn:fill-white" />
      </div>
    </button>
  );
}
