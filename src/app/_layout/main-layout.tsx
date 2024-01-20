import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation/navigation";
import BackToTopButton from "@/components/ui/back-to-top-button";
import useScrollToTop from "../hooks/use-scroll-to-top";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const { showBackToTopButton, onBackToTopButtonClick } = useScrollToTop();

  return (
    <main className="flex h-screen w-full flex-col gap-[2.6rem] xl:flex-row xl:gap-[3.6rem]">
      {!isAuthPage && (
        <aside className="transition-all sm:px-[2.4rem] sm:pt-[2.3rem] xl:pb-[3.2rem] xl:pl-[3.2rem] xl:pt-[3.2rem]">
          <Navigation />
        </aside>
      )}

      <div className="flex h-screen w-full flex-col xl:overflow-auto">
        <div className="xl:overflow-auto" id="showsColumn">
          <div className="pb-[3.2rem] pt-[1.2rem] xl:pt-[6.2rem]">{children}</div>
        </div>
        {showBackToTopButton && <BackToTopButton onClick={onBackToTopButtonClick} />}
      </div>
    </main>
  );
}
