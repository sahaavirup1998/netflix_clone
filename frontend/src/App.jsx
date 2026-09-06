import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUp'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path={"/sign-in"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUP />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App
