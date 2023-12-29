import { useContext } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarImage from "@/public/shared/image-avatar.png";
import { AuthContext } from "@/src/app/auth-provider";
import { logoutAction } from "@/src/lib/server-actions/logout-action";
import SvgIcon from "../svg/svg";

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
      <Link href="/login" className="w-16 h-16">
        <Image src={AvatarImage} alt="Avatar" className="w-full h-full block" />
      </Link>
    </div>
  );
}
