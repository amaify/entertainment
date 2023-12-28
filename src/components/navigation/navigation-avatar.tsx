import Image from "next/image";
import Link from "next/link";
import AvatarImage from "../../../public/shared/image-avatar.png";

export default function NavigationAvatar() {
  return (
    <Link href="/login" className="w-16 h-16">
      <Image src={AvatarImage} alt="Avatar" className="w-full h-full block" />
    </Link>
  );
}
