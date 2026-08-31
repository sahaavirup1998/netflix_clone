import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Play } from 'lucide-react';

const Moviepage = () => {
    const [movie, setMovie] = useState(null);
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
            <button className="flex justify-center item-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base mt-2 md:mt-4">
              <Play className="mr-2" />
              Watch now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moviepage
