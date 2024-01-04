import { useContext } from "react";
import { getBookmarkedShows } from "@/helpers/get-bookmarked-shows";
import { getMovieImage } from "@/helpers/service-client";
import movieData from "@/src/data.json";
import Thumbnail from "../../components/thumbnail/thumbnail";
import { AppContext } from "../_components/app-provider";
import { Show } from "../page";

export default function TrendingShows() {
  const appContext = useContext(AppContext);
  const bookmaredMovies = appContext?.bkmarkedMovies;
  const trendingShows = appContext?.trendingShows;
  // const trendingMovies = movieData.filter((movie) => movie.isTrending) as Show[];

  return (
    <section className="flex flex-col gap-10 mb-16 pl-[1.6rem] sm:pl-[2.4rem] xl:pl-0">
      <h1 className="text-heading-lg-mobile text-white sm:text-heading-lg-tab md:text-heading-lg">Trending</h1>
      <div className="flex gap-16 flex-shrink w-full pr-[1.6rem] overflow-x-auto overflow-y-hidden sm:pr-[3.2rem] [ trending-show-layout ]">
        {trendingShows?.map((movie) => (
          <div className="w-[24rem] flex-shrink-0 sm:w-[47rem]" key={movie.id}>
            <Thumbnail
              variant="trending"
              category={movie.media_type}
              rating={movie.vote_average}
              title={movie.name}
              thumbnail={getMovieImage({ variant: "desktop", path: movie.backdrop_path })}
              year={+movie.release_date.split("-")[0]}
              isBookmarked={false}
              // isBookmarked={getBookmarkedShows({ show: movie, bkmarkedShow: bookmarkedMovies })}
              isTrending={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
