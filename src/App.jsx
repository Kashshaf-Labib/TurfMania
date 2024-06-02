import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import UploadTurfs from "./components/Dashboard/UploadTurfs.jsx";
import SingleTurf from "./components/SingleTurf.jsx";
import Tournament from "./components/Tournament.jsx";
import TournamentScheduler from "./components/TournamentScheduler.jsx";
import About from "./pages/About.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import Contact from "./pages/Contact.jsx";
import ExploreTurfs from "./pages/ExploreTurfs.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SystemAdminLoginPage from "./pages/SystemAdminLogin.jsx";
import SystemAdminDashboard from "./pages/SystemAdminDashboard.jsx";

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
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="/turf/:id" element={<SingleTurf />} />
            <Route path="/admin/dashboard/upload" element={<UploadTurfs />} />
            <Route path="/turf/:id/tournament/" element={<Tournament />} />
            <Route
              path="/systemadminlogin"
              element={<SystemAdminLoginPage />}
            />
            <Route
              path="/systemadmindashboard"
              element={<SystemAdminDashboard />}
            />

            <Route
              path="/turf/:id/tournament/TournamentSchedular/:tournamentid"
              element={<TournamentScheduler />}
            />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
