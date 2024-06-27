import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SvgIcon from "@/components/svg/svg";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) redirect("/");

  return (
    <section className="flex h-screen w-full flex-col items-center gap-[5.84rem] px-[1.6rem] pt-[4.8rem] sm:gap-[8.3rem] sm:px-0 sm:pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>
      {children}
    </section>
  );
}
