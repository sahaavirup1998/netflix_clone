import React, { useEffect, useState } from "react";

const RecomendMovie = ({ recommendation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!recommendation || recommendation.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const movieResults = await Promise.all(
          recommendation.map(async (movie) => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                  movie.title
                )}&include_adult=false&language=en-US&page=1`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_TOKEN}`,
                  },
                }
              );

              if (!response.ok) {
                throw new Error(
                  `TMDB request failed: ${response.status}`
                );
              }

              const data = await response.json();

              /*
                Try to find the movie with the same year.
                If no matching year is found, use the first result.
              */
              const matchedMovie =
                data.results?.find((item) => {
                  const releaseYear =
                    item.release_date?.substring(0, 4);

                  return releaseYear === String(movie.year);
                }) || data.results?.[0];

              return {
                ...movie,

                tmdbId: matchedMovie?.id || null,

                posterPath:
                  matchedMovie?.poster_path || null,

                backdropPath:
                  matchedMovie?.backdrop_path || null,

                rating:
                  matchedMovie?.vote_average || null,

                overview:
                  matchedMovie?.overview || null,
              };
            } catch (error) {
              console.error(
                `Error fetching ${movie.title}:`,
                error
              );

              return {
                ...movie,
                tmdbId: null,
                posterPath: null,
                backdropPath: null,
                rating: null,
                overview: null,
              };
            }
          })
        );

        setMovies(movieResults);
      } catch (error) {
        console.error("Error fetching TMDB movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [recommendation, TMDB_TOKEN]);

  // Loading state
  if (loading) {
    return (
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-8 rounded-2xl bg-[#181818] border border-[#333333] px-6 py-10">

        <div className="flex flex-col items-center justify-center gap-3">

          <div className="w-10 h-10 border-4 border-[#333333] border-t-[#e50914] rounded-full animate-spin" />

          <p className="text-white text-lg">
            Finding movie posters...
          </p>

          <p className="text-gray-500 text-sm">
            Getting movie information from TMDB
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="relative z-10 w-full mt-8 max-w-7xl mx-auto rounded-2xl bg-[#181818] shadow-2xl border border-[#333333] px-6 py-8">

      {/* Heading */}
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Recommended Movies
      </h3>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

        {movies.map((movie, index) => (
          <div
            key={`${movie.title}-${index}`}
            className="
              group
              bg-[#232323]
              border
              border-[#333333]
              rounded-xl
              overflow-hidden
              text-white
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-[#e50914]
              hover:shadow-lg
              hover:shadow-red-900/20
            "
          >

            {/* Poster */}
            <div className="relative w-full aspect-[2/3] bg-[#111111] overflow-hidden">

              {movie.posterPath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={`${movie.title} poster`}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center px-4 text-center">

                  <span className="text-4xl mb-3">
                    🎬
                  </span>

                  <span className="text-gray-500 text-sm">
                    No Image Available
                  </span>

                </div>
              )}

              {/* Movie Number */}
              <span
                className="
                  absolute
                  top-2
                  left-2
                  bg-black/80
                  text-white
                  text-xs
                  font-semibold
                  px-2
                  py-1
                  rounded
                "
              >
                #{index + 1}
              </span>

              {/* Rating */}
              {movie.rating !== null && (
                <span
                  className="
                    absolute
                    top-2
                    right-2
                    bg-black/80
                    text-yellow-400
                    text-xs
                    font-semibold
                    px-2
                    py-1
                    rounded
                  "
                >
                  ⭐ {movie.rating.toFixed(1)}
                </span>
              )}

            </div>

            {/* Movie Information */}
            <div className="p-4">

              {/* Year + Language */}
              <div className="flex items-center justify-between gap-2 mb-3">

                <span className="text-xs font-semibold text-gray-500">
                  {movie.year}
                </span>

                <span
                  className="
                    text-xs
                    px-2
                    py-1
                    rounded-full
                    bg-[#333333]
                    text-gray-300
                    truncate
                  "
                >
                  {movie.language}
                </span>

              </div>

              {/* Movie Title */}
              <h4
                className="
                  text-lg
                  font-bold
                  text-[#e50914]
                  group-hover:text-red-500
                  line-clamp-2
                "
              >
                {movie.title}
              </h4>

              {/* Genre */}
              <p className="text-sm text-gray-400 mt-2">
                {movie.genre}
              </p>

              {/* Reason */}
              <p
                className="
                  text-sm
                  text-gray-300
                  mt-4
                  leading-relaxed
                  line-clamp-4
                "
              >
                {movie.reason}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RecomendMovie;
