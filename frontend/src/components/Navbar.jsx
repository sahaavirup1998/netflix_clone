import React, {useState} from "react";
import { Search, HelpCircle, Settings, LogOut } from "lucide-react";
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const Navbar = () => {
  const {user, logout} = useAuthStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const avatarUrl = user?`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`:"https://api.dicebear.com/7.x/initials/svg?seed=Guest";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/sign-in");
  }

  return (
    <nav className="bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm font-medium md:text-[15px] text-nowrap">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-32 brightness-125 cursor-pointer"
        />
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
        {!user ? (
          <Link to="/sign-in">
            <button className="border border-[#333333] px-4 py-2 text-white cursor-pointer rounded-md">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="text-white text-md text-xl flex items-center gap-2 cursor-pointer">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50 top-12 border border-[#333333]">
                <div className="flex flex-col gap-1 items-center justify-center text-center mb-2">
                  <span className="font-bold text-white text-base">{user.username}</span>
                  <span className="text-sm text-gray-400">{user.email}</span>
                </div>
                <button className="flex items-center gap-5 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <HelpCircle />
                  Help Center
                </button>
                <button className="flex items-center gap-5 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <Settings />
                  Settings
                </button>
                <button onClick={handleLogout} className="flex items-center gap-5 px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] cursor-pointer">
                  <LogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
