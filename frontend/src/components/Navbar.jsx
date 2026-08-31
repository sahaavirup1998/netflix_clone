import React from "react";
import { Search } from "lucide-react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm font-medium md:text-[15px] text-nowrap">
    <Link to='/'>
      <img src={logo} alt="Logo" className="w-32 brightness-125 cursor-pointer" />
    </Link>
      <ul className="hidden xl:flex space-x-6">
        <li className="cursor-pointer hover:text-[#e50914]">Home</li>
        <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
        <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
        <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
        <li className="cursor-pointer hover:text-[#e50914]">Games</li>
        <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
        <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
      </ul>
      <div className="flex items-center space-x-4 relative">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
          />
          <Search className="absolute top-2 right-5" />
        </div>
        <button className="bg-[#e50914] px-4 py-2 text-white cursor-pointer rounded-md">
          Get AI Movie Pics
        </button>
        <button className="border border-[#333333] px-4 py-2 text-white cursor-pointer rounded-md">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
