import { type ReactNode } from "react";
import SearchInput from "@/components/ui/search-input";
interface Props {
  children: ReactNode;
  placeholderText: string;
  showSearchQuery?: boolean;
}

export default function PagesLayout({ children, showSearchQuery, placeholderText }: Props) {
  return (
    <main className="relative">
      {showSearchQuery && <SearchInput placeholderText={placeholderText} />}
      {children}
    </main>
  );
}
