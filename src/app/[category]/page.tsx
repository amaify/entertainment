import { Suspense } from "react";
import { redirect } from "next/navigation";
import PagesLayout from "@/app/_layout/pages-layout";
import ShowsLayoutSkeleton from "@/app/_layout/shows-layout-skeleton";
import { authSessionAction } from "@/lib/server-actions/auth-session-action";
import BookmarkPage from "./bookmark-page";
import ShowspageClient from "./shows-page-client";
import type { ShowCategory } from "../layout";

type CategoryParams = { params: { category: Category } };
export type Category = "movies" | "series" | "bookmarks";

export async function generateMetadata({ params }: CategoryParams) {
  return {
    title: `Entertainment App | ${params.category.charAt(0).toUpperCase() + params.category.slice(1)}`
  };
}

const movieCategory: Record<"movies" | "series", ShowCategory> = {
  movies: "Movie",
  series: "TV Series"
};

export default async function CategoryPage({ params }: CategoryParams) {
  const { category } = params;
  const session = await authSessionAction();
  const showCategoryPathname: Category[] = ["movies", "series", "bookmarks"];

  const queryPlaceholderText: Record<Category, string> = {
    movies: "Search for movies",
    series: "Search for TV series",
    bookmarks: "Search for bookmarked shows"
  };

  const layoutTitle: Record<Category, string> = {
    movies: "Movies",
    series: "TV series",
    bookmarks: "Bookmarked shows"
  };

  if ((!session && category === "bookmarks") || !showCategoryPathname.includes(category)) redirect("/");

  if (category === "bookmarks")
    return (
      <Suspense fallback={<ShowsLayoutSkeleton />}>
        <BookmarkPage />
      </Suspense>
    );

  return (
    <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery>
      <ShowspageClient title={layoutTitle[category]} category={movieCategory[category]} />
    </PagesLayout>
  );
}
