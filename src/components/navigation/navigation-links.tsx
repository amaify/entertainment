import Link from "next/link";
import { usePathname } from "next/navigation";
import SvgIcon, { type IconVariant } from "@/components/svg/svg";
import cn from "@/helpers/cn";
import useAppProviderContext from "@/hooks/use-app-provider-context";

export type AppPath = "/" | "/movies" | "/series" | "/bookmarks";

interface NavLinks {
  href: AppPath;
  title: "Home" | "Movies" | "TV series" | "Bookmarks";
  icon: IconVariant;
}

export default function NavigationLinks() {
  const pathname = usePathname();
  const { userId } = useAppProviderContext();

  const navLinks: NavLinks[] = [
    { title: "Home", icon: "navHomeIcon", href: "/" },
    { title: "Movies", icon: "navMovieIcon", href: "/movies" },
    { title: "TV series", icon: "navTvSeriesIcon", href: "/series" },
    ...(userId ? [{ title: "Bookmarks", icon: "navBookmarkIcon", href: "/bookmarks" } as NavLinks] : [])
  ];

  return (
    <ul className="mr-auto flex flex-row items-center gap-10 sm:gap-12 xl:mb-auto xl:mr-0 xl:flex-col xl:gap-16">
      {navLinks.map((link) => (
        <li key={link.title} title={link.title} aria-label={link.title} className="group/links">
          <Link href={link.href}>
            <SvgIcon
              variant={link.icon}
              className={cn("group-hover/links:fill-primary", { "fill-white": pathname === link.href })}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
