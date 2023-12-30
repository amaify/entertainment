import { useContext } from "react";
import movieData from "@/data.json";
import { AppContext } from "@/src/app/app-provider";
import { Show } from "@/src/app/page";
import { getBookmarkedShows } from "@/src/helpers/get-bookmarked-shows";
import Thumbnail from "../thumbnail/thumbnail";

export default function TrendingShows() {
  const bookmarkedMovies = useContext(AppContext)?.bkmarkedMovies;
  const trendingMovies = movieData.filter((movie) => movie.isTrending) as Show[];

  return (
    <section className="flex flex-col gap-10 mb-16">
      <h1 className="text-heading-lg text-white">Trending</h1>
      <div className="flex gap-16 flex-shrink w-full pr-[3.2rem] overflow-x-auto overflow-y-hidden [ trending-show-layout ]">
        {trendingMovies.map((movie) => (
          <div className="w-[47rem] flex-shrink-0" key={movie.title}>
            <Thumbnail
              variant="trending"
              category={movie.category}
              rating={movie.rating}
              title={movie.title}
              thumbnail={movie.thumbnail}
              year={movie.year}
              isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
              isTrending={movie.isTrending}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
