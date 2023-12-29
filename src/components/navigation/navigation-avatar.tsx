import { ReactNode, useContext } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarImage from "@/public/shared/image-avatar.png";
import type { AuthSession } from "@/src/app/app-provider";
import { AuthContext } from "@/src/app/auth-provider";
import { logoutAction } from "@/src/lib/server-actions/logout-action";
import SvgIcon from "../svg/svg";

interface AvatarWrapperProps {
  children: ReactNode;
  authSession: AuthSession;
}

const AvatarWrapper = ({ children, authSession }: AvatarWrapperProps) => {
  if (authSession) {
    return <div className="w-16 h-16">{children}</div>;
  }

  return (
    <Link href="/login" className="w-16 h-16">
      {children}
    </Link>
  );
};

export default function NavigationAvatar() {
  const authSession = useContext(AuthContext);
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
    <div className="flex flex-col items-center gap-10">
      {authSession && (
        <button className="group/logout hover:cursor-pointer" title="Logout" aria-label="Logout" onClick={handleLogout}>
          <SvgIcon variant="logoutIcon" className="transition-all group-hover/logout:fill-white" />
        </button>
      )}
      <AvatarWrapper authSession={authSession}>
        <Image src={AvatarImage} alt="Avatar" className="w-full h-full block" />
      </AvatarWrapper>
    </div>
  );
}
