import type { ReactNode } from "react";
import Typography from "@/components/typography/typography";
import cn from "@/helpers/cn";
import styles from "./layout.module.css";

interface LayoutWrapper {
  children: ReactNode;
  layoutTitle: string;
  error?: Error | null;
}

export default function ShowsLayoutWrapper({ children, layoutTitle, error }: LayoutWrapper) {
  return (
    <section className="px-[1.6rem] pb-[1.6rem] sm:px-[2.4rem] sm:pb-[2.4rem] xl:px-0 xl:pb-0">
      <Typography as="h1" intent="fluid-heading" className="mb-[3.2rem]">
        {layoutTitle}
      </Typography>
      <div className={cn(!error ? styles.shows_layout : "")}>{children}</div>
    </section>
  );
}
