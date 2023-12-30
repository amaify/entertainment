import type { ReactNode } from "react";
import Navigation from "../../components/navigation/navigation";

export default function AppLayout({ children, pathname }: { children: ReactNode; pathname: string }) {
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  return (
    <main className="flex flex-col gap-[2.6rem] w-full h-screen xl:gap-[3.6rem] xl:flex-row">
      {!isAuthPage && (
        <aside className="transition-all sm:pt-[2.3rem] sm:px-[2.4rem] xl:pl-[3.2rem] xl:pt-[3.2rem] xl:pb-[3.2rem]">
          <Navigation />
        </aside>
      )}
      <div className=" w-full h-screen overflow-auto md:py-[3.2rem]">{children}</div>
    </main>
  );
}
