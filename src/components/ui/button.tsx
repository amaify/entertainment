import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="h-[4.8rem] w-full rounded-[0.6rem] bg-primary text-body-md text-white transition-colors hover:bg-white hover:text-secondary-background"
    >
      {children}
    </button>
  );
}
