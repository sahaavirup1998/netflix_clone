import React,{useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { Play, Slice } from 'lucide-react';

const Moviepage = () => {
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const id = useParams();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMwM2JmMTI1NGM4MGNlOTRhNzk0OWE3ZWY1NmI4MyIsIm5iZiI6MTc4ODA3NzAyMS45NjUsInN1YiI6IjZhOTNlM2RkODY4OGZkN2ViZThlNzc0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V0F-1niatlvgaIVTjY30EeW-RQgVUUN0MFUo4Y5bmpo",
      },
    };

    useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id.id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.error(err));

      fetch(`https://api.themoviedb.org/3/movie/${id.id}/recommendations?language=en-US&page=1`, options)
        .then((res) => res.json())
        .then((res) => setRecommendations(res.results || []))
        .catch((err) => console.error(err));

      fetch(`https://api.themoviedb.org/3/movie/${id.id}/videos?language=en-US`, options,)
        .then((res) => res.json())
        .then((res) => {
          const trailer = res.results.find((video) =>video.site === "YouTube" && video.type === "Trailer");
          setTrailerKey(trailer.key || null);
        })
        .catch((err) => console.error(err));
    }, [id])

    if (!movie) {
        return (
        <div className='flex item-center justify-center h-screen'>
            <span className='text-xl text-red-500'>Loading...</span>
        </div>
        );
      }
    
  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div
        className="relative h-[70vh] flex item-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
        <div className="relative z-10 flex p-8 gap-8 items-end">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-48 hidden md:block"
          />
          <div className="">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span>⭐️ {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="text-gray-200 max-w-2xl">{movie.overview}</p>
            <Link to={trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : "#"} target="_blank" rel="noopener noreferrer">
              <button className="flex justify-center item-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
                <Play className="mr-2" />
                Watch now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-8">
          <div className="flex1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold tet-white">Status: </span>
                <span className="ml-2">{movie.status}</span>
              </li>
              <li>
                <span className="font-semibold tet-white">Released Date: </span>
                <span className="ml-2">{movie.release_date}</span>
              </li>
              <li>
                <span className="font-semibold tet-white">
                  Original Language:{" "}
                </span>
                <span className="ml-2">
                  {movie.original_language.toUpperCase()}
                </span>
              </li>
              <li>
                <span className="font-semibold tet-white">Budget: </span>
                <span className="ml-2">${movie.budget.toLocaleString()}</span>
              </li>
              <li>
                <span className="font-semibold tet-white">Revenue: </span>
                <span className="ml-2">${movie.revenue.toLocaleString()}</span>
              </li>
              <li>
                <span className="font-semibold tet-white">
                  Production Companies:{" "}
                </span>
                <span className="ml-2">
                  {movie.production_companies &&
                  movie.production_companies.length > 0
                    ? movie.production_companies
                        .map((company) => company.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold tet-white">
                  Production Countries:{" "}
                </span>
                <span className="ml-2">
                  {movie.production_countries &&
                  movie.production_countries.length > 0
                    ? movie.production_countries
                        .map((country) => country.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold tet-white">
                  Spoken Languages:{" "}
                </span>
                <span className="ml-2">
                  {movie.spoken_languages && movie.spoken_languages.length > 0
                    ? movie.spoken_languages
                        .map((language) => language.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="text-gray-400 italic mb-6">
              {movie.tagline || "No Tagline Available"}
            </p>

            <h3 className="font-semibold text-white mb-2">Overview</h3>
            <p className="text-gray-200 italic mb-6">
              {movie.overview || "No overview available"}
            </p>
          </div>
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">
            You might also like...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#232323] rounded-lg p-4 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/movie/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${rec.poster_path}`}
                    alt={rec.title}
                    className="rounded-lg mb-2 w-full h-[300px] object-cover"
                  />
                </Link>
                <h3 className="font-semibold text-white mt-2">{rec.title}</h3>
                <p className="text-gray-400 text-sm">
                  {rec.release_date?.slice(0, 4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Moviepage
