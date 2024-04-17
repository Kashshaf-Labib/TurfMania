//import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoardLayout from './components/Dashboard/DashBoardLayout.jsx';
import UploadTurfs from './components/Dashboard/UploadTurfs.jsx';
import SingleTurf from './components/SingleTurf.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ExploreTurfs from './pages/ExploreTurfs.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exploreturfs" element={<ExploreTurfs />} />
          <Route path="/forturfowners" element={<DashBoardLayout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/turf/:id"
            element={<SingleTurf />}
            // Use `element` prop instead of wrapping the object with curly braces
            // Define a `loader` function to fetch turf data
          />
          <Route path="/admin/dashboard/upload" element={<UploadTurfs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
