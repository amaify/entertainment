import PagesLayout from "@/layout/pages-layout";

type Category = "movies" | "series" | "bookmarks";

export default function CategoryPage({ params }: { params: { category: Category } }) {
  const { category } = params;
  const queryPlaceholderText: Record<Category, string> = {
    movies: "Search for movies",
    series: "Search for TV series",
    bookmarks: "Search for bookmarked shows"
  };
  return (
    <PagesLayout placeholderText={queryPlaceholderText[category]}>
      <h1 className="text-heading-lg text-white">{category} Category Page</h1>
    </PagesLayout>
  );
}
