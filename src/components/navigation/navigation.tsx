import Link from "next/link";
import SvgIcon from "../svg/svg";
import NavigationAvatar from "./navigation-avatar";
import NavigationLinks from "./navigation-links";

export default function Navigation() {
  return (
    <nav className="w-[9.6rem] h-full bg-secondary-background flex flex-col items-center pt-[3.541rem] pb-[3.2rem] rounded-[2rem]">
      <Link href="/" className="hover:cursor-pointer mb-[7.5rem]">
        <SvgIcon variant="logoIcon" />
      </Link>

      <NavigationLinks />
      <NavigationAvatar />
    </nav>
  );
}
