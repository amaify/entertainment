import PagesLayout from "@/_layout/pages-layout";
import ShowsLayout from "@/_layout/shows-layout";
import TrendingShows from "@/_layout/trending-shows";

export default function Home() {
  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout title="Recommended for you" />
    </PagesLayout>
  );
}
