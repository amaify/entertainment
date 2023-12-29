import { redirect } from "next/navigation";
import PagesLayout from "@/src/components/layout/pages-layout";
import ShowsLayout from "@/src/components/layout/shows-layout";
import { authSessionAction } from "@/src/lib/server-actions/auth-session-action";

export type Category = "movies" | "series" | "bookmarks";

export default async function CategoryPage({ params }: { params: { category: Category } }) {
  const { category } = params;
  const session = await authSessionAction();

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

  if (!session && category === "bookmarks") redirect("/");

  if (category === "bookmarks") {
    return (
      <div className="flex flex-col gap-16">
        <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery>
          <ShowsLayout title="Bookmarked Movies" pageCategory="movies" />
        </PagesLayout>

        <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery={false}>
          <ShowsLayout title="Bookmarked TV Series" pageCategory="series" />
        </PagesLayout>
      </div>
    );
  }
  return (
    <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery>
      <ShowsLayout title={layoutTitle[category]} pageCategory={category} />
    </PagesLayout>
  );
}
