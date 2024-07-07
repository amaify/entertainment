import type { ReactNode } from "react";
import Typography from "@/components/typography/typography";

export default function TrendingShowWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="mb-16 flex flex-col gap-10 pl-[1.6rem] sm:pl-[2.4rem] xl:pl-0">
      <Typography as="h1" intent="fluid-heading">
        Trending
      </Typography>
      <div className="[ trending-show-layout ] flex w-full flex-shrink gap-16 overflow-x-auto overflow-y-hidden pr-[1.6rem] sm:pr-[3.2rem]">
        {children}
      </div>
    </section>
  );
}
