import Link from "next/link";
import { redirect } from "next/navigation";
import SvgIcon from "@/components/svg/svg";
import Typography from "@/components/typography/typography";
import { getUserAction } from "@/lib/server-actions/auth-session-action";
import { createClient } from "@/lib/supabase/server";
import ProfilePageClient from "./profile-page-client";

export default async function UserProfile() {
  const user = await getUserAction();
  const supabase = createClient();

  if (!user) {
    redirect("/");
  }

  const { data } = await supabase.from("users_profile").select("avatar_url").eq("id", user.id);
  const avatarUrl = data[0]?.avatar_url;

  return (
    <section className="flex h-screen w-full flex-col items-center gap-[5.84rem] px-[1.6rem] pt-[4.8rem] sm:gap-[8.3rem] sm:px-0 sm:pt-[7.841rem]">
      <Link href="/">
        <SvgIcon variant="logoIcon" />
      </Link>

      <section className="w-full rounded-[2rem] bg-secondary-background px-[2.4rem] pb-[3.2rem] pt-[3.2rem] sm:mx-auto sm:w-[60rem] sm:p-[3.2rem]">
        <Typography as="h1" intent="heading-lg" className="mb-8 text-left capitalize">
          Profile
        </Typography>
        <ProfilePageClient avatarUrl={avatarUrl} />
      </section>
    </section>
  );
}
