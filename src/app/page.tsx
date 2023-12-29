import PagesLayout from "../components/layout/pages-layout";
import ShowsLayout from "../components/layout/shows-layout";
import TrendingShows from "../components/layout/trending-shows";

export default async function Home() {
  return (
    <PagesLayout placeholderText="Search for movies or TV series" showSearchQuery>
      <TrendingShows />
      <ShowsLayout title="Recommended for you" />
    </PagesLayout>
  );
}
