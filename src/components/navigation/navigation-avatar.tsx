import Image from "next/image";
import AvatarImage from "../../../public/shared/image-avatar.png";

export default function NavigationAvatar() {
  return (
    <div className="w-16 h-16">
      <Image src={AvatarImage} alt="Avatar" className="w-full h-full block" />
    </div>
  );
}
