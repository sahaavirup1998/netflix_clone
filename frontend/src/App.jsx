import React, {useEffect} from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router-dom'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/SignIn'
import SignUP from './pages/SignUp'
import AiRecomendation from './pages/AiRecomendation'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const {fetchUser, fetchingUser} = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path={"/movie/:id"} element={<Moviepage />} />
        <Route path={"/sign-in"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUP />} />
        <Route path={"/ai-movie-pics"} element={<AiRecomendation />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App
