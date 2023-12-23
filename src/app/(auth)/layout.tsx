import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SvgIcon from "@/components/svg/svg";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (headers().get("cookie")) return redirect("/");

  return (
    <section className="flex flex-col items-center gap-[8.3rem] h-screen pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>
      {children}
    </section>
  );
}
