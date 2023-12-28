import movieData from "../../../starter-code/data.json";
import Thumbnail from "../thumbnail/thumbnail";
import { ShowCategory } from "../thumbnail/thumbnail-description";

export default function TrendingShows() {
  const trendingMovies = movieData.filter((movie) => movie.isTrending);
  return (
    <section className="flex flex-col gap-10 mb-16">
      <h1 className="text-heading-lg text-white">Trending</h1>
      <div className="flex gap-16 flex-shrink w-full pr-[3.2rem] overflow-x-auto overflow-y-hidden [ trending-show-layout ]">
        {trendingMovies.map((movie) => (
          <div className="w-[47rem] flex-shrink-0" key={movie.title}>
            <Thumbnail
              variant="trending"
              category={movie.category as ShowCategory}
              rating={movie.rating}
              title={movie.title}
              thumbnail={movie.thumbnail}
              year={movie.year}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
