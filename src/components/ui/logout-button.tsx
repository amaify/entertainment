"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { logoutAction } from "@/lib/server-actions/logout-action";

import Button from "./button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const logout = await logoutAction();

    if (logout.message !== "success") {
      toast.error(logout.message);
      return;
    }

    toast.success("Successfully logged out");
    router.push("/");
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}
