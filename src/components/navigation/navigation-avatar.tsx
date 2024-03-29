import type { ReactNode } from "react";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AppContext, type AuthSession } from "@/app/app-provider";
import { logoutAction } from "@/lib/server-actions/auth-session-action";
import AvatarImage from "@/public/shared/image-avatar.png";
import SvgIcon from "../svg/svg";

export default function NavigationAvatar() {
  const appContext = useContext(AppContext);
  const authSession = appContext?.session;
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
      {authSession && (
        <button className="group/logout hover:cursor-pointer" title="Logout" aria-label="Logout" onClick={handleLogout}>
          <SvgIcon variant="logoutIcon" className="transition-all group-hover/logout:fill-white" />
        </button>
      )}
      <AvatarWrapper authSession={authSession}>
        <Image src={AvatarImage} alt="Avatar" className="block h-full w-full" priority />
      </AvatarWrapper>
    </div>
  );
}

interface AvatarWrapperProps {
  children: ReactNode;
  authSession: AuthSession | undefined;
}

function AvatarWrapper({ children, authSession }: AvatarWrapperProps) {
  if (authSession) {
    return <div className="size-[2.4rem] rounded-full border border-white sm:size-16">{children}</div>;
  }

  return (
    <Link href="/login" className="size-[2.4rem] rounded-full border border-white sm:size-16">
      {children}
    </Link>
  );
}
