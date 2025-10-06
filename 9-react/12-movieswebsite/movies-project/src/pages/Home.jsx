import { Search } from "../components/Search.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { MovieCard } from "../components/MovieCard.jsx";
import { useDebounced } from "../components/useDebounced.js";
import { updateSearchCount, getTrending } from "../appwrite.js";
import Trending from "../components/trending.jsx";

const API_KEY = import.meta.env.VITE_TDPM_API_KEY;
const API_URL = "https://api.themoviedb.org/3/";

function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTreandingLoading, setIsTreandingLoading] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1,
  );
  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const debouncedsearchInput = useDebounced(searchInput, 500);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const loadTrendingMovies = async () => {
    try {
      setIsTreandingLoading(true);
      const trendingMovies = await getTrending();
      setTrendingMovies(trendingMovies);
      setIsTreandingLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSearchInput(value) {
    setSearchInput(value);
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  async function fetchMovies(query = searchInput) {
    try {
      console.log("deponce", query);
      setIsLoading(true);
      const endpoint = searchInput
        ? `${API_URL}search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}discover/movie`;
      const response = await axios.get(endpoint, {
        ...options,
        params: {
          sort_by: "popularity.desc",
          include_adult: false,
          page: currentPage,
          with_genres: "28", // Action
        },
      });
      if (response.status == 200) {
        const data = await response.data;
        setMovies(data.results);
        setTotalPages(data.total_pages);

        console.log(response);
        if (query && data.results.length > 0) {
          updateSearchCount(query, data.results[0]);
          console.log("currrent", currentPage);
          return;
        }
      } else {
        throw new Error("Failed Fetch Movies,please try again later.");
      }
    } catch (error) {
      setErrorMessage(`${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (debouncedsearchInput) {
      setCurrentPage(1);
    }
  }, [debouncedsearchInput]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  useEffect(() => {
    fetchMovies(debouncedsearchInput);
  }, [debouncedsearchInput, currentPage]);

  console.log(movies);
  return (
    <>
      <div className="pattern bg-hero-pattern h-screen w-full bg-cover bg-center">
        <div className="wrapper p4 mx-auto mb-2 flex w-full flex-col p-2">
          <div className="header mx-auto mt-5 w-full sm:mt-10">
            <img
              className="mx-auto my-auto max-w-3xl rounded-2xl drop-shadow-md max-sm:w-3/4 sm:w-lg"
              src="/public/imagee.jpg"
            />
            <h1 className="xs:text-[40px] mx-auto max-w-4xl text-center text-5xl font-bold text-white max-sm:mt-3 max-sm:text-[30px] sm:text-[64px] sm:leading-[76px]">
              Find <span className="text-gradient">Movies</span> Yo Will Enjoy
              Without Hassle
            </h1>
            <Search
              searchInput={searchInput}
              handleSearchInput={handleSearchInput}
            />
          </div>
          <div className="trending-movies">
            <h1 className="mt-1 flex justify-start text-3xl text-white">
              Trending Movies
            </h1>
            <hr className="m-5 h-0.5 border-0 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF]" />
            <div className={"trending-wrapper relative px-2"}>
              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul className="hide-scrollbar align-items-center top-0 right-0 flex h-auto w-full gap-6 overflow-x-auto p-3">
                  {trendingMovies.map((m, index) => (
                    <Trending
                      key={m.$id}
                      movie={m}
                      isLoading={isTreandingLoading}
                      index={index}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="all-movies">
            <h1 className="flex justify-start text-3xl text-white">
              All Movies
            </h1>
            <hr className="m-5 h-0.5 border-0 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF]" />
            <div className={"flex justify-center"}>
              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {movies.map((m) => (
                    <MovieCard key={m.id} movie={m} isLoading={isLoading} />
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* //pagination buttons */}
          <div className="mt-4 mb-10 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded bg-purple-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded bg-purple-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
