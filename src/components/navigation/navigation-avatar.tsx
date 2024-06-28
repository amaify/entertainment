import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppProviderContext } from "@/app/app-provider";
import useDownloadUserAvatar from "@/app/hooks/use-download-user-avatar";
import { createClient } from "@/lib/supabase/client";
import SvgIcon from "../svg/svg";

export default function NavigationAvatar() {
  const router = useRouter();
  const { userId } = useAppProviderContext();
  const { data } = useDownloadUserAvatar();

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.replace("/");
      router.refresh();
      toast.success("Logout successful");
      return;
    }

    toast.error(error.message);
  };

  return (
    <div className="flex flex-row items-center gap-8 xl:flex-col xl:gap-10">
      {userId && (
        <button className="group/logout hover:cursor-pointer" title="Logout" aria-label="Logout" onClick={handleLogout}>
          <SvgIcon variant="logoutIcon" className="transition-all group-hover/logout:fill-white" />
        </button>
      )}
      <AvatarWrapper userId={userId}>
        {userId && data ? (
          <Image src={data} alt="Avatar" width={500} height={500} className="block size-full rounded-full" priority />
        ) : (
          <SvgIcon variant="noAvatar" className="size-full rounded-full" />
        )}
      </AvatarWrapper>
    </div>
  );
}

interface AvatarWrapperProps {
  children: ReactNode;
  userId: string | undefined;
}

function AvatarWrapper({ children, userId }: AvatarWrapperProps) {
  const className = "size-[2.4rem] rounded-full border border-white sm:size-16";

  if (userId) {
    return (
      <Link href="/profile" title="Profile" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href="/login" title="Login Or Register" className={className}>
      {children}
    </Link>
  );
}
