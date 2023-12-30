import Link from "next/link";
import SvgIcon from "../svg/svg";
import NavigationAvatar from "./navigation-avatar";
import NavigationLinks from "./navigation-links";

export default function Navigation() {
  return (
    <nav className="w-full h-full bg-secondary-background flex flex-row items-center p-[1.6rem] sm:rounded-[1rem] xl:rounded-[2rem] xl:p-0 xl:pt-[3.541rem] xl:pb-[3.2rem] xl:w-[9.6rem] xl:flex-col">
      <Link href="/" className="mr-auto hover:cursor-pointer xl:mr-0 xl:mb-[7.5rem]">
        <SvgIcon variant="logoIcon" />
      </Link>

      <NavigationLinks />
      <NavigationAvatar />
    </nav>
  );
}
