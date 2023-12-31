import data from "@/src/data.json";
import HomepageClient from "./_components/home-page.client";

export type ShowCategory = "Movie" | "TV Series";

export type MovieThumbnail = {
  trending?: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
};
export interface Show {
  title: string;
  year: number;
  category: ShowCategory;
  rating: "PG" | "18+" | "E";
  isTrending: boolean;
  thumbnail: MovieThumbnail;
  isBookmarked: boolean;
}

export default async function Home() {
  return <HomepageClient data={data as Show[]} />;
}
