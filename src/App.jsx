//import { useState } from 'react'
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadTurfs from "./components/Dashboard/UploadTurfs.jsx";
import SingleTurf from "./components/SingleTurf.jsx";
import About from "./pages/About.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import Contact from "./pages/Contact.jsx";
import ExploreTurfs from "./pages/ExploreTurfs.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage.jsx";

// Configure Axios to send and receive cookies
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/exploreturfs" element={<ExploreTurfs />} />
            <Route path="/forturfowners" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ownerlogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/owner/auth/register" element={<AdminRegister />} />
            <Route path="/account/:subpage?" element={<AccountPage />} />
            

            <Route
              path="/turf/:id"
              element={<SingleTurf />}
              // Use `element` prop instead of wrapping the object with curly braces
              // Define a `loader` function to fetch turf data
            />
            <Route path="/admin/dashboard/upload" element={<UploadTurfs />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
