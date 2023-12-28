import type { ReactNode } from "react";
import Navigation from "../navigation/navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-row gap-[3.6rem] w-full h-screen">
      <aside className="pl-[3.2rem] py-[3.2rem] transition-all">
        <Navigation />
      </aside>
      <div className="py-[3.2rem] w-full h-screen overflow-auto">{children}</div>
    </main>
  );
}
