import type { HTMLAttributes } from "react";
import cn from "@/helpers/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: Props) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}
