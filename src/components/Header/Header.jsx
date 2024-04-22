import axios from 'axios';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const Navbar = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'About',
      link: '/about',
    },
    {
      name: 'Explore Turfs',
      link: '/exploreturfs',
    },
    {
      name: 'For Turf Owners',
      link: '/forturfowners',
    },
    {
      name: 'Contact',
      link: '/contact',
    },
  ];

  const navigate = useNavigate(); // move useNavigate inside the function

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:3001/user/auth/logout');
      localStorage.removeItem('user');
      navigate('/'); // use navigate here
      return true; // return true if logout is successful
    } catch (error) {
      console.log(error);
      return false; // return false if logout fails
    }
  };

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
              navbar ? 'block' : 'hidden'
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
              <div className="loginreg flex items-center justify-end gap-4">
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
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
