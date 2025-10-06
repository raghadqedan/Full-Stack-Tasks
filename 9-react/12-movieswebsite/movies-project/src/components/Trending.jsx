import { Spinner } from "./spinner";
import { Link } from "react-router-dom";
export default function Trending({
  movie: { $id, movie_id, poster_url },
  isLoading,
  index,
}) {
  console.log(poster_url);
  return isLoading ? (
    <div className="movie-card bg-dark-100 shadow-light-100/10 flex min-h-[250px] w-[300px] items-center justify-center gap-3 rounded-2xl p-1 shadow-inner max-sm:w-full">
      <Spinner />
    </div>
  ) : (
    <Link to={`/movie/${movie_id}`} className={"flex-shrink-0"}>
      <div className="trending-card align-items-center flex w-[222px] flex-shrink-0 cursor-pointer flex-row rounded-2xl max-sm:w-full">
        <p className={"fancy-text text-dark-100 max-sm:text-[110px]"}>
          {index + 1}
        </p>

        <img
          className={
            "hover: shadow-light-100 box-shadow z-5 -m-3.5 h-[250px] rounded-xl object-cover transition-all duration-300 hover:scale-105 hover:shadow-2xl max-sm:h-[200px] max-sm:w-full lg:w-[175px]"
          }
          src={!poster_url.includes("null") ? poster_url : "/000000H1.jpg"}
        ></img>
      </div>
    </Link>
  );
}
