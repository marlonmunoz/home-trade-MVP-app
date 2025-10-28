import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
  Home,
  PlusCircle,
  List,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="hidden md:flex bg-white dark:bg-gray-900 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 dark:text-purple-400 flex items-center gap-2"
          >
            <Home className="w-6 h-6" /> HomeTrade
          </Link>

          <div className="space-x-4 flex items-center">
            {!user ? (
              <>
                {/* 🌈 Login Button */}
                <Link
                  to="/login"
                  className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                             text-white font-semibold px-4 py-2 rounded-lg shadow-md
                             hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                             transition-all duration-300 flex items-center gap-1"
                >
                  <LogIn size={18} /> Login
                </Link>

                {/* 🌈 Register Button */}
                <Link
                  to="/register"
                  className="bg-button-gradient bg-[length:200%_200%] animate-gradientFlow
                             text-white font-semibold px-4 py-2 rounded-lg shadow-md
                             hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]
                             transition-all duration-300 flex items-center gap-1"
                >
                  <UserPlus size={18} /> Register
                </Link>

                <ThemeToggle />
              </>
            ) : (
              <>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Hi, {user.name.split(" ")[0]}
                </span>

                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1 ${
                    location.pathname === "/dashboard"
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:text-blue-600 dark:hover:text-purple-400 font-medium`}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                <Link
                  to="/properties"
                  className={`flex items-center gap-1 ${
                    location.pathname === "/properties"
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:text-blue-600 dark:hover:text-purple-400 font-medium`}
                >
                  All Properties
                </Link>

                {user.role === "seller" && (
                  <>
                    <Link
                      to="/add-property"
                      className={`flex items-center gap-1 ${
                        location.pathname === "/add-property"
                          ? "text-blue-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-blue-600 dark:hover:text-purple-400 font-medium`}
                    >
                      <PlusCircle size={18} /> Add Property
                    </Link>
                    <Link
                      to="/my-listings"
                      className={`flex items-center gap-1 ${
                        location.pathname === "/my-listings"
                          ? "text-blue-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-blue-600 dark:hover:text-purple-400 font-medium`}
                    >
                      <List size={18} /> My Listings
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-600 font-semibold hover:underline"
                >
                  <LogOut size={18} /> Logout
                </button>

                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* --- Mobile Bottom Bar with Tooltips --- */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex justify-around py-3 z-50">
          {/* Home */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/"
              className={`flex flex-col items-center ${
                location.pathname === "/"
                  ? "text-blue-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <Home size={22} />
            </Link>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Home
            </span>
          </div>

          {/* Dashboard */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/dashboard"
              className={`flex flex-col items-center ${
                location.pathname === "/dashboard"
                  ? "text-blue-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <LayoutDashboard size={22} />
            </Link>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Dashboard
            </span>
          </div>

          {/* All Properties */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/properties"
              className={`flex flex-col items-center ${
                location.pathname === "/properties"
                  ? "text-blue-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </Link>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              All Properties
            </span>
          </div>

          {/* Seller-only Buttons */}
          {user.role === "seller" && (
            <>
              <div className="relative group flex flex-col items-center">
                <Link
                  to="/add-property"
                  className={`flex flex-col items-center ${
                    location.pathname === "/add-property"
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <PlusCircle size={22} />
                </Link>
                <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
                  Add Property
                </span>
              </div>

              <div className="relative group flex flex-col items-center">
                <Link
                  to="/my-listings"
                  className={`flex flex-col items-center ${
                    location.pathname === "/my-listings"
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <List size={22} />
                </Link>
                <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
                  My Listings
                </span>
              </div>
            </>
          )}

          {/* Theme Toggle */}
          <div className="relative group flex flex-col items-center">
            <ThemeToggle />
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Theme
            </span>
          </div>

          {/* Logout */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={handleLogout}
              className="flex flex-col items-center text-red-600"
            >
              <LogOut size={22} />
            </button>
            <span className="absolute bottom-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-all transform scale-90 group-hover:scale-100 animate-fade-in-scale">
              Logout
            </span>
          </div>
        </div>
      )}

      {/* --- Mobile Theme Toggle for Guests --- */}
      {!user && (
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}
    </>
  );
};

export default Navbar;
