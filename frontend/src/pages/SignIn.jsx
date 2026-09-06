import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [validationError, setValidationError] = useState("");
  const navigate = useNavigate()

  const { signin, isLoading} = useAuthStore()

  const handleSignIn = async (e) => {
    e.preventDefault();

    // setValidationError("");

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await signin(email, password);
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Sign-in error:", error.message);
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
          Sign In
        </h1>
        <form onSubmit={handleSignIn} className="flex flex-col item-center justify-center gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base display: inline-block"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full h-[70px] bg-[#333333] text-white rounded px-5 text-base display: inline-block"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-[#E50914] text-white rounded px-5 text-xl font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-white text-base">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn
