import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import BookingsPage from "./BookingsPage";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();

  // Extract subpage from the current location path
  const subpage = location.pathname.split("/")[2] || "profile";

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function logout() {
    axios
      .post("http://localhost:3001/user/auth/logout")
      .then(() => {
        setUser(null); // Clear user in context
        localStorage.removeItem("user"); // Remove user from localStorage
        setRedirect("/"); // Set redirect to home page
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-lime-900 text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-20 text-2xl">
        <Link className={linkClasses("profile")} to={"/account/profile"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
      </nav>
      <Routes>
        <Route
          path="profile"
          element={
            <div className="text-center max-w-lg mx-auto text-xl">
              <p className="my-4">
                Logged in as{" "}
                <span className="text-red-600">
                  {user.username} ({user.email})
                </span>
              </p>
              <button
                onClick={logout}
                className="bg-red-600 text-[1.1rem] font-normal text-white px-5 py-1.5 rounded"
              >
                Logout
              </button>
            </div>
          }
        />
        <Route path="bookings" element={<BookingsPage />} />
      </Routes>
    </div>
  );
}
