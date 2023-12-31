import type { ReactNode } from "react";
import SearchInput from "@/components/ui/search-input";
interface Props {
  children: ReactNode;
  placeholderText: string;
  showSearchQuery?: boolean;
}

export default function PagesLayout({ children, showSearchQuery, placeholderText }: Props) {
  return (
    <main className="xl:pt-12">
      {showSearchQuery && <SearchInput placeholderText={placeholderText} />}
      {children}
    </main>
  );
}
