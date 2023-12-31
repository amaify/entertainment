import { useContext } from "react";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import movieData from "@/src/data.json";
import Thumbnail from "../../components/thumbnail/thumbnail";
import { AppContext } from "../_components/app-provider";
import { Show } from "../page";

export default function TrendingShows() {
  const bookmarkedMovies = useContext(AppContext)?.bkmarkedMovies;
  const trendingMovies = movieData.filter((movie) => movie.isTrending) as Show[];

  return (
    <section className="flex flex-col gap-10 mb-16 pl-[1.6rem] sm:pl-[2.4rem] xl:pl-0">
      <h1 className="text-heading-lg-mobile text-white sm:text-heading-lg-tab md:text-heading-lg">Trending</h1>
      <div className="flex gap-16 flex-shrink w-full pr-[1.6rem] overflow-x-auto overflow-y-hidden sm:pr-[3.2rem] [ trending-show-layout ]">
        {trendingMovies.map((movie) => (
          <div className="w-[24rem] flex-shrink-0 sm:w-[47rem]" key={movie.title}>
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
