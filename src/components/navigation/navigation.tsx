import Link from "next/link";
import SvgIcon from "@/components/svg/svg";
import NavigationAuth from "./navigation-auth";
import NavigationLinks from "./navigation-links";

export default function Navigation() {
  return (
    <nav className="flex h-full w-full flex-row items-center bg-secondary-background p-[1.6rem] sm:rounded-[1rem] xl:w-[9.6rem] xl:flex-col xl:rounded-[2rem] xl:p-0 xl:pb-[3.2rem] xl:pt-[3.541rem]">
      <Link href="/" className="mr-auto hover:cursor-pointer xl:mb-[7.5rem] xl:mr-0">
        <SvgIcon variant="logoIcon" />
      </Link>

      <NavigationLinks />
      <NavigationAuth />
    </nav>
  );
}
