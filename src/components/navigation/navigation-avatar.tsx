import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppProviderContext } from "@/app/app-provider";
import useDownloadUserAvatar from "@/app/hooks/use-download-user-avatar";
import SvgIcon from "../svg/svg";
import Skeleton from "../ui/skeleton";

export default function NavigationAvatar() {
  const { userId, avatarUrl } = useAppProviderContext();
  const { data: userAvatar, isLoading } = useDownloadUserAvatar({ userId, avatarUrl });

  if (isLoading) return <Skeleton className="size-[2.4rem] rounded-full border border-white sm:size-16" />;

  return (
    <AvatarWrapper userId={userId}>
      {userId && userAvatar ? (
        <Image
          src={userAvatar}
          alt="Avatar"
          width={500}
          height={500}
          className="block size-full rounded-full object-cover"
        />
      ) : (
        <SvgIcon variant="noAvatar" className="size-full rounded-full" />
      )}
    </AvatarWrapper>
  );
}

function AvatarWrapper({ children, userId }: { children: ReactNode; userId: string | undefined }) {
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
