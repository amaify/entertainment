import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/helpers/cn";
import SvgIcon, { IconVariant } from "../svg/svg";

interface NavLinks {
  href: "/" | "/movies" | "/series" | "/bookmarks";
  title: "Home" | "Movies" | "TV series" | "Bookmarks";
  icon: IconVariant;
}

const navLinks: NavLinks[] = [
  { title: "Home", icon: "navHomeIcon", href: "/" },
  { title: "Movies", icon: "navMovieIcon", href: "/movies" },
  { title: "TV series", icon: "navTvSeriesIcon", href: "/series" },
  { title: "Bookmarks", icon: "navBookmarkIcon", href: "/bookmarks" }
];

export default function NavigationLinks() {
  const pathname = usePathname();
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
