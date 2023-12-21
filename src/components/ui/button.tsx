import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      type={props.type}
      className="bg-primary w-[33.6rem] h-[4.8rem] rounded-[0.6rem] text-white text-body-md transition-colors hover:bg-white hover:text-secondary-background"
    >
      {children}
    </button>
  );
}
