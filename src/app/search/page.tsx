import { redirect } from "next/navigation";
import PagesLayout from "@/_layout/pages-layout";
import SearchPageClient from "./search-page.client";

export interface PageQueryParams {
    searchParams: Promise<{
        q: string;
    }>;
}

export default async function SearchPage({ searchParams }: PageQueryParams) {
    const { q } = await searchParams;
    if (!q) redirect("/");

    return (
        <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
            <SearchPageClient queryString={q} />
        </PagesLayout>
    );
}
