import React, {useEffect, useState} from 'react'
import herobg from "../assets/herobg2.jpg"
import { Bookmark, Play } from 'lucide-react';

const Hero = () => {
  const [movies, setMovies] = useState(null);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMwM2JmMTI1NGM4MGNlOTRhNzk0OWE3ZWY1NmI4MyIsIm5iZiI6MTc4ODA3NzAyMS45NjUsInN1YiI6IjZhOTNlM2RkODY4OGZkN2ViZThlNzc0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V0F-1niatlvgaIVTjY30EeW-RQgVUUN0MFUo4Y5bmpo'
  }
};

useEffect(() => {
  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
  .then(res => res.json())
  .then((res) =>{
    if(res && res.results && res.results.length > 0) {
      const randoxIndex = Math.floor(Math.random() * res.results.length);
      setMovies(res.results[randoxIndex]);
    }
  })
  .catch(err => console.error(err));
}, []);

  return (
    <div className='text-white relative'>
      <img src={`https://image.tmdb.org/t/p/original/${movies?.backdrop_path}`} alt="Hero" className='w-full rounded-2xl h-[700px] object-center object-cover' />
      <div className='flex space-x-2 md:space-x-4 absolute bottom-4 left-3 md:left-10 md:bottom-8 font-medium'>
        <button className='flex justify-center item-center bg-white hover:bg-gray-200  text-[#e59014] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Bookmark className='mr-2' />Save for later</button>
        <button className='flex justify-center item-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Play className='mr-2' />Watch now</button>
      </div>
    </div>
  );
}

export default Hero
