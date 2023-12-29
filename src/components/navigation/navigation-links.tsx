import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/src/app/app-provider";
import cn from "@/src/helpers/cn";
import SvgIcon, { IconVariant } from "../svg/svg";

interface NavLinks {
  href: "/" | "/movies" | "/series" | "/bookmarks";
  title: "Home" | "Movies" | "TV series" | "Bookmarks";
  icon: IconVariant;
}

export default function NavigationLinks() {
  const pathname = usePathname();
  const authSession = useContext(AuthContext);

  const navLinks: NavLinks[] = [
    { title: "Home", icon: "navHomeIcon", href: "/" },
    { title: "Movies", icon: "navMovieIcon", href: "/movies" },
    { title: "TV series", icon: "navTvSeriesIcon", href: "/series" },
    ...(authSession ? [{ title: "Bookmarks", icon: "navBookmarkIcon", href: "/bookmarks" } as NavLinks] : [])
  ];

  return (
    <ul className="flex flex-col items-center gap-16 mb-auto">
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
