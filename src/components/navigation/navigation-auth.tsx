import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SvgIcon from "@/components/svg/svg";
import useAppProviderContext from "@/hooks/use-app-provider-context";
import { createClient } from "@/lib/supabase/client";
import NavigationAvatar from "./navigation-avatar";

export default function NavigationAuth() {
  const router = useRouter();
  const { userId } = useAppProviderContext();

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
      <NavigationAvatar />
    </div>
  );
}
