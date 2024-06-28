import Image from "next/image";
import SvgIcon from "@/components/svg/svg";

interface Props {
  imageSource: string;
}

export default function UserAvatar({ imageSource }: Props) {
  if (imageSource) {
    return <Image src={imageSource} alt="Avatar" className="size-full" width={500} height={500} />;
  }
  return <SvgIcon variant="noAvatar" className="size-full" />;
}
