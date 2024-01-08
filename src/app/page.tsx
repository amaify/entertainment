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
  rating: number;
  isTrending: boolean;
  thumbnail: string;
  // thumbnail: MovieThumbnail;
  isBookmarked: boolean;
}

export default function Home() {
  return <HomepageClient />;
}
