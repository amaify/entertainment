import type { ReactNode } from "react";
import Input from "@/components/ui/input";

interface Props {
  children: ReactNode;
  placeholderText: string;
  showSearchQuery?: boolean;
}

export default function PagesLayout({ children, showSearchQuery, placeholderText }: Props) {
  return (
    <main className="pt-12">
      {showSearchQuery && (
        <div className="pr-[3.2rem] mb-[3.5rem]">
          <Input variant="searchInput" placeholder={placeholderText} />
        </div>
      )}
      {children}
    </main>
  );
}
