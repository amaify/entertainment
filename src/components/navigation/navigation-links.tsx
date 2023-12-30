import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "@/src/app/_components/app-provider";
import cn from "@/src/helpers/cn";
import SvgIcon, { IconVariant } from "../svg/svg";

interface NavLinks {
  href: "/" | "/movies" | "/series" | "/bookmarks";
  title: "Home" | "Movies" | "TV series" | "Bookmarks";
  icon: IconVariant;
}

export default function NavigationLinks() {
  const pathname = usePathname();
  const appContext = useContext(AppContext);
  const authSession = appContext?.session;

  const navLinks: NavLinks[] = [
    { title: "Home", icon: "navHomeIcon", href: "/" },
    { title: "Movies", icon: "navMovieIcon", href: "/movies" },
    { title: "TV series", icon: "navTvSeriesIcon", href: "/series" },
    ...(authSession ? [{ title: "Bookmarks", icon: "navBookmarkIcon", href: "/bookmarks" } as NavLinks] : [])
  ];

  return (
    <ul className="flex flex-row mr-auto items-center gap-10 sm:gap-12 xl:mb-auto xl:mr-0 xl:flex-col xl:gap-16">
      {navLinks.map((link) => (
        <li key={link.title} title={link.title} aria-label={link.title} className="group/links">
          <Link href={link.href}>
            <SvgIcon
              variant={link.icon}
              className={cn("group-hover/links:fill-white", { "fill-white": pathname === link.href })}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
