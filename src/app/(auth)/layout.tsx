import type { ReactNode } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import SvgIcon from "@/components/svg/svg";
import { createClient } from "@/lib/supabase/server";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());
  const userSession = await supabase.auth.getSession();

  if (userSession.data.session) return redirect("/");

  return (
    <section className="flex flex-col items-center gap-[8.3rem] h-screen pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>
      {children}
    </section>
  );
}
