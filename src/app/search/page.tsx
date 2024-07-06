import { redirect } from "next/navigation";
import SearchPageClient from "./search-page.client";
import PagesLayout from "../_layout/pages-layout";

export interface PageQueryParams {
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams: { q } }: PageQueryParams) {
  if (!q) redirect("/");

  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <SearchPageClient queryString={q} />
    </PagesLayout>
  );
}
