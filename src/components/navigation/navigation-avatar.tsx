import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SvgIcon from "@/components/svg/svg";
import Skeleton from "@/components/ui/skeleton";
import useDownloadUserAvatar from "@/hooks/use-download-user-avatar";
import { useAppProviderContext } from "src/app/app-provider";

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
