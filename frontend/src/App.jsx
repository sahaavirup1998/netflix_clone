import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Moviepage from './pages/Moviepage'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/movie/:id"} element={<Moviepage />} />
      </Routes>
    </div>
  );
}

export default App
