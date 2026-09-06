import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [validationError, setValidationError] = useState("");

  const { signup, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // setValidationError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      // setValidationError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    try {
      await signup(username, email, password);
      toast.success("Account created successfully!");

      navigate("/");
    } catch (error) {
      toast.error("Sign-up error:", error.message);
    }
  };

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

        <form
          onSubmit={handleSignUp}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-[#E50914] text-white rounded px-5 text-xl font-semibold hover:opacity-90 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-white text-base">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
