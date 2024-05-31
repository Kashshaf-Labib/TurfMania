import axios from "axios";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const { user } = useContext(UserContext);

  const Navbar = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Explore Turfs",
      link: "/exploreturfs",
    },
    {
      name: "For Turf Owners",
      link: "/forturfowners",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  //const navigate = useNavigate(); // move useNavigate inside the function

  // const handleLogout = async () => {
  //   try {
  //     const res = await axios.post('http://localhost:3001/user/auth/logout');
  //     localStorage.removeItem('user');
  //     navigate('/'); // use navigate here
  //     return true; // return true if logout is successful
  //   } catch (error) {
  //     console.log(error);
  //     return false; // return false if logout fails
  //   }
  // };

  return (
    <>
      <nav className="primaryBackground w-full h-auto lg:px-12 md:px-8 sm:px-7 px-6 py-2 shadow-md">
        <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
          {/* Navbar logo & toggle button section */}
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* Logo section */}
              <Link className="text-3xl text-slate-50 font-semibold tracking-[0.3rem]">
                TurfMania
              </Link>
              {/* Toggle button section */}
              <div className="md:hidden">
                <button
                  className="p-2 primaryTextColor rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <FaTimes
                      className="text-gray-400 cursor-pointer"
                      size={24}
                    />
                  ) : (
                    <FaBars
                      className="text-gray-400 cursor-pointer"
                      size={24}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navbar menu items section */}
          <div
            className={`flex flex-auto justify-between items-center md:block ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="justify-between list-none lg:flex md:flex sm:block block gap-x-5 gap-y-16">
              <div className="text-sm md:flex justify-center gap-4 items-center w-full">
                {Navbar.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="primaryTextColor text-[1.15rem] font-normal tracking-wider hover:text-gray-400 ease-out duration-700"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </div>
              {/* <div className="loginreg flex items-center justify-end gap-4">
                <Link
                  to="/login?action=login"
                  className="bg-slate-50 text-[1.1rem] font-normal text-black px-5 py-1.5 rounded md:ml-6 sm:ml-0 ml-0"
                >
                  Login
                </Link>
                <Link
                  to="/signup?action=signup"
                  className="bg-green-800 hover:bg-green-900 text-[1.1rem] font-normal text-white px-5 py-1.5 rounded"
                >
                  Register
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-[1.1rem] font-normal text-white px-5 py-1.5 rounded"
                >
                  Logout
                </button>
              </div> */}
              <a
                href={user ? "/account" : "/login"}
                className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 "
              >
                {
                  user ? (
                    <>
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 relative top-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-white">{user.username}</div>
                    </>
                  ) : (
                    <span className="text-white">Login</span>
                  )
                }
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
