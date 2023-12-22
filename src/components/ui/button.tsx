import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="bg-primary w-full h-[4.8rem] rounded-[0.6rem] text-white text-body-md transition-colors hover:bg-white hover:text-secondary-background"
    >
      {children}
    </button>
  );
}
