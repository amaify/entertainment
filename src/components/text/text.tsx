import type { ReactNode } from "react";

interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className: string;
  children: ReactNode;
}

export default function Text({ as, children, className }: Props) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
