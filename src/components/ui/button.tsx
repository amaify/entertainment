import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "h-[4.8rem] w-full rounded-[0.6rem] bg-primary text-body-md text-white transition-colors",
        "hover:bg-white hover:text-secondary-background",
        "disabled:pointer-events-none disabled:bg-primary/50 disabled:text-white/50"
      )}
    >
      {children}
    </button>
  );
}
