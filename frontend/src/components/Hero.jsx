import React from 'react'
import herobg from "../assets/herobg2.jpg"
import { Bookmark, Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className='text-white relative'>
      <img src={herobg} alt="Hero" className='w-full rounded-2xl h-[700px] object-center object-cover' />
      <div className='flex space-x-2 md:space-x-4 absolute bottom-4 left-3 md:left-10 md:bottom-8 font-medium'>
        <button className='flex justify-center item-center bg-white hover:bg-gray-200  text-[#e59014] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Bookmark className='mr-2' />Save for later</button>
        <button className='flex justify-center item-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Play className='mr-2' />Watch now</button>
      </div>
    </div>
  );
}

export default Hero
