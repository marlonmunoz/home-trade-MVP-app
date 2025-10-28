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
    </>
  );
};

export default Navbar;
