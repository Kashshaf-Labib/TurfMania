//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ExploreTurfs from "./pages/ExploreTurfs.jsx";
import ForTurfOwners from "./pages/ForTurfOwners.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exploreturfs" element={<ExploreTurfs />} />
          <Route path="/forturfowners" element={<ForTurfOwners />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
