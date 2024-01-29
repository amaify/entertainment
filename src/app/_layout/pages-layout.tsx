import { type ReactNode } from "react";
import SearchInput from "@/components/search-input/search-input";
interface Props {
  children: ReactNode;
  placeholderText: string;
  showSearchQuery?: boolean;
}

export default function PagesLayout({ children, showSearchQuery, placeholderText }: Props) {
  return (
    <div>
      {showSearchQuery && <SearchInput placeholderText={placeholderText} />}
      {children}
    </div>
  );
}
