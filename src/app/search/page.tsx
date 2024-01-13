import PagesLayout from "../_layout/pages-layout";

export default function SearchPage() {
  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <h1 className="text-heading-lg text-primary">Search page</h1>
    </PagesLayout>
  );
}
