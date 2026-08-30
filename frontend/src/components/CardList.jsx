import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

const CardList = ({title, category}) => {
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmMwM2JmMTI1NGM4MGNlOTRhNzk0OWE3ZWY1NmI4MyIsIm5iZiI6MTc4ODA3NzAyMS45NjUsInN1YiI6IjZhOTNlM2RkODY4OGZkN2ViZThlNzc0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V0F-1niatlvgaIVTjY30EeW-RQgVUUN0MFUo4Y5bmpo",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>
      <Swiper className="mySwiper" spaceBetween={10} slidesPerView={"auto"}>
        {data.map((card) => (
          <SwiperSlide className="max-w-72" key={card.id}>
            <Link to={`/movie/${card.id}`}>
              <img
                className="h-44 w-full object-center object-cover"
                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                alt={card.title}
              />
              <p className="text-center pt-2">{card.original_title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardList
