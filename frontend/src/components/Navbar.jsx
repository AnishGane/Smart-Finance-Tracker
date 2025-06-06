import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useFinance } from "../context/FinanceContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { token, setToken, userName, setUserName } = useFinance();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken("");
    setUserName("");
    setVisible(false);
  };

  return (
    <div>
      <div className="w-full sm:py-6 py-3 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold flex gap-1.5 items-center cursor-pointer">
          <FaWallet className="w-8 h-8" />
          <Link to="/">FinTrack</Link>
        </div>

        <div className="flex gap-10 items-center justify-center">
          {/* Links - Only show when logged in */}
          {token && (
            <ul className="hidden lg:flex gap-8 text-md text-gray-700">
              <NavLink to="/home" className="flex flex-col items-center gap-1">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink to="/about" className="flex flex-col items-center gap-1">
                <p>ABOUT US</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink to="/chart" className="flex flex-col items-center gap-1">
                <p>CHART</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>

              <NavLink
                to="/contact"
                className="flex flex-col items-center gap-1"
              >
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>
            </ul>
          )}

          {/* User name and Logout - Only show when logged in */}
          {token && (
            <div className="hidden lg:flex items-center gap-4">
              {userName && (
                <span className="bg-black text-slate-50 px-5 py-2">
                  Welcome, {userName}
                </span>
              )}
              <p
                onClick={logout}
                className="text-base px-6 py-2 cursor-pointer bg-slate-100 hover:bg-black hover:text-white border border-black transition duration-300"
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Menu button - Show on tablet and mobile */}
        {token && (
          <MdOutlineMenu
            className="w-8 h-8 lg:hidden cursor-pointer"
            onClick={() => setVisible(true)}
          />
        )}

        {/* Sidebar menu for tablet and mobile */}
        <div
          className={`absolute z-50 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          }`}
        >
          <div className="h-full flex flex-col text-gray-500">
            {/* Back button */}
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-1 p-3 cursor-pointer"
            >
              <RiArrowDropDownLine className="h-4 rotate-90" />
              <p>Back</p>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-2 h-full justify-between">
              {/* Links */}
              <div className="flex flex-col">
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-4 mt-3 pl-6 border"
                  to="/"
                >
                  HOME
                </NavLink>

                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-4 pl-6 border-b"
                  to="/about"
                >
                  ABOUT
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-4 pl-6 border-b"
                  to="/chart"
                >
                  CHART
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-4 pl-6 border-b"
                  to="/contact"
                >
                  CONTACT
                </NavLink>
              </div>

              {/* User name and Logout for mobile */}
              <div className="flex flex-col items-center gap-4 mb-20">
                {userName && (
                  <span className="text-gray-700">Welcome, {userName}</span>
                )}
                <p
                  onClick={logout}
                  className="text-center w-1/2 text-base py-2 cursor-pointer bg-white hover:bg-black hover:text-white border border-black transition duration-300"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
