import type { ReactNode } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SvgIcon from "@/src/components/svg/svg";
import { createClient } from "@/src/lib/supabase/server";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) redirect("/");

  return (
    <section className="flex flex-col items-center gap-[8.3rem] h-screen pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>
      {children}
    </section>
  );
}
