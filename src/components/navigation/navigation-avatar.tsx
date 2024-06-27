import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppProviderContext } from "@/app/app-provider";
import { logoutAction } from "@/lib/server-actions/auth-session-action";
import AvatarImage from "@/public/shared/image-avatar.png";
import SvgIcon from "../svg/svg";

export default function NavigationAvatar() {
  const { userId } = useAppProviderContext();
  const router = useRouter();

  const handleLogout = async () => {
    const { message } = await logoutAction();

    if (message !== "success") {
      toast.error(message);
      return;
    }

    toast.success("Logout successful");
    router.push("/");
  };

  return (
    <div className="flex flex-row items-center gap-8 xl:flex-col xl:gap-10">
      {userId && (
        <button className="group/logout hover:cursor-pointer" title="Logout" aria-label="Logout" onClick={handleLogout}>
          <SvgIcon variant="logoutIcon" className="transition-all group-hover/logout:fill-white" />
        </button>
      )}
      <AvatarWrapper userId={userId}>
        <Image src={AvatarImage} alt="Avatar" className="block h-full w-full" priority />
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
