import type { ReactNode } from "react";
import Input from "@/components/ui/input";

interface Props {
  children: ReactNode;
  placeholderText: string;
}

export default function PagesLayout({ children, placeholderText }: Props) {
  return (
    <main className="pt-12">
      <div className="pr-[3.2rem]">
        <Input variant="searchInput" placeholder={placeholderText} />
      </div>
      {children}
    </main>
  );
}
