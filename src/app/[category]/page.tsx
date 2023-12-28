import PagesLayout from "@/components/layout/pages-layout";
import ShowsLayout from "@/components/layout/shows-layout";

type Category = "movies" | "series" | "bookmarks";

export default function CategoryPage({ params }: { params: { category: Category } }) {
  const { category } = params;
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

  if (category === "bookmarks") {
    return (
      <div className="flex flex-col gap-16">
        <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery>
          <ShowsLayout title="Bookmarked Movies" />
        </PagesLayout>

        <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery={false}>
          <ShowsLayout title="Bookmarked TV Series" />
        </PagesLayout>
      </div>
    );
  }
  return (
    <PagesLayout placeholderText={queryPlaceholderText[category]} showSearchQuery>
      <ShowsLayout title={layoutTitle[category]} />
    </PagesLayout>
  );
}
