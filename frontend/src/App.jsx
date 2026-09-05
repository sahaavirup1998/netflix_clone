import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUp'


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
    </div>
  );
}

export default App
