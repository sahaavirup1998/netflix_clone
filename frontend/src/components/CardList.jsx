import React from 'react';
import cardimg from "../assets/cardimg.jpg";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

const CardList = () => {
    const data = [
      {
        id: 1,
        title: "Card 1",
        description: "This is the description for Card 1.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Card 2",
        description: "This is the description for Card 2.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        title: "Card 3",
        description: "This is the description for Card 3.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        title: "Card 1",
        description: "This is the description for Card 1.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        title: "Card 2",
        description: "This is the description for Card 2.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 6,
        title: "Card 3",
        description: "This is the description for Card 3.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 7,
        title: "Card 1",
        description: "This is the description for Card 1.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 8,
        title: "Card 2",
        description: "This is the description for Card 2.",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 9,
        title: "Card 3",
        description: "This is the description for Card 3.",
        imageUrl: "https://via.placeholder.com/150",
      },
    ];

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">Upcoming</h2>
      <Swiper className="mySwiper" spaceBetween={10} slidesPerView={"auto"}>
        {data.map((card) => (
          <SwiperSlide className="max-w-72" key={card.id}>
            <img className="h-44 w-full object-center object-cover" src={cardimg} alt="" />
            <p className="text-center pt-2">{card.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CardList
