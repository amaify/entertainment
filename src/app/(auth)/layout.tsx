import SvgIcon from "@/components/svg/svg";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-[8.3rem] h-screen pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>
      {children}
    </section>
  );
}
