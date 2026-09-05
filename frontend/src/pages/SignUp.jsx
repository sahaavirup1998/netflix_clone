import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg_banner.jpg)",
      }}
    >
      <div className="max-w-[500px] w-full bg-black bg-opacity-70 rounded px-8 py-14 mt-8 mx-auto">
        <h1 className="text-3xl font-medium text-white mb-7 text-center">
          Sign Up
        </h1>
        <form className="flex flex-col item-center justify-center gap-5">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base display: inline-block"
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base display: inline-block"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base display: inline-block"
          />
          <Link to={"/sign-in"}>
            <button
              type="submit"
              className="w-full h-[50px] bg-[#E50914] text-white rounded px-5 text-xl font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </form>
        <div className="text-center mt-4">
          <p className="text-white text-base">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp
