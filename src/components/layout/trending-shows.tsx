import Thumbnail from "../thumbnail/thumbnail";

const trendingMovies = [
  { variant: "trending" },
  { variant: "trending" },
  { variant: "trending" },
  { variant: "trending" },
  { variant: "trending" },
  { variant: "trending" }
] as const;

export default function TrendingShows() {
  return (
    <section className="flex flex-col gap-10 mb-16">
      <h1 className="text-heading-lg text-white">Trending</h1>
      <div className="flex gap-16 flex-shrink w-full pr-[3.2rem] overflow-x-auto overflow-y-hidden [ trending-show-layout ]">
        {trendingMovies.map((movie) => (
          <div className="w-[47rem] flex-shrink-0" key={movie.variant}>
            <Thumbnail variant={movie.variant} />
          </div>
        ))}
      </div>
    </section>
  );
}
